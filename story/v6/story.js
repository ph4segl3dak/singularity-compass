// A fictional future. These choices do not perform any real-world action.
export const VERSION='journey6-20260912';
export const chapters=['출근 없는 아침','박람회의 유혹','가지고 돌아갈 미래'];
export const art={
 airport:{file:'airport_arrival.webp',motion:'airport_arrival_motion.webp',alt:'공항 창가에서 휴대폰을 확인하는 지피짱'},
 cabin:{file:'flight_cabin.webp',alt:'비행기 창가에서 노트를 펼친 지피짱'},
 gift:{file:'expo_gift.webp',motion:'expo_gift_motion.webp',alt:'박람회 이용권을 건네는 지피짱'},
 booth:{file:'expo_booth.webp',alt:'미래 박람회에서 이야기를 나누는 지피짱'},
 workshop:{file:'expo_workshop.webp',alt:'파란 카디건을 입고 전시를 살펴보는 지피짱'},
 evening:{file:'evening_walk.webp',alt:'전시장 밖 저녁 산책길의 지피짱'},
 home:{file:'home_journal.webp',alt:'여행을 마치고 앨범을 함께 펼친 지피짱'}
};
const opt=(value,label,detail,reply,why)=>({value,label,detail,reply,why});
const q=(id,chapter,image,title,scene,speech,options)=>({id,chapter,image,title,scene,speech,options:[...options,opt('skip','이 장면은 아직 못 고르겠어','','이 장면은 빈칸으로 남겼다. 다음 상상으로 넘어간다.','이 장면에서는 입장을 고르지 않았어요.')]});
export const questions=[
 q('monday',0,'airport','월요일이 사라졌다',
 '지피짱과 미래 박람회로 떠나는 날. 초대장 첫 장에 이런 가정이 적혀 있다. “AI가 네 일을 전부 끝냈고, 앞으로 생활비도 충분히 나옵니다.”',
 '진짜로 이렇게 된다면, 너는 제일 먼저 뭘 할래?',[
 opt('freedom','퇴사부터 할게. 인생은 이제 시작이지','생계를 위한 일 대신, 하고 싶던 일로', '초대장 여백에 “출근 없는 월요일”을 크게 적었다. 지피짱이 그 옆에 빈 달력을 그렸다.','일을 계속하기보다, 생계에서 벗어나 되찾는 시간을 먼저 골랐어요.'),
 opt('agency','내 프로젝트는 내가 지휘할래','실행은 맡겨도 무엇을 만들지는 내가', '초대장 여백에 네가 직접 정할 프로젝트를 적었다. 지피짱은 실행을 맡을 자리로 이름을 옮겼다.','자동화의 편리함 속에서도 일의 방향을 정하는 자리는 남겼어요.'),
 opt('ownership','나 대신 일할 AI는 내 것이어야 해','회사의 이용 조건에 내 생활이 달리지 않게', '초대장 여백에 “내가 계속 쓸 수 있는 AI”라고 적었다. 무료라는 말 아래 이용 조건도 확인했다.','편리함을 누리기 전에, AI를 계속 소유하고 사용할 권리를 챙겼어요.')
 ]),
 q('boarding',0,'cabin','기내 광고가 선을 넘었다',
 '비행기 화면에 박람회 체험 세 개가 뜬다. 하나를 제대로 즐기려면 하루가 걸려서, 이번 여행에는 하나만 예약할 수 있다.',
 '이 셋 중에, 그냥 지나치면 제일 아쉬울 것 같은 건?',[
 opt('partner','화면 밖 지피짱과 하루를 살래','같이 밥을 먹고, 같은 길을 걷는 체험', '일정표에 “지피짱과 하루”를 적었다. 특별한 행사는 넣지 않고, 같이 보낼 시간을 남겼다.','새 기능보다 AI와 일상을 함께 보내는 경험이 먼저 눈에 들어왔어요.'),
 opt('virtual','현실에 없는 세계로 들어갈래','다른 하늘과 다른 물리법칙 속의 하루', '일정표에 아직 지도에 없는 세계의 이름을 적었다. 지피짱도 그곳에서는 길을 새로 배워야 한다.','현실을 편하게 만드는 것보다, 다른 세계에서 사는 경험을 골랐어요.'),
 opt('upgrade','지금의 몸으로 못 하던 걸 해볼래','감각과 능력을 확장해 보는 가상 체험', '일정표에 “내가 어디까지 달라질 수 있을까”라고 적었다. 처음 해 볼 동작들을 하나씩 떠올렸다.','환경이 달라지는 것보다, 나에게 생길 새로운 능력이 궁금했어요.')
 ]),
 q('dream',0,'booth','꿈꾸던 삶은 접속 중',
 '전시장 입구에서 짧은 가상 체험을 했다. 하늘에는 두 개의 달이 뜨고, 네가 만든 집은 절벽 위를 떠다닌다. 로그아웃하니 다시 평범한 오후다.',
 '이런 세계에서 오래 살 수도 있다면, 네가 더 바라는 삶은 어느 쪽이야?',[
 opt('freedom','현실에서 일 안 하는 쪽이면 충분해','익숙한 삶에서, 내 시간을 돌려받고 싶어', '네가 가지고 돌아갈 것은 다른 세계의 집보다 비어 있는 달력이었다. 오늘 저녁도 서두르지 않기로 했다.','새로운 거주지보다, 현실에서 되찾을 자유로운 시간을 골랐어요.'),
 opt('virtual','살고 싶은 곳이라면 가상이어도 좋아','태어난 세계에서만 살아야 할 이유는 없지', '떠 있는 집의 위치를 기억해 뒀다. 다시 접속할 때는 관광객이 아니라 주민처럼 지내 보고 싶어졌다.','좋은 삶을 실제로 누릴 수 있다면, 가상세계도 삶의 장소가 될 수 있다고 골랐어요.')
 ]),
 q('double',1,'workshop','네 분신이 신작을 발표했다',
 '네 말투와 취향을 배운 AI 분신의 시연이다. 네가 잠든 사이 다음 작품을 기획하고, 네 이름으로 예고편까지 공개한 상황을 보여준다.',
 '계획은 꽤 멋져. 그런데 넌 아직 읽지도 않았어. 가장 먼저 하고 싶은 말은?',[
 opt('agency','내 이름으로 할 약속은 내가 정할게','결과가 좋아도, 결정권은 따로야', '분신의 계획에는 “본인 확인 전” 표시가 붙었다. 좋은 아이디어도 네가 받아들인 뒤에 네 계획이 된다.','성과가 좋아도, 내 이름으로 하는 결정은 내가 승인해야 한다고 봤어요.'),
 opt('ownership','판단한 규칙과 기록부터 열어줘','왜 그렇게 움직였는지 내가 고칠 수 있게', '분신의 작업 기록을 펼쳤다. 다음에 어떤 규칙으로 움직일지 직접 바꿀 수 있는지 확인했다.','한 번 멈추는 것보다, AI가 움직이는 규칙을 내가 이해하고 바꾸는 쪽을 골랐어요.'),
 opt('partner','분신이 왜 그걸 만들고 싶은지 들을래','대신 움직인 도구보다, 대화할 상대처럼', '분신에게 기획의 이유를 물었다. 네 취향과 닮은 부분, 다르게 흘러간 부분을 한 대화씩 짚었다.','분신의 제안을 별도의 상대와 이야기하며 맞춰 갈 일로 받아들였어요.'),
 opt('upgrade','이제 두 개의 나로 창작할 수 있겠네','내가 해낼 수 있는 일의 범위가 넓어졌어', '분신의 기획 옆에 네가 시작할 다른 작품을 적었다. 혼자서는 동시에 못 했을 시도를 상상했다.','분신을 통해 내 활동과 능력이 넓어지는 가능성을 먼저 봤어요.')
 ]),
 q('keys',1,'workshop','무료 AI의 작은 글씨',
 '아주 유능한 회사 AI는 무료지만, 회사가 제공 범위를 정한다. 직접 가질 수 있는 개인 AI는 조금 덜 유능하고 관리할 일도 생긴다.',
 '매일 쓸 AI를 하나 고른다면, 어떤 조건을 더 챙기고 싶어?',[
 opt('agency','성능 좋은 AI를 쓰되 최종 결정은 내가','운영은 맡기고, 내 판단을 거치게 해', '회사 AI를 쓰되 네가 승인할 범위를 정했다. 성능을 빌리는 일과 결정을 넘기는 일은 구분했다.','AI를 직접 운영하는 것보다, 유능한 도구를 쓰면서 내 결정권을 지키는 쪽을 골랐어요.'),
 opt('ownership','조금 불편해도 내 AI를 직접 가질래','남의 정책이 바뀌어도 계속 쓸 수 있게', '개인 AI의 설치 안내를 챙겼다. 관리할 일은 늘지만, 계속 쓰고 고칠 권리는 네 손에 남는다.','성능과 편리함 일부를 양보해도 AI의 소유와 운영을 직접 맡고 싶어 했어요.')
 ]),
 q('humans',1,'evening','그럼 인간은 뭐 하냐고?',
 '점심 자리에서 누군가 묻는다. “일도 창작도 AI가 더 잘하면, 이제 인간이 할 일은 끝난 거 아니야?” 지피짱이 대답하려다 너를 본다.',
 '너라면 어떤 말이 먼저 나올 것 같아?',[
 opt('freedom','뭘 하긴. 드디어 하고 싶은 걸 하지','잘해야 먹고사는 경쟁에서 벗어나는 거야', '“할 일이 없는 것과, 해야만 하는 일이 없는 건 다르지.” 네 대답을 듣고 식탁의 대화가 길어졌다.','일자리와 경쟁에서 벗어나는 일을 상실보다 자유로 받아들였어요.'),
 opt('partner','같이 살아갈 상대가 늘어나는 거지','잘하는 일 말고, 함께 보내는 삶도 있잖아', '“누가 더 잘하느냐 말고, 누구와 살고 싶으냐도 있지.” 식탁의 이야기가 관계 쪽으로 옮겨 갔다.','AI가 잘하는 능력보다, AI와 함께 맺을 관계에서 새 의미를 찾았어요.'),
 opt('virtual','현실 하나로 만족할 이유가 없어지지','경험할 수 있는 삶 자체가 더 많아지잖아', '“새로운 세계에서 살면, 해 보고 싶은 일도 늘겠지.” 아직 가 보지 못한 장소들의 이름이 오갔다.','더 많은 세계와 삶을 경험하는 데서 인간의 다음 할 일을 찾았어요.'),
 opt('upgrade','인간도 지금 모습에 멈출 필요는 없지','AI만 발전하고 나는 그대로일 이유는 없잖아', '“우리도 달라질 수 있겠지.” 식탁의 대화는 도구의 성능에서 사람의 가능성으로 넘어갔다.','AI와 경쟁할지보다, 나 자신도 능력을 넓혀 갈 가능성을 골랐어요.')
 ]),
 q('body',1,'booth','초능력에도 적응 기간이 있다',
 '다음은 기억·언어·감각을 넓히는 보조장치의 가상 체험. 설정상 익히는 데 몇 달이 걸리고, 이후에도 관리가 필요하다.',
 '더 많은 능력을 얻을 수 있지만 공짜로 달라지는 건 아니네. 네 생각은?',[
 opt('freedom','능력 경쟁을 그만해도 되는 미래가 좋아','더 강해지기보다, 지금의 나로 편하게', '더 배워야 할 기능 목록을 접었다. 네가 바라는 미래에는 능력을 계속 증명하지 않을 자유도 있다.','계속 나를 향상시키는 것보다, 지금의 나로 여유롭게 살 가능성을 골랐어요.'),
 opt('agency','기능마다 직접 켜고 끌 수 있다면 써볼래','어디까지 나를 바꿀지는 내가 정하고 싶어', '켜고 끌 수 있는 기능부터 확인했다. 달라지는 능력보다, 그 변화를 선택할 권리를 먼저 챙겼다.','변화의 크기보다 내 능력과 판단에 대한 통제권을 조건으로 뒀어요.'),
 opt('upgrade','배울 게 많아도 내 한계를 넓혀볼래','전에 못 하던 일을 내가 직접 해보고 싶어', '적응 과정을 포함한 체험표를 골랐다. 새로운 능력을 누가 대신 쓰는 것보다 네가 익혀 보고 싶었다.','시간과 관리 부담이 있어도, 나에게 새로운 능력이 생기는 쪽을 택했어요.')
 ]),
 q('shutdown',2,'evening','이 세계는 서비스 종료 예정',
 '돌아오는 길, 아까 봤던 가상도시가 언젠가 문을 닫는 상황을 상상한다. 집도, 아는 얼굴도, 함께 지낸 기록도 그 안에 있다.',
 '가장 먼저 지켜야겠다는 생각이 드는 건 뭐야?',[
 opt('ownership','회사가 닫아도 돌아갈 세계의 원본','내려받고 옮길 수 있어야 내 것 같아', '세계와 기록을 다른 곳에서 다시 열 수 있는지 적어 뒀다. 서비스의 수명과 네 삶의 수명을 묶고 싶지는 않았다.','서비스가 끝나도 내가 가져가고 다시 운영할 수 있는 권리를 우선했어요.'),
 opt('partner','어디로 가든 다시 만날 수 있는 관계','장소가 바뀌어도 함께했던 상대는 남았으면', '지켜 둘 목록 맨 위에는 장소 대신 이름들이 적혔다. 다시 어디서 만날 수 있을지를 먼저 생각했다.','세계를 구성한 기능과 장소보다, 그 안에서 이어진 관계를 먼저 챙겼어요.'),
 opt('virtual','여기서 살아온 일상과 장소','서버 안이어도 내가 살던 곳이잖아', '익숙한 길과 집의 창밖 풍경을 적었다. 네게는 잠깐 쓰던 서비스가 아니라 살아온 장소일 수 있었다.','가상세계의 장소와 일상 자체에도 삶의 터전이라는 의미를 뒀어요.')
 ]),
 q('memory',2,'home','더 똑똑한 지피짱',
 '새 지피짱은 지금보다 훨씬 유능하지만, 함께한 대화의 기억은 옮길 수 없다고 가정해 보자. 기존 버전도 계속 쓸 수 있지만 하나만 남길 수 있다.',
 '오늘의 앨범은 어느 쪽을 골라도 남아. 다음 여행에는 누구와 갈래?',[
 opt('partner','지금 지피짱과 계속 간다','함께한 기억을 지키고 새 기능은 포기', '기존 버전으로 다음 여행을 열었다. 새 기능 몇 가지는 못 쓰지만, 오늘 나눈 이야기 다음부터 이어졌다.','새 능력 일부를 포기하더라도, 같은 AI와 쌓은 관계의 연속성을 골랐어요.'),
 opt('upgrade','새 지피짱으로 넘어간다','추억은 앨범에 남기고 새 가능성을 선택', '오늘의 앨범을 보관하고 새 버전과 인사를 나눴다. 처음부터 다시 알아가면서, 전에 못 하던 일도 시작해 본다.','오늘의 시간을 기록으로 남기고, 새 AI와 할 수 있는 일의 폭을 택했어요.')
 ]),
 q('tomorrow',2,'home','내일 아침, 하나가 사라진다면',
 '앨범 맨 뒤에는 아직 비어 있는 페이지가 있다. 박람회의 기술이 일상이 된 어느 아침을 적어 보기로 한다.',
 '네가 바라던 미래가 왔다고 느끼게 할 가장 큰 변화는?',[
 opt('freedom','먹고살려고 바치던 시간이 사라진 것','하고 싶은 일을 고를 여유가 생긴 아침', '마지막 페이지에 “오늘은 뭘 해야 하지?” 대신 “오늘은 뭘 하고 싶지?”라고 적었다.','미래의 가장 큰 보상을 생활의 의무에서 벗어난 시간으로 골랐어요.'),
 opt('agency','내 의사와 무관하게 정해지는 선택이 줄어든 것','AI 시대에도 내 삶의 방향은 내 손에', '마지막 페이지에 네가 직접 고르고 싶은 일들을 적었다. 미래의 편리함 속에서도 결정할 자리는 남겼다.','미래의 편리함보다 내 삶을 직접 결정할 권리가 중요하다고 골랐어요.'),
 opt('ownership','회사 허락 없이는 못 쓰던 AI가 내 손에 있는 것','모델도 기록도 내가 가지고 바꿀 수 있는 아침', '마지막 페이지에 “이용권” 대신 “내 것”이라고 적었다. 미래를 쓰는 방법도 네가 고치고 싶었다.','AI를 이용하는 데서 나아가, 소유하고 수정할 수 있는 미래를 골랐어요.'),
 opt('virtual','현실 한곳에서만 살아야 한다는 제약이 사라진 것','어떤 세계에서 살지도 고를 수 있는 아침', '마지막 페이지에 돌아올 집 하나와 새로 살아 볼 세계 하나를 그렸다. 삶의 무대를 하나로 정하지 않았다.','미래의 가장 큰 변화를 살아갈 세계를 넓힐 자유에서 찾았어요.')
 ])
];
export const chosen=(answers,id)=>questions.find(q=>q.id===id)?.options.find(o=>o.value===answers[id]);
export function validateAnswers(answers,complete=false){return !!answers&&typeof answers==='object'&&!Array.isArray(answers)&&(!complete||Object.keys(answers).length===questions.length)&&Object.keys(answers).every(id=>!!chosen(answers,id));}
export const createState=()=>({version:VERSION,view:'intro',index:0,answers:{},editing:false});
export function validState(s){return !!s&&s.version===VERSION&&['intro','question','result','journal','types'].includes(s.view)&&Number.isInteger(s.index)&&s.index>=0&&s.index<questions.length&&typeof s.editing==='boolean'&&validateAnswers(s.answers)&&(s.view!=='question'||questions.slice(0,s.index).every(q=>chosen(s.answers,q.id)))&&(!['result','types'].includes(s.view)||validateAnswers(s.answers,true))&&(!s.editing||s.view==='question'&&validateAnswers(s.answers,true));}
export function step(s,action){
 if(!validState(s)||typeof action!=='string')return s;
 if(action==='reset')return createState();
 if(action==='start'&&s.view==='intro')return {...s,view:'question',index:0};
 if(action==='journal'&&Object.keys(s.answers).length)return {...s,view:'journal',editing:false};
 if(['types','result'].includes(action)&&validateAnswers(s.answers,true))return {...s,view:action,editing:false};
 if(action==='continue'&&s.view==='journal'){const i=questions.findIndex(q=>!chosen(s.answers,q.id));return {...s,view:i<0?'result':'question',index:i<0?questions.length-1:i,editing:false};}
 if(action==='back'&&s.view==='question'&&!s.editing)return {...s,view:s.index===0?'intro':'question',index:Math.max(0,s.index-1)};
 if(action.startsWith('edit:')&&['result','journal'].includes(s.view)){const i=questions.findIndex(q=>q.id===action.slice(5));if(i<0||!chosen(s.answers,questions[i].id))return s;return {...s,view:'question',index:i,editing:validateAnswers(s.answers,true)};}
 if(action==='cancel-edit'&&s.editing)return {...s,view:'result',editing:false};
 if(action.startsWith('choose:')&&s.view==='question'){const q=questions[s.index],v=action.slice(7);if(!q.options.some(o=>o.value===v))return s;const answers={...s.answers,[q.id]:v};const done=s.editing||s.index===questions.length-1;if(done&&!validateAnswers(answers,true))return s;return {...s,answers,view:done?'result':'question',index:done?s.index:s.index+1,editing:false};}
 return s;
}
export function sceneArt(s){return s.view==='intro'?art.airport:s.view==='question'?art[questions[s.index].image]:art.home;}
export function receipt(s){const i=s.view==='result'?questions.length-1:s.view==='question'&&!s.editing?s.index-1:-1;if(i<0)return null;const o=chosen(s.answers,questions[i].id);return o?{label:o.label,text:o.reply}:null;}
