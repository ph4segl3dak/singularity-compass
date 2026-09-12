import {VERSION,questions,chapters,art,createState,validState,step,sceneArt,chosen,receipt,validateAnswers} from './story.js';
import {summarize,axes,profiles} from './result.js';
import {encode,decode} from './share.js';

const storageKey='gpchan-'+VERSION;
const motionKey=storageKey+'-motion';
const publicRoot='https://ph4segl3dak.github.io/singularity-compass/';
const root=document.querySelector('#story');
const controls=document.querySelector('#controls');
const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)');
const failedMotion=new Set();
let state=readSaved(),shared=false,invalidLink=false,motionPreference='';
try{motionPreference=sessionStorage.getItem(motionKey)||'';}catch{}
function readSaved(){try{const s=JSON.parse(sessionStorage.getItem(storageKey));if(validState(s))return s;}catch{}return createState();}
function save(){if(!shared)try{sessionStorage.setItem(storageKey,JSON.stringify(state));}catch{}}
function loadLink(){
  shared=false;invalidLink=false;
  if(!location.hash.startsWith('#r='))return;
  const answers=decode(location.hash);
  if(answers){state={...createState(),view:'result',index:11,answers};shared=true;}
  else invalidLink=true;
}
function clearLink(){shared=false;invalidLink=false;history.replaceState(null,'',location.pathname+location.search);}
loadLink();
const esc = value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const button=(action,label,cls='text-button')=>`<button type="button" class="${cls}" data-action="${esc(action)}">${label}</button>`;
const asset=image=>new URL('../v4/art/'+image,document.baseURI).href;
const animated=image=>!!image.motion&&!failedMotion.has(image.motion)&&(motionPreference==='on'||(!motionPreference&&!reduceMotion.matches));
function illustration(image,cls='scene-art'){
  const motion=animated(image);
  return `<figure class="${cls}"><img id="scene-image" src="${asset(motion?image.motion:image.file)}" width="1672" height="941" alt="${esc(image.alt)}" data-mode="${motion?'animated':'static'}">${image.motion&&!failedMotion.has(image.motion)?`<button type="button" class="motion" data-motion aria-label="${motion?'움직임 멈추기':'움직임 켜기'}" aria-pressed="${motion}">${motion?'Ⅱ':'▷'}</button>`:''}</figure>`;
}
function intro(){
  const hasProgress=Object.keys(state.answers).length>0;
  return `<article class="intro"><div class="intro-copy"><span class="eyebrow">A DAY, WITH YOU</span><h1 id="scene-heading" tabindex="-1">지피짱,<br>같이 갈래?</h1><p class="intro-lead">작은 부스 하나를 열기로 했다.<br>AI와 함께할 내일도, 조금은 보일까?</p><p class="intro-dialogue">“표는 챙겼지? 오늘은 우리 둘이 운영하는 날이야.”</p>${button(hasProgress?'continue-saved':'start',hasProgress?'여행 이어가기 <span aria-hidden="true">→</span>':'같이 출발하자 <span aria-hidden="true">→</span>','primary')}<p class="intro-meta">12개의 선택 · 약 4–6분 · 모르는 답은 남겨 둬도 돼</p></div>${illustration(art.airport,'intro-art')}<div class="intro-route"><span>01 공항에서</span><i aria-hidden="true">—</i><span>02 우리 부스</span><i aria-hidden="true">—</i><span>03 돌아온 뒤</span></div></article>`;
}
function question(){
  const q=questions[state.index];const prev=receipt(state);const selected=chosen(state.answers,q.id);
  const memory=state.index===4?(state.answers.kit==='open'?'아까는 직접 고쳐 쓰는 쪽을 골랐지. 이번엔 실제 관리할 일도 생겼네.':state.answers.kit==='managed'?'아까는 관리되는 서비스를 골랐지. 이번엔 기다리는 시간도 생겼네.':'아까 열어 둔 생각을, 이번 상황에서 다시 골라도 돼.'):null;
  return `<article class="question-stage">${illustration(sceneArt(state))}<div class="scene-copy">${state.editing?'<p class="edit-notice">이 선택만 수정해요. 다른 11개는 그대로 남아요.</p>':prev?`<div class="consequence"><span>방금 고른 길</span><p>${esc(prev.text)}</p></div>`:''}<div class="scene-heading"><span class="eyebrow">SCENE ${String(state.index+1).padStart(2,'0')}</span><h1 id="scene-heading" tabindex="-1">${esc(q.title)}</h1></div><p class="narration">${esc(q.scene)}</p><div class="speech"><span class="speaker"><i aria-hidden="true">✦</i> 지피짱</span><p>${esc(q.speech)}</p></div>${memory?`<p class="memory">${esc(memory)}</p>`:''}${q.prompt?`<p class="question-note">${esc(q.prompt)}</p>`:''}<div class="choices" aria-label="${esc(q.title)} 선택">${q.options.map((o,i)=>`<button type="button" data-action="choose:${o.value}" class="choice ${o.value==='undecided'?'undecided':''}${selected?.value===o.value?' selected':''}"${selected?.value===o.value?' aria-pressed="true"':' aria-pressed="false"'}><span class="choice-main"><span class="choice-number" aria-hidden="true">${o.value==='undecided'?'…':String(i+1).padStart(2,'0')}</span><strong>${esc(o.label)}</strong><span aria-hidden="true">${state.editing?'✓':'→'}</span></span>${o.detail?`<small>${esc(o.detail)}</small>`:''}</button>`).join('')}</div>${state.editing?button('cancel-edit','수정하지 않고 결과로'):''}</div></article>`;
}
function evidence(a){
  return `<details class="evidence"><summary>이렇게 읽은 세 가지 선택 <span aria-hidden="true">＋</span></summary><ol>${a.evidence.map(e=>`<li><div><h3>${esc(e.title)}</h3><p class="quoted">“${esc(e.label)}”</p><p>${esc(e.why)}</p></div>${button('edit:'+e.id,`수정<span class="sr-only">: ${esc(e.title)}</span>`,'edit-link')}</li>`).join('')}</ol></details>`;
}
function result(){
  const r=summarize(state.answers),last=receipt(state);
  return `<article class="result-sheet">${shared?`<div class="shared-banner"><p>누군가 공유한 여행이야. 네가 하던 여행은 그대로 남아 있어.</p>${button('my-journey','내 여행으로 돌아가기')}</div>`:''}<header class="result-hero"><div><span class="eyebrow">YOUR NEXT CHAPTER</span><p class="result-kicker">이번 여행에서 만난 너는</p><h1 id="scene-heading" tabindex="-1">${esc(r.headline)}</h1><span class="result-code">${r.code}</span><p class="result-summary">${r.profile?'네가 기대한 변화, 일을 맡긴 방식,<br>그리고 지피짱과 함께한 거리를 모았어.':r.axes.some(a=>a.mixed)?'상황이 바뀌면 선택도 달랐고,<br>아직 정하지 않은 생각도 그대로 남겼어.':'아직 정하지 않은 생각을<br>어느 쪽으로도 밀어 넣지 않고 남겼어.'}</p></div>${illustration(art.home,'result-art')}</header><p class="ending-line">${esc(last.text)}</p><div class="result-actions">${button('share','결과 링크 복사 <span aria-hidden="true">↗</span>','primary')}${button('journal','내 열두 선택 보기','secondary')}</div><div id="share-feedback" role="status"></div><label class="share-fallback" id="share-fallback" hidden>복사할 결과 링크<input id="share-url" type="url" readonly></label><section class="readings" aria-label="네 가지 읽기">${r.axes.map(a=>`<article class="reading ${a.status}"><div class="reading-top"><span>${esc(a.name)}</span><span class="reading-status">${a.status==='leaning'?'2 : 1 · 다른 답도 있음':a.status==='mixed'?'혼합':a.status==='undecided'?'판단 유보':a.pending?'두 답 + 유보':'세 답이 같음'}</span></div><h2>${esc(a.label)}</h2><p class="reading-summary">${esc(a.summary)}</p>${evidence(a)}<p class="reading-note">${esc(a.note)}</p></article>`).join('')}</section><section class="next-conversation"><span class="eyebrow">다음 여행에서는</span><h2>조금 다르게 골라도 괜찮아.</h2><p>${esc((r.axes.find(a=>a.mixed)||r.axes.find(a=>a.status==='undecided')||r.axes[2]).reflection)}</p>${button('journal','장면 하나 바꿔 보기 <span aria-hidden="true">↗</span>','secondary')}</section>${r.profile?'':`<details class="candidates"><summary>아직 열려 있는 ${r.candidates.length}가지 조합</summary><p>지금 이 중 하나로 확정한 결과는 아니야.</p><ul>${r.candidates.map(p=>`<li>${esc(p.name)} <span>${p.code}</span></li>`).join('')}</ul></details>`}<details class="method"><summary>어떻게 읽었을까?</summary><p>네 가지 주제마다 세 장면을 같은 무게로 읽어. 한쪽을 두 번 이상 고르면 그 방향을 표시하되, 2대1로 갈린 답도 숨기지 않아. 서로 한 번씩이면 혼합(M), 방향을 정한 답이 부족하면 유보(U)로 남겨. 속도나 첫 답으로 동점을 풀지 않아.</p><p>지피짱을 동료처럼 대한 선택으로 AI의 의식이나 감정에 관한 믿음을 추정하지 않아. 상황에서 고른 행동을 묘사할 뿐이야.</p></details><p class="creative-note">정답·우열 없는 창작 분류이며 검증된 성격 진단이 아니야. 답은 이 탭에서만 이어지고 서버에 수집하지 않아. 공유 링크에는 이번 12개 답이 담겨.</p>${button('types','다른 여행자들도 보기 <span aria-hidden="true">→</span>','secondary')}</article>`;
}
function journal(){
  return `<article class="journal-sheet"><span class="eyebrow">TWELVE MOMENTS</span><h1 id="scene-heading" tabindex="-1">우리가 남긴 선택</h1><p class="sheet-intro">하나만 바꾸고 싶다면 그 장면으로 가면 돼.<br>다른 답은 그대로 두고, 새 선택으로 다시 읽어 줄게.</p>${shared?'<p class="notice">공유 기록을 수정하면 내 여행으로 저장돼.</p>':''}${chapters.map((c,i)=>`<section class="journal-chapter"><h2><span>0${i+1}</span>${c}</h2><ol>${questions.filter(q=>q.chapter===i&&chosen(state.answers,q.id)).map(q=>`<li><div><h3>${esc(q.title)}</h3><p>“${esc(chosen(state.answers,q.id).label)}”</p></div>${button('edit:'+q.id,`선택 수정<span class="sr-only">: ${esc(q.title)}</span>`,'edit-link')}</li>`).join('')||'<li class="not-yet">아직 도착하지 않은 장면이에요.</li>'}</ol></section>`).join('')}${button('continue',validateAnswers(state.answers,true)?'내 결과로 돌아가기':'이야기 이어가기','primary')}</article>`;
}
function types(){
  return `<article class="journal-sheet"><span class="eyebrow">DIFFERENT WAYS TO TOMORROW</span><h1 id="scene-heading" tabindex="-1">다른 여행자들은</h1><p class="sheet-intro">같은 하루에도 서로 다른 미래가 담겨.<br>혼합과 유보는 이 16가지 중 하나에 억지로 넣지 않아.</p><div class="type-grid">${profiles.map(p=>`<details class="type-card"><summary><span>${p.code}</span><h2>${esc(p.name)}</h2></summary><ul>${p.labels.map((l,i)=>`<li><span>${esc(axes[i].name)}</span><strong>${esc(l)}</strong></li>`).join('')}</ul></details>`).join('')}</div>${button('result','내 결과로 돌아가기','primary')}</article>`;
}
function render(focus=false){
  const q=questions[state.index],count=Object.keys(state.answers).length;
  root.dataset.view=state.view;root.dataset.version=VERSION;root.dataset.question=state.view==='question'?q.id:'';root.dataset.count=count;root.dataset.shared=shared;root.dataset.editing=state.editing;
  root.dataset.result=state.view==='result'?summarize(state.answers).code:'';
  document.querySelector('#chapters').innerHTML=chapters.map((c,i)=>`<li${i===(state.view==='intro'?0:q.chapter)?' aria-current="step"':''}><span>0${i+1}</span>${esc(c)}</li>`).join('');
  document.querySelector('#progress').textContent=state.editing?'선택 수정 중':`${count} / 12`;
  const notice=document.querySelector('#link-notice');notice.hidden=!invalidLink;
  notice.innerHTML=invalidLink?`이 공유 링크를 읽을 수 없어. 주소가 끝까지 복사됐는지 확인해 줘. ${button('my-journey','내 여행 보기')}`:'';
  root.innerHTML=state.view==='intro'?intro():state.view==='question'?question():state.view==='result'?result():state.view==='journal'?journal():types();
  controls.innerHTML=(state.view==='question'&&!state.editing?button('back','← 이전 선택'):'')+(count&&state.view==='question'?button('journal','여행일지'):'')+(state.view!=='intro'?button('reset','처음부터 다시'):'');
  const image=sceneArt(state);
  root.querySelector('#scene-image')?.addEventListener('error',()=>{if(animated(image)){failedMotion.add(image.motion);render();}},{once:true});
  if(state.view==='question'&&state.index<questions.length-1){const upcoming=sceneArt({...state,index:state.index+1});const preload=new Image();preload.src=asset(upcoming.file);}
  if(focus){root.querySelector('#scene-heading')?.focus({preventScroll:true});document.querySelector('#main').scrollIntoView({block:'start',behavior:'instant'});}
}
function act(action){
  if(action==='my-journey'){clearLink();state=readSaved();render(true);return true;}
  if(action==='continue-saved'){state={...state,view:'journal'};state=step(state,'continue');save();render(true);return true;}
  if(action==='share'){copyShare();return true;}
  const next=step(state,action);if(next===state)return false;
  // Reading a shared result never replaces personal progress. An explicit edit does.
  const edits=action==='reset'||action.startsWith('choose:');
  if(edits&&(shared||invalidLink))clearLink();
  state=next;save();render(true);return true;
}
async function copyShare(){
  if(!validateAnswers(state.answers,true))return;
  const url=publicRoot+encode(state.answers);const input=document.querySelector('#share-url');input.value=url;
  try{await navigator.clipboard.writeText(url);document.querySelector('#share-feedback').textContent='결과 링크를 복사했어.';}
  catch{document.querySelector('#share-fallback').hidden=false;document.querySelector('#share-feedback').textContent='아래 주소를 복사해서 나눠 줘.';input.focus();input.select();}
}
document.addEventListener('click',event=>{
  const motion=event.target.closest('[data-motion]');
  if(motion){motionPreference=animated(sceneArt(state))?'off':'on';try{sessionStorage.setItem(motionKey,motionPreference);}catch{}render();root.querySelector('[data-motion]')?.focus();return;}
  const target=event.target.closest('button[data-action]');if(target)act(target.dataset.action);
});
document.querySelector('#home').addEventListener('click',e=>{e.preventDefault();if(shared){act('my-journey');return;}if(state.view==='intro')return;state={...state,view:'intro',editing:false};save();render(true);});
window.addEventListener('hashchange',()=>{state=readSaved();loadLink();render(true);});
reduceMotion.addEventListener('change',()=>{if(!motionPreference)render();});
render();
function visible(){return {view:state.view,question:root.dataset.question,recorded:root.dataset.count,shared,resultCode:root.dataset.result,text:root.innerText,actions:[...document.querySelectorAll('button[data-action]')].filter(b=>!b.closest('[hidden],details:not([open])')&&b.getClientRects().length&&b.innerText.trim()).map(b=>({action:b.dataset.action,label:b.innerText}))};}
if(document.modelContext?.registerTool){
  const lifecycle=new AbortController();
  const register=tool=>{try{Promise.resolve(document.modelContext.registerTool(tool,{signal:lifecycle.signal})).catch(()=>{});}catch{}};
  register({name:'get_story_scene',description:'Read the visible fictional story scene and its offered actions.',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:true,untrustedContentHint:false},execute:visible});
  register({name:'choose_story_action',description:'Choose an offered action in this fictional story. No real messages, bookings or purchases are made.',inputSchema:{type:'object',properties:{action:{type:'string'}},required:['action'],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},async execute(input){if(!input||Object.keys(input).length!==1||!visible().actions.some(a=>a.action===input.action))return {error:'Choose an action visible on the current page.',...visible()};if(input.action==='share')await copyShare();else act(input.action);return visible();}});
  window.addEventListener('pagehide',event=>{if(!event.persisted)lifecycle.abort();},{once:true});
}
