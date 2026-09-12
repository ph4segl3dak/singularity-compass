import {questions,chosen,validateAnswers} from './story.js';
export const RESULT_VERSION='journey6-priorities-1';
export const profiles=[
 {id:'freedom',name:'특이점 조기퇴근파',short:'조기퇴근파',tagline:'AI가 일하면, 나는 드디어 내 인생을 산다.',description:'AI가 얼마나 대단한지보다, 그 덕분에 돌려받을 시간이 먼저 눈에 들어왔어. 아무것도 안 하겠다는 뜻은 아니야. 먹고살기 위해 해야 했던 일과, 좋아서 하고 싶은 일을 나누고 싶은 쪽이야.',tradeoff:'새 능력을 계속 따라가는 재미보다, 지금의 나로 누리는 여유를 놓치고 싶지 않아.',reflection:'생활 걱정이 없어져도, 직접 하고 싶어서 남겨 둘 일은 뭐야?'},
 {id:'agency',name:'인간 최종결재파',short:'최종결재파',tagline:'나보다 잘해도, 내 삶을 대신 정하진 마.',description:'똑똑한 AI를 쓰는 것과 결정권을 넘기는 건 다른 일로 골랐어. 실행은 많이 맡길 수 있어도, 내 이름과 내 삶의 방향을 정할 자리는 남겨 두고 싶은 쪽이야.',tradeoff:'편리함을 조금 덜 누리더라도, 내가 받아들인 선택으로 움직이길 바라.',reflection:'AI의 판단이 계속 더 좋은 결과를 낸다면, 어디까지 결정을 맡길 수 있을까?'},
 {id:'ownership',name:'로컬 AI 독립파',short:'AI 독립파',tagline:'내 AI의 열쇠를 남의 회사에 맡기고 싶진 않아.',description:'무료 이용권보다 계속 가지고 쓰고 고칠 수 있는 권리가 눈에 들어왔어. 회사의 정책이나 서비스 종료가 내 생활까지 결정하지 않기를 바라는 쪽이야.',tradeoff:'최고 성능이나 편리함 일부를 양보해도, 운영과 기록을 내 손에 두고 싶어.',reflection:'내 AI가 공용 서비스보다 불편하다면, 어느 정도까지 직접 관리할 수 있을까?'},
 {id:'partner',name:'디지털 동반자파',short:'동반자파',tagline:'미래에 누가 더 똑똑해질지보다, 누구와 살지가 궁금해.',description:'AI와 무엇을 할 수 있는지에 더해, 누구와 시간을 이어갈지도 골랐어. 기능 목록만으로 바꾸기 어려운 관계와 함께 쌓은 기억에 자리를 내주는 쪽이야.',tradeoff:'새 기능이나 익숙한 장소보다, 함께한 상대와 이어지는 대화를 먼저 챙길 수 있어.',reflection:'같은 상대라고 느끼게 하는 건 기억, 말투, 함께한 시간 중 무엇일까?'},
 {id:'virtual',name:'풀다이브 이주파',short:'이주파',tagline:'태어난 세계에서만 평생 살아야 한다는 법은 없잖아.',description:'현실을 편하게 만드는 기술만으로는 상상이 끝나지 않았어. 다른 세계에서 지낼 일상과 장소도 삶의 일부가 될 수 있다고 고른 쪽이야.',tradeoff:'새로운 곳을 잠깐 체험하는 데서 그치지 않고, 현실 밖에도 생활의 무대를 넓혀 보고 싶어.',reflection:'어떤 조건이 갖춰져야 가상세계의 어느 곳을 내 집이라고 부를 수 있을까?'},
 {id:'upgrade',name:'업데이트 선발대',short:'선발대',tagline:'AI만 발전하고, 내가 그대로일 이유는 없지.',description:'생활이 편해지는 것에 더해, 전에 못 하던 일을 할 수 있게 되는 쪽을 골랐어. 새 도구와 분신, 감각과 능력의 확장을 통해 내가 어디까지 달라질 수 있는지가 궁금한 쪽이야.',tradeoff:'익숙함을 일부 내려놓거나 적응할 일이 생겨도, 새로운 가능성을 시험해 보고 싶어.',reflection:'바꾸고 싶은 내 능력과, 달라져도 그대로 남았으면 하는 것은 무엇일까?'}
];
export function summarize(answers){
 if(!validateAnswers(answers))throw new TypeError('Unknown question or answer');
 const complete=validateAnswers(answers,true);
 const ranked=profiles.map(p=>{
  const opportunities=questions.filter(q=>q.options.some(o=>o.value===p.id)).length;
  const evidence=questions.filter(q=>answers[q.id]===p.id).map(q=>({id:q.id,title:q.title,...chosen(answers,q.id)}));
  return {...p,points:evidence.length,opportunities,evidence};
 }).sort((a,b)=>b.points-a.points);
 const answered=Object.values(answers).filter(v=>v!=='skip').length;
 const skipped=Object.values(answers).filter(v=>v==='skip').length;
 const peak=ranked[0].points;
 const leaders=ranked.filter(p=>p.points===peak&&peak>0);
 const sufficient=answered>=4&&peak>=3;
 const profile=complete&&sufficient&&leaders.length===1?leaders[0]:null;
 const kind=answered===0?'empty':!sufficient?'open':leaders.length>1?'mixed':'single';
 const headline=profile?.name||(kind==='empty'?'이번 미래는 아직 빈칸':kind==='mixed'?leaders.map(p=>p.short).join(' × '):'관심이 여러 곳에 나뉘었어');
 const code=profile?.id||(kind==='mixed'?'mixed:'+leaders.map(p=>p.id).sort().join('+'):kind);
 const supporting=ranked.filter(p=>p.points>0&&p.id!==profile?.id);
 return {version:RESULT_VERSION,complete,answered,skipped,peak,kind,code,profile,leaders,ranked,supporting,headline};
}
