import {VERSION,questions,chapters,art,createState,validState,step,sceneArt,chosen,receipt,validateAnswers} from './story.js';
import {summarize,profiles} from './result.js';
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
  if(answers){state={...createState(),view:'result',index:questions.length-1,answers};shared=true;}
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
 return `<article class="intro"><div class="intro-copy"><span class="eyebrow">LIFE AFTER THE SINGULARITY</span><h1 id="scene-heading" tabindex="-1">지피짱,<br>같이 갈래?</h1><p class="intro-lead">특이점이 오면,<br>넌 어떻게 살래?</p><p class="intro-dialogue">“일도 안 해도 되고, 사는 세계도 고를 수 있다면?<br>네가 진짜 탐내는 미래를 보러 가자.”</p>${button(hasProgress?'continue-saved':'start',hasProgress?'이어서 골라 보기 <span aria-hidden="true">→</span>':'미래 박람회로 <span aria-hidden="true">→</span>','primary')}<p class="intro-meta">10개의 상상 · 약 3–5분 · 정답은 없어</p></div>${illustration(art.airport,'intro-art')}<div class="intro-route"><span>일하지 않는 삶</span><i aria-hidden="true">·</i><span>내 손안의 AI</span><i aria-hidden="true">·</i><span>다른 세계의 집</span></div></article>`;
}
function question(){
 const q=questions[state.index],prev=receipt(state),selected=chosen(state.answers,q.id);
 return `<article class="question-stage">${illustration(sceneArt(state))}<div class="scene-copy">${state.editing?`<p class="edit-notice">이 선택만 바꿔요. 나머지 ${questions.length-1}개 답은 그대로 남아요.</p>`:prev?`<div class="consequence"><span>방금 고른 미래</span><p>${esc(prev.text)}</p></div>`:''}<div class="scene-heading"><span class="eyebrow">SCENE ${String(state.index+1).padStart(2,'0')}</span><h1 id="scene-heading" tabindex="-1">${esc(q.title)}</h1></div><p class="narration">${esc(q.scene)}</p><div class="speech"><span class="speaker"><i aria-hidden="true">✦</i> 지피짱</span><p>${esc(q.speech)}</p></div><div class="choices" aria-label="${esc(q.title)} 선택">${q.options.map((o,i)=>`<button type="button" data-action="choose:${o.value}" class="choice ${o.value==='skip'?'undecided':''}${selected?.value===o.value?' selected':''}" aria-pressed="${selected?.value===o.value}"><span class="choice-main"><span class="choice-number" aria-hidden="true">${o.value==='skip'?'…':String(i+1).padStart(2,'0')}</span><strong>${esc(o.label)}</strong><span aria-hidden="true">${state.editing?'✓':'→'}</span></span>${o.detail?`<small>${esc(o.detail)}</small>`:''}</button>`).join('')}</div>${state.editing?button('cancel-edit','수정하지 않고 결과로'):''}</div></article>`;
}
function evidence(p,open=false){
 return `<details class="evidence"${open?' open':''}><summary>이 입장을 고른 ${p.points}개 장면 <span aria-hidden="true">＋</span></summary><ol>${p.evidence.map(e=>`<li><div><h3>${esc(e.title)}</h3><p class="quoted">“${esc(e.label)}”</p><p>${esc(e.why)}</p></div>${button('edit:'+e.id,`바꾸기<span class="sr-only">: ${esc(e.title)}</span>`,'edit-link')}</li>`).join('')}</ol></details>`;
}
function interestCard(p,main=false,showName=true){return `<article class="interest-card${main?' main-interest':''}"><div class="reading-top"><span>${main?'가장 가까웠던 입장':'함께 고른 입장'}</span><span class="reading-status">${p.points}개 장면에서 선택</span></div>${showName?`<h2>${esc(p.name)}</h2><p class="interest-quote">“${esc(p.tagline)}”</p>`:''}${main?`<p class="interest-description">${esc(p.description)}</p>`:''}${evidence(p,main)}</article>`;}

function result(){
 const r=summarize(state.answers),p=r.profile;
 const intro=p?p.tagline:r.kind==='empty'?'아직 어떤 미래에도 표를 주지 않았어.':r.kind==='mixed'?'똑같이 많이 고른 입장들이야. 한쪽을 임의로 대표로 세우지 않았어.':'여러 방향에 조금씩 마음이 갔어. 지금은 하나의 유형으로 부르기보다 그 관심들을 펼쳐 둘게.';
 const primary=p?[p]:r.kind==='mixed'?r.leaders:[];
 const secondary=r.ranked.filter(x=>x.points>0&&!primary.some(y=>y.id===x.id));
 return `<article class="result-sheet">${shared?`<div class="shared-banner"><p>공유된 미래 취향이야. 네가 하던 선택은 그대로 남아 있어.</p>${button('my-journey','내 선택으로 돌아가기')}</div>`:''}<header class="result-hero"><div><span class="eyebrow">YOUR LIFE, YOUR FUTURE</span><p class="result-kicker">${p?'이번 선택에서 가장 가까웠던 입장':'네가 고른 미래의 모양'}</p><h1 id="scene-heading" tabindex="-1">${esc(r.headline)}</h1><p class="result-summary result-tagline">${esc(intro)}</p><p class="result-meta">${r.answered}개 장면에서 선택${r.skipped?` · ${r.skipped}개는 아직 빈칸`:''}</p></div>${illustration(art.home,'result-art')}</header><div class="result-actions">${button('share','결과 링크 복사 <span aria-hidden="true">↗</span>','primary')}${button('journal','내 선택 다시 보기','secondary')}</div><div id="share-feedback" role="status"></div><label class="share-fallback" id="share-fallback" hidden>복사할 결과 링크<input id="share-url" type="url" readonly></label>${primary.length?`<section class="primary-interests" aria-label="가장 가까운 입장">${primary.map(x=>interestCard(x,true,primary.length>1)).join('')}</section>`:''}${secondary.length?`<section class="other-interests" aria-label="함께 보이는 관심"><h2>${p?'이런 마음도 함께 골랐어':'그 밖에 마음이 간 곳'}</h2><p class="section-lead">고르지 않은 입장을 싫어한다는 뜻은 아니야. 실제로 골랐던 쪽만 모았어.</p><div class="interest-grid">${secondary.map(x=>interestCard(x)).join('')}</div></section>`:''}${r.answered?`<section class="next-conversation"><span class="eyebrow">다음 대화는 이걸로</span><h2>이건 조금 더 궁금해.</h2><p>${esc(p?.reflection||'지금 고른 미래들 중 하나를 위해 다른 하나를 양보해야 한다면, 무엇을 남기고 싶어?')}</p>${button('journal','장면 하나 다시 고르기 <span aria-hidden="true">↗</span>','secondary')}</section>`:`<section class="next-conversation"><h2>끌리는 장면부터 다시 골라도 돼.</h2><p>빈칸을 어떤 입장의 점수로 바꾸지는 않았어.</p>${button('journal','열 가지 장면 다시 보기','secondary')}</section>`}<details class="method"><summary>이 결과는 어떻게 읽었을까?</summary><p>성격을 진단하기보다, 이야기에서 먼저 고른 관심사를 여섯 입장으로 묶었어. 각 입장은 전체에서 다섯 번씩 선택지에 등장하고, 한 선택은 한 입장에 한 표야. ‘아직 못 고르겠어’는 어느 쪽에도 더하지 않아.</p><p>네 장면 이상 답하고 한 입장을 세 번 이상 골랐을 때, 단독 1위라면 그 이름을 보여줘. 동점은 함께 표시하고, 그보다 답이 적거나 흩어지면 특정 유형으로 정하지 않아. 답변 순서나 속도로 동점을 깨지 않아.</p><p>이름은 이번 답을 설명하는 창작 별명이야. AI가 언제 얼마나 발전할지, 실제로 의식이 있는지는 판정하지 않아.</p></details><p class="creative-note">비공식 재미용 · 과학적 성격 검사가 아니야. 답은 이 탭에서만 이어지고 서버에 수집하지 않아. 공유 링크에는 이번 열 가지 답이 담겨.</p>${button('types','다른 미래 취향도 보기 <span aria-hidden="true">→</span>','secondary')}</article>`;
}
function journal(){
  return `<article class="journal-sheet"><span class="eyebrow">TEN POSSIBLE TOMORROWS</span><h1 id="scene-heading" tabindex="-1">내가 고른 미래</h1><p class="sheet-intro">하나만 바꾸고 싶다면 그 장면으로 가면 돼.<br>다른 답은 그대로 두고, 새 선택으로 다시 읽어 줄게.</p>${shared?'<p class="notice">공유 기록을 수정하면 내 여행으로 저장돼.</p>':''}${chapters.map((c,i)=>`<section class="journal-chapter"><h2><span>0${i+1}</span>${c}</h2><ol>${questions.filter(q=>q.chapter===i&&chosen(state.answers,q.id)).map(q=>`<li><div><h3>${esc(q.title)}</h3><p>“${esc(chosen(state.answers,q.id).label)}”</p></div>${button('edit:'+q.id,`선택 수정<span class="sr-only">: ${esc(q.title)}</span>`,'edit-link')}</li>`).join('')||'<li class="not-yet">아직 도착하지 않은 장면이에요.</li>'}</ol></section>`).join('')}${button('continue',validateAnswers(state.answers,true)?'내 결과로 돌아가기':'이야기 이어가기','primary')}</article>`;
}
function types(){
 return `<article class="journal-sheet"><span class="eyebrow">SIX DIFFERENT WISHES</span><h1 id="scene-heading" tabindex="-1">특이점이 와도, 바라는 건 다르니까.</h1><p class="sheet-intro">더 나은 유형은 없어. 여러 입장이 함께 나와도 괜찮아.<br>너는 어떤 한마디에 제일 먼저 고개를 끄덕였어?</p><div class="type-grid">${profiles.map(p=>`<details class="type-card"><summary><h2>${esc(p.name)}</h2><p class="type-tagline">“${esc(p.tagline)}”</p><span class="type-more">어떤 마음인지 읽기 ＋</span></summary><p class="type-description">${esc(p.description)}</p><p class="type-description">${esc(p.tradeoff)}</p><p class="type-reflection">${esc(p.reflection)}</p></details>`).join('')}</div>${button('result','내 결과로 돌아가기','primary')}</article>`;
}
function render(focus=false){
  const q=questions[state.index],count=Object.keys(state.answers).length;
  root.dataset.view=state.view;root.dataset.version=VERSION;root.dataset.question=state.view==='question'?q.id:'';root.dataset.count=count;root.dataset.shared=shared;root.dataset.editing=state.editing;
  root.dataset.result=state.view==='result'?summarize(state.answers).code:'';
  document.querySelector('#chapters').innerHTML=chapters.map((c,i)=>`<li${i===(state.view==='intro'?0:q.chapter)?' aria-current="step"':''}><span>0${i+1}</span>${esc(c)}</li>`).join('');
  document.querySelector('#progress').textContent=state.editing?'선택 수정 중':`${count} / ${questions.length}`;
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
