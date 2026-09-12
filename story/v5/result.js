import {questions, chosen, validateAnswers} from './story.js';
export const RESULT_VERSION='journey5-reading-1';
export const axes=[
  {id:'outlook',name:'내일의 변화',ids:['airport2036','robot2036','work2036'],poles:[{value:'leap',code:'L',label:'큰 전환을 예상'},{value:'gradual',code:'G',label:'점진적 변화를 예상'}],note:'원하는 미래가 아닌, 세 장면에서 예상한 변화예요.',reflection:'어떤 변화가 실제로 보이면 2036년에 관한 예상을 바꾸고 싶나요?'},
  {id:'openness',name:'AI를 고치는 방식',ids:['kit','repair','share'],poles:[{value:'open',code:'O',label:'열어서 함께 고침'},{value:'managed',code:'C',label:'관리되는 버전을 사용'}],note:'수정의 자유와 직접 관리할 부담 사이에서 고른 방식이에요.',reflection:'직접 고치는 자유를 위해 어디까지 관리할 수 있을까요?'},
  {id:'delegation',name:'일을 맡길 때',ids:['flight','queue','album'],poles:[{value:'review',code:'R',label:'실행 전에 확인'},{value:'delegate',code:'D',label:'범위를 정하고 위임'}],note:'표 예약·현장 조정·앨범 제작에서 맡긴 범위예요.',reflection:'되돌릴 수 있는 일과 되돌리기 어려운 일에서 맡기는 기준이 달라지나요?'},
  {id:'relationship',name:'지피짱과의 거리',ids:['credit','break','continuity'],poles:[{value:'tool',code:'T',label:'도움을 주는 도구'},{value:'partner',code:'P',label:'함께하는 동료'}],note:'이야기에서 AI를 대한 방식이에요. AI가 실제 감정을 느낀다는 믿음으로 해석하지 않아요.',reflection:'기능이 똑같아도 함께한 대화가 이어지는 일이 얼마나 중요한가요?'},
];
const names={LORT:'내일의 지도 제작자',LORP:'별길을 묻는 동행자',LODT:'새 항로의 설계자',LODP:'미지로 가는 탐험대',LCRT:'새 노선을 살피는 기장',LCRP:'창가의 미래 관찰자',LCDT:'급행열차의 설계자',LCDP:'내일행 동반 승객',GORT:'마을길의 지도 제작자',GORP:'골목을 기록하는 산책가',GODT:'길을 고치는 안내자',GODP:'천천히 가는 원정대',GCRT:'시간표를 챙기는 여행자',GCRP:'쉼표를 남기는 여행자',GCDT:'정기편의 운항 설계자',GCDP:'긴 여정의 동반 승객'};
export const profiles=Object.entries(names).map(([code,name])=>({code,name,labels:axes.map((a,i)=>a.poles.find(p=>p.code===code[i]).label)}));

export function summarize(answers) {
  if(!validateAnswers(answers))throw new TypeError('Unknown question or answer');
  const complete=validateAnswers(answers,true);
  const readings=axes.map(axis=>{
    const counts=axis.poles.map(p=>axis.ids.filter(id=>answers[id]===p.value).length);
    const pending=axis.ids.filter(id=>answers[id]==='undecided').length;
    const missing=axis.ids.filter(id=>!Object.hasOwn(answers,id)).length;
    const winner=counts.findIndex(n=>n>=2);
    const mixed=counts.every(n=>n>0);
    const status=winner>=0?(mixed?'leaning':'directional'):(mixed?'mixed':'undecided');
    const code=winner>=0?axis.poles[winner].code:mixed?'M':'U';
    const label=winner>=0?axis.poles[winner].label:mixed?'상황에 따라 달랐어요':'아직 열어 둔 생각';
    const evidence=axis.ids.map(id=>({id,title:questions.find(q=>q.id===id).title, ...chosen(answers,id)}));
    let summary;
    if(winner>=0){
      summary=counts[winner]===3?'세 장면에서 같은 방향을 골랐어요.':pending?'두 장면은 이 방향, 한 장면은 유보했어요.':'두 장면은 이 방향, 한 장면은 다른 쪽을 골랐어요.';
      if(mixed){const other=evidence.find(e=>e.value===axis.poles[1-winner].value);summary+=` ‘${other.title}’에서는 “${other.label}”라고 답했어요.`;}
    } else if(mixed) summary='서로 다른 방향을 한 번씩 골랐어요. 유보한 답으로 동점을 깨지 않았어요.';
    else summary=pending===3?'세 장면 모두 판단을 유보했어요. 어느 쪽으로도 정하지 않았어요.':'방향을 정한 답이 부족해요. 한 번의 선택으로 유형을 정하지 않았어요.';
    return {...axis,counts,pending,missing,status,code,label,mixed,summary,evidence};
  });
  const code=readings.map(a=>a.code).join('');
  const candidates=profiles.filter(p=>readings.every((a,i)=>['M','U',p.code[i]].includes(a.code)));
  const profile=complete?profiles.find(p=>p.code===code):null;
  const headline=profile?.name||(readings.every(a=>a.status==='undecided')?'빈칸도 남겨 둔 여행자':'한 가지로 담기지 않는 여행자');
  const intro=readings.map(a=>a.status==='mixed'?`${a.name}에서는 상황마다 선택이 달랐어요.`:a.status==='undecided'?`${a.name}은 아직 정하지 않았어요.`:`${a.name}에서는 ‘${a.label}’ 쪽${a.status==='leaning'?'으로 조금 기울었어요.':'을 골랐어요.'}`);
  return {version:RESULT_VERSION,complete,code,profile,headline,intro,axes:readings,candidates};
}
