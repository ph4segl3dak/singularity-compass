import { VERSION, chapters, decisions, createState, getScene, step, journalEntries, reservationStatus, messageStatus, scheduleStatus } from './story-data.js';
import { resultSummary, typeProfiles, axes } from './result-data.js';
import { encodeJourney, decodeJourney } from './share-data.js';

const root = document.querySelector('#story');
const restart = document.querySelector('#restart');
const back = document.querySelector('#back');
const chapterBar = document.querySelector('#chapters');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const storageKey = `${VERSION}:progress`;
const preferenceKey = `${VERSION}:motion`;
let motionPreference;
let state = createState();
const failedMotion = new Set();
let shared = false;
let invalidShare = false;
const publicRoot = new URL('../../', import.meta.url);
function validSnapshot(value) {
  if (!value || typeof value !== 'object' || typeof value.scene !== 'string' || !value.answers || typeof value.answers !== 'object' || Array.isArray(value.answers)) return false;
  if (['tripApproved', 'messageApproved', 'scheduleApproved'].some(key => typeof value[key] !== 'boolean')) return false;
  if (!Object.entries(value.answers).every(([id, answer]) => decisions.some(d => d.id === id && d.options.some(o => o.value === answer)))) return false;
  try { getScene(value); } catch { return false; }
  return true;
}
try {
  motionPreference = sessionStorage.getItem(preferenceKey);
  const saved = JSON.parse(sessionStorage.getItem(storageKey));
  if (saved?.version === VERSION && validSnapshot(saved) && Array.isArray(saved.trail) && saved.trail.length <= 160 && saved.trail.every(validSnapshot)) state = saved;
} catch { /* Storage is optional. */ }
function loadIncomingLink() {
  shared = false; invalidShare = false;
  if (!location.hash.startsWith('#r=')) return;
  const incoming = decodeJourney(location.hash);
  if (incoming) { state = incoming; shared = true; }
  else { state = createState(); invalidShare = true; }
}
loadIncomingLink();
function clearIncomingLink() {
  if (location.hash.startsWith('#r=')) history.replaceState(null, '', location.pathname + location.search);
  shared = false; invalidShare = false;
}
function save() { if (shared || invalidShare) return; try { sessionStorage.setItem(storageKey, JSON.stringify(state)); } catch { /* Optional storage. */ } }
function escapeHtml(value) { return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]); }
function shouldAnimate(item) {
  return Boolean(item.motion && !failedMotion.has(item.motion) && (motionPreference === 'on' || (motionPreference !== 'off' && !reduceMotion.matches && !navigator.connection?.saveData)));
}
function actionButton(action, solo = false) {
  return `<button class="action-button${solo ? ' solo' : ''}" type="button" data-action="${escapeHtml(action.id)}"><span>${escapeHtml(action.label)}</span><span class="arrow" aria-hidden="true">▶</span></button>`;
}
function actionsHtml(actions) { return `<div class="actions${actions.length === 2 ? ' two' : actions.length > 2 ? ' many' : ''}">${actions.map(a => actionButton(a, actions.length === 1)).join('')}</div>`; }
function resultBadges(profile) {
  return axes.map((axis, index) => `<span>${escapeHtml(axis.poles.find(pole => pole.code === profile.code[index])?.label || '')}</span>`).join('');
}
function renderResult(scene) {
  const result = resultSummary(state.answers);
  if (!result.complete) return `<div class="result-sheet"><h2 id="scene-heading" tabindex="-1">아직 남길 선택이 있어</h2><p>여행의 선택을 마치면 결과를 함께 펼칠 수 있어.</p>${actionButton({id:'reset',label:'처음부터 이어가기'},true)}</div>`;
  const name = result.profile?.name || result.headline;
  return `<div class="result-sheet"><div class="result-hero"><div><span class="journal-kicker">YOUR NEXT CHAPTER</span><p class="result-eyebrow">이번 여행에서 그린 미래</p><h2 id="scene-heading" tabindex="-1">${escapeHtml(name)}</h2><span class="result-code" aria-label="이번 이야기의 결과 코드">${escapeHtml(result.code)}</span></div><img id="scene-image" src="./art/${scene.image.still}" data-mode="static" width="1672" height="941" alt="${escapeHtml(scene.image.alt)}"></div><div class="result-intro">${result.intro.map(line=>`<p>${escapeHtml(line)}</p>`).join('')}</div><p class="result-context">네 가지 주제에서 세 번씩 답한 내용을 모았어. 다른 답과 유보도 아래에 그대로 남아 있어.</p><section class="axis-results" aria-label="네 가지 시선">${result.axes.map(axis => `<article class="axis-result ${axis.status}"><div class="axis-top"><span>${escapeHtml(axis.label)}</span><strong>${escapeHtml(axis.directionLabel)}</strong></div><p class="axis-question">${escapeHtml(axis.question)}</p><div class="answer-beads" aria-label="응답별 기록">${axis.decisionIds.map(id => { const answer=state.answers[id]; const pole=axis.poles.find(p=>p.value===answer); return `<span class="answer-bead ${pole ? (pole===axis.poles[0]?'first':'second'):'neutral'}" title="${escapeHtml(decisions.find(d=>d.id===id).title)}">${escapeHtml(pole?.label || '유보')}</span>`; }).join('')}</div><p class="count-text">${escapeHtml(axis.countText)}</p><p class="axis-summary">${escapeHtml(axis.summary)}</p></article>`).join('')}</section><section class="travel-style"><h3>지피짱과 다음 여행을 한다면</h3><p>${escapeHtml(result.travelStyle)}</p><h3>한 번 더 생각해 볼 질문</h3><p>${escapeHtml(result.reflectionQuestion)}</p></section>${result.unresolvedAxes.length ? `<details class="possible-types"><summary>아직 열린 ${result.candidates.length}가지 기본 조합</summary><p>미정인 시선이 어느 쪽으로 모이느냐에 따라 이어질 수 있는 조합이야. 지금 이 중 하나로 정한 건 아니야.</p><ul>${result.candidates.map(profile=>`<li><b>${escapeHtml(profile.name)}</b><span>${escapeHtml(profile.code)}</span></li>`).join('')}</ul></details>` : ''}<details class="result-method"><summary>이 결과는 어떻게 정해졌을까?</summary><p>각 주제에서 세 번, 모두 같은 무게로 답을 모았어. 방향을 고른 답이 두 개 이상이고 한쪽이 더 많으면 그 방향을 표시해. 2대1은 ‘기울음’, 서로 한 번씩이면 ‘혼합’, 방향을 고른 답이 부족하면 ‘판단 유보’로 남겨.</p><p>첫 답이나 답하는 속도로 동점을 풀지 않아. 새 안내 기능의 출시 시점은 여행일지에만 남기고 네 축에는 더하지 않았어.</p></details><p class="creative-note result-notice">${escapeHtml(result.notice)} 이 이야기의 선택은 서버에 저장하거나 이전 테스트 통계에 합산하지 않아.</p>${shared ? '<p class="shared-note">공유된 여행 기록이야. 네가 진행하던 이야기는 그대로 남아 있어.</p>' : ''}<div class="share-actions"><button type="button" class="action-button solo" data-share>결과 링크 복사 <span aria-hidden="true">↗</span></button><label id="share-fallback" hidden>복사할 결과 링크<input id="share-url" type="url" readonly></label><p id="share-status" role="status"></p></div>${actionsHtml(scene.actions)}</div>`;
}
function renderTypes(scene) {
  return `<div class="result-sheet"><span class="journal-kicker">SIXTEEN WAYS TO TOMORROW</span><h2 id="scene-heading" tabindex="-1" class="types-title">다른 여행자들의 미래</h2><p class="types-intro">기본 조합은 16가지. 혼합과 판단 유보는 이 목록 중 하나로 억지로 넣지 않아.</p><div class="type-grid">${typeProfiles.map(profile => `<details class="type-card"><summary><span>${escapeHtml(profile.code)}</span><strong>${escapeHtml(profile.name)}</strong><i aria-hidden="true">＋</i></summary><div class="type-body"><div class="type-badges">${resultBadges(profile)}</div>${profile.intro.map(line=>`<p>${escapeHtml(line)}</p>`).join('')}<h3>다음 여행에서는</h3><p>${escapeHtml(profile.travelStyle)}</p><h3>생각해 볼 질문</h3><p>${escapeHtml(profile.reflectionQuestion)}</p></div></details>`).join('')}</div><p class="creative-note">정답이나 우열이 없는 창작 분류이며, 검증된 성격 진단은 아니야.</p>${actionsHtml(scene.actions)}</div>`;
}
function renderJournal() {
  const entries = journalEntries(state);
  return `<section class="journal" aria-labelledby="journal-title"><div class="journal-heading"><span class="journal-kicker">TODAY, WITH YOU</span><h2 id="journal-title">너와 남긴 13개의 선택</h2><p>다른 상황에서 다른 답을 골랐다면, 그 차이도 그대로 남겼어.</p></div>${chapters.map((chapter, index) => `<section class="journal-chapter"><h3><span>0${index + 1}</span>${escapeHtml(chapter)}</h3><ol>${entries.filter(e => e.chapter === index).map(entry => `<li><div><h4>${escapeHtml(entry.title)}${entry.id === 'release' ? ' · 이야기 속 선택' : ''}</h4><p>${escapeHtml(entry.journal)}</p></div><button type="button" class="revisit" data-action="edit:${entry.id}" aria-label="${escapeHtml(entry.title)} 선택부터 다시 하기">여기서 다시 <span aria-hidden="true">↗</span></button></li>`).join('')}</ol></section>`).join('')}<p class="journal-note">‘여기서 다시’를 누르면 해당 선택과 그 뒤의 선택을 다시 이어가며, 새 답으로 결과도 다시 만들어져.</p></section>`;
}
function render(moveFocus = false) {
  const scene = getScene(state);
  const notice = document.querySelector('#link-notice');
  notice.hidden = !invalidShare;
  notice.textContent = invalidShare ? '이 결과 링크를 읽을 수 없어. 주소가 모두 복사됐는지 확인하거나 새 이야기를 시작해 줘.' : '';
  const animated = shouldAnimate(scene.image);
  root.dataset.scene = state.scene;
  root.dataset.choice = state.answers.trip || '';
  root.dataset.reservation = reservationStatus(state);
  root.dataset.message = messageStatus(state);
  root.dataset.schedule = scheduleStatus(state);
  root.dataset.answerCount = Object.keys(state.answers).length;
  root.dataset.decision = scene.decisionId || '';
  if (scene.result) root.dataset.resultCode = resultSummary(state.answers).code; else delete root.dataset.resultCode;
  chapterBar.innerHTML = chapters.map((name, index) => `<li${index === scene.chapter ? ' aria-current="step"' : ''} class="${index < scene.chapter ? 'past' : ''}"><span class="chapter-dot" aria-hidden="true">${index < scene.chapter ? '✓' : index + 1}</span>${name}</li>`).join('');
  const caption = `<div class="scene-caption"><div><span class="scene-label">${escapeHtml(scene.label)}</span><p ${scene.result || scene.types ? '' : 'tabindex="-1" id="scene-heading"'}>${escapeHtml(scene.narration)}</p></div>${scene.status ? `<span class="scene-status ${scene.statusClass || ''}">${escapeHtml(scene.status)}</span>` : ''}</div>`;
  if (scene.result || scene.types) {
    root.innerHTML = caption + (scene.result ? renderResult(scene) : renderTypes(scene));
  } else {
    root.innerHTML = caption + `<figure class="scene-art scene-change"><img id="scene-image" src="./art/${animated ? scene.image.motion : scene.image.still}" data-mode="${animated ? 'animated' : 'static'}" width="1672" height="941" alt="${escapeHtml(scene.image.alt)}">${scene.image.motion && !failedMotion.has(scene.image.motion) ? `<button class="motion-control" type="button" data-motion-toggle aria-pressed="${animated}"><span class="motion-symbol" aria-hidden="true">${animated ? 'Ⅱ' : '▷'}</span>${animated ? '움직임 멈추기' : '움직임 보기'}</button>` : ''}</figure><div class="dialogue"><span class="speaker">지피짱</span>${scene.memory ? `<p class="choice-memory">${escapeHtml(scene.memory)}</p>` : ''}<div class="speech">${scene.lines.map(line => `<p>${escapeHtml(line)}</p>`).join('')}</div>${scene.card ? `<aside class="scene-card"><h2>${escapeHtml(scene.card.title)}</h2><p>${escapeHtml(scene.card.body)}</p></aside>` : ''}${scene.detail ? `<p class="scene-detail">${escapeHtml(scene.detail)}</p>` : ''}${scene.journal ? renderJournal() : ''}${actionsHtml(scene.actions)}</div>`;
  }
  root.querySelector('#scene-image')?.addEventListener('error', () => {
    if (animated) { failedMotion.add(scene.image.motion); render(); }
  }, { once: true });
  restart.hidden = state.scene === 'intro';
  back.hidden = !state.trail.length;
  document.querySelector('#chapter-name').textContent = chapters[scene.chapter];
  document.querySelector('#choice-progress').textContent = `${Math.min(Object.keys(state.answers).length,13)} / 13`;
  if (moveFocus) {
    document.querySelector('#scene-heading')?.focus({ preventScroll: true });
    root.scrollIntoView({ block: 'start', behavior: 'instant' });
  }
}
function act(action) {
  const nextState = step(state, action);
  if (nextState === state) return false;
  const wasShared = shared;
  if (action === 'reset' || action.startsWith('edit:') || invalidShare) clearIncomingLink();
  state = nextState;
  if (!wasShared || !shared) save();
  render(true); return true;
}
root.addEventListener('click', async event => {
  if (event.target.closest('button[data-share]')) {
    const url = new URL(publicRoot);
    url.hash = encodeJourney(state.answers);
    const input = document.querySelector('#share-url');
    input.value = url.href;
    try {
      await navigator.clipboard.writeText(url.href);
      document.querySelector('#share-status').textContent = '결과 링크를 복사했어.';
    } catch {
      document.querySelector('#share-fallback').hidden = false;
      input.focus(); input.select();
      document.querySelector('#share-status').textContent = '이 주소를 복사해서 나눠 줘.';
    }
    return;
  }
  const toggle = event.target.closest('button[data-motion-toggle]');
  if (toggle) {
    motionPreference = shouldAnimate(getScene(state).image) ? 'off' : 'on';
    try { sessionStorage.setItem(preferenceKey, motionPreference); } catch { /* Optional storage. */ }
    render(); root.querySelector('[data-motion-toggle]')?.focus({ preventScroll: true }); return;
  }
  const button = event.target.closest('button[data-action]');
  if (button) act(button.dataset.action);
});
restart.addEventListener('click', () => act('reset'));
back.addEventListener('click', () => act('back'));
document.querySelector('.wordmark').addEventListener('click', event => { event.preventDefault(); act('reset'); });
window.addEventListener('hashchange', () => {
  if (!location.hash.startsWith('#r=')) {
    state = createState();
    try { const saved=JSON.parse(sessionStorage.getItem(storageKey)); if (saved?.version===VERSION && validSnapshot(saved) && Array.isArray(saved.trail) && saved.trail.every(validSnapshot)) state=saved; } catch {}
  }
  loadIncomingLink(); render(true);
});
reduceMotion.addEventListener('change', () => { if (!motionPreference) render(); });
render();

function visibleScene() {
  return { scene: state.scene, text: root.innerText, actions: [...root.querySelectorAll('button[data-action]')].map(button => ({ action: button.dataset.action, label: button.innerText })), answersRecorded: Object.keys(state.answers).length, resultCode: root.dataset.resultCode || null };
}
if (document.modelContext?.registerTool) {
  const lifecycle = new AbortController();
  const register = tool => { try { Promise.resolve(document.modelContext.registerTool(tool, { signal: lifecycle.signal })).catch(() => {}); } catch { /* Ordinary controls remain available. */ } };
  register({ name: 'get_story_scene', description: 'Read the visible scene, choices and result in this fictional GPChan story.', inputSchema: { type: 'object', properties: {}, additionalProperties: false }, annotations: { readOnlyHint: true, untrustedContentHint: false }, execute: visibleScene });
  register({ name: 'choose_story_action', description: 'Choose an offered action in this fictional story. No real messages or reservations are made.', inputSchema: { type: 'object', properties: { action: { type: 'string' } }, required: ['action'], additionalProperties: false }, annotations: { readOnlyHint: false, untrustedContentHint: false }, execute(input) {
    if (!input || typeof input !== 'object' || Object.keys(input).length !== 1 || typeof input.action !== 'string' || !visibleScene().actions.some(a => a.action === input.action)) return { error: 'Choose an action currently offered on screen.', ...visibleScene() };
    act(input.action); return visibleScene();
  } });
  window.addEventListener('pagehide', event => { if (!event.persisted) lifecycle.abort(); }, { once: true });
}
