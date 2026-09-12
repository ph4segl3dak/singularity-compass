// Fictional choices. These actions never book, send, purchase or change real data.
export const VERSION = 'journey5-20260912';
export const chapters = ['출발, 우리 부스를 향해', '둘이서 꾸리는 하루', '여행이 끝나도'];
export const art = {
  airport: {file:'airport_arrival.webp', motion:'airport_arrival_motion.webp', alt:'공항 창가에서 휴대폰을 확인하는 지피짱'},
  review: {file:'review_flight.webp', alt:'대체 항공편을 함께 살펴보는 지피짱'},
  pass: {file:'boarding_pass.webp', alt:'탑승권을 건네는 지피짱'},
  gift: {file:'expo_gift.webp', motion:'expo_gift_motion.webp', alt:'박람회 이용권을 보여주는 지피짱'},
  cabin: {file:'flight_cabin.webp', alt:'비행기 창가에서 노트를 펼친 지피짱'},
  booth: {file:'expo_booth.webp', alt:'AI 박람회 부스를 소개하는 지피짱'},
  workshop: {file:'expo_workshop.webp', alt:'파란 카디건을 입고 부스 운영을 준비하는 지피짱'},
  evening: {file:'evening_walk.webp', alt:'전시장 밖 저녁 산책길의 지피짱'},
  home: {file:'home_journal.webp', alt:'편한 니트 차림으로 여행앨범을 펼친 지피짱'},
};

const option = (value, label, detail, reply, why) => ({value,label,detail,reply,why});
const unsure = (label,reply) => option('undecided',label,'',reply,'지금 주어진 이야기만으로는 방향을 정하지 않았어요.');

export const questions = [
  {
    id:'flight', axis:'delegation', chapter:0, image:'airport', title:'출발부터 작은 변수',
    scene:'공항에 도착하자 항공편 취소 알림이 떴다. 오늘 우리는 AI 박람회에서 작은 여행 부스를 열기로 했다.',
    speech:'추가 요금 없이 제시간에 도착하는 표를 찾았어. 남은 자리가 몇 개 없는데, 어떻게 할까?',
    options:[
      option('review','표는 내가 고를게','좌석·경유편을 보고 직접 결정', '화면을 돌려 네가 고른 표를 확인했다. 이제 우리 부스 준비물을 챙길 차례다.', '급한 상황에서도 내게 맞는 편인지 직접 보는 데 무게를 뒀어요.'),
      option('delegate','조건 맞으면 잡아줘','제시간 도착·추가 요금 없음만 지키기', '지피짱이 정한 조건에 맞는 표를 잡아 건넸다. 이제 우리 부스 준비물을 챙길 차례다.', '정한 조건을 지키면 구체적인 편 선택은 맡기는 쪽을 골랐어요.'),
      unsure('지금은 못 정하겠어','이번 표는 안내 데스크 직원의 도움으로 바꿨다. AI에 맡길지는 정하지 않은 채 준비물을 챙긴다.'),
    ],
  },
  {
    id:'kit', axis:'openness', chapter:0, image:'gift', title:'우리 부스의 준비물',
    scene:'박람회 이용권에는 여행 안내 AI 하나가 포함돼 있다. 방문객과 대화할 안내를 함께 만들기로 했다.',
    speech:'우리 말투로 직접 고쳐 쓸까? 아니면 준비된 서비스로 부스 운영에 집중할까?',
    options:[
      option('managed','준비된 서비스로 가자','수정 범위는 좁지만 운영 지원을 받음','설정 화면에서 필요한 항목을 골랐다. 준비 시간을 아껴 비행기에 올라탔다.', '직접 바꾸는 자유보다 준비 시간과 운영 지원을 챙겼어요.'),
      option('open','우리 손으로 고쳐보자','설정·코드를 받아 수정하고 직접 운영','노트에 우리만의 안내 방식을 적었다. 비행기에서 설정을 조금 더 손보기로 했다.', '점검할 일이 늘어도 우리에게 맞게 고칠 수 있는 쪽을 골랐어요.'),
      unsure('방식은 더 알아볼래','오늘은 기본 체험판으로 시작한다. 어떤 방식이 맞는지는 사용해 보고 정하기로 했다.'),
    ],
  },
  {
    id:'airport2036', axis:'outlook', chapter:0, image:'cabin', title:'10년 뒤에도 탑승구에서',
    scene:'비행기가 이륙했다. 행사에서 나눠 준 엽서에는 “2036년에 열어 주세요”라고 적혀 있다.',
    speech:'그때 비행기가 또 취소되면, AI는 어디까지 해줄 수 있을 것 같아?',
    prompt:'바라는 모습보다, 실제로 일어날 법한 쪽',
    options:[
      option('leap','돌발 상황까지 해결할 듯해','교통·숙소까지 엮어 새 계획을 실행','엽서에 “예상 못 한 일까지 이어서 해결하는 AI”라고 적었다. 구름 아래로 전시장이 있는 도시가 보인다.', '여러 일을 연결해 돌발 상황까지 맡는 큰 변화를 예상했어요.'),
      option('gradual','대안은 찾아도 판단은 남겠지','복잡한 예외는 사람이 연결하고 결정','엽서에 “좋은 대안을 줘도 마지막 연결은 사람”이라고 적었다. 구름 아래로 전시장이 있는 도시가 보인다.', '도움은 커져도 예외를 연결하는 사람의 역할이 남을 것으로 봤어요.'),
      unsure('10년 뒤는 잘 모르겠어','엽서의 첫 칸을 비워 두었다. 오늘 부스를 돌아본 뒤 생각이 생길 수도 있으니까.'),
    ],
  },
  {
    id:'credit', axis:'relationship', chapter:0, image:'booth', title:'만든 사람 이름을 적을 때',
    scene:'부스에 도착했다. 너와 지피짱이 대화를 주고받으며 만든 여행 안내에 작은 제작자 표를 붙인다.',
    speech:'내 이름은 어디에 적을까? 두 칸 모두 기여한 내용을 설명할 수 있어.',
    options:[
      option('partner','함께 만든 팀원 칸에','지피짱과 내가 나란히','제작자 표에 두 이름이 나란히 놓였다. 지피짱이 표를 부스 앞에 세웠다.', 'AI의 기여를 함께 작업한 동료의 자리에서 표현했어요.'),
      option('tool','도움을 받은 도구 칸에','사용한 AI와 역할을 표시','제작자 표 아래에 사용한 AI와 역할을 적었다. 지피짱이 표를 부스 앞에 세웠다.', 'AI의 기여를 내가 사용한 도구의 역할로 구분했어요.'),
      unsure('표현은 조금 더 고민할래','제작자 칸은 잠시 비워 두고, 안내부터 시작한다. 호칭은 서두르지 않아도 된다.'),
    ],
  },
  {
    id:'repair', axis:'openness', chapter:1, image:'workshop', title:'처음 보는 말투의 손님',
    scene:'안내 AI가 일부 방문객의 지역 말투를 잘 못 알아듣는다. 회사는 다음 달에 고치겠다고 하고, 이용자 모임에는 수정본이 올라왔다.',
    speech:'오늘 바꿔볼 수는 있어. 대신 우리가 먼저 시험하고, 이후 관리도 챙겨야 해.',
    options:[
      option('open','수정본을 시험해보자','직접 점검한 뒤 적용·관리','부스 옆에 시험용 화면을 열었다. 익숙하지 않은 표현부터 너와 지피짱이 하나씩 확인했다.', '공식 지원을 기다리기보다 직접 고칠 가능성과 책임을 택했어요.'),
      option('managed','공식 수정을 기다리자','오늘은 사람이 옆에서 도와주기','오늘은 못 알아들은 말을 사람이 한 번 더 풀어 주기로 했다. 오류 목록은 회사에 전달할 노트에 남겼다.', '당장의 불편을 감수하고 공식 관리 경로를 유지했어요.'),
      unsure('수정본부터 더 살펴볼래','수정본은 적용하지 않고 설명을 더 읽었다. 오늘은 사람이 곁에서 안내하며 결정을 미뤘다.'),
    ],
  },
  {
    id:'queue', axis:'delegation', chapter:1, image:'workshop', title:'빈자리는 생기고, 줄은 길고',
    scene:'체험 예약에 취소가 나면 빈 시간이 생긴다. 대기 손님들은 “같은 체험이면 10분 안의 이동은 괜찮다”고 했다.',
    speech:'동의한 범위에서 순서를 다시 짤 수 있어. 바뀔 때마다 보여줄까, 빈자리를 바로 채울까?',
    options:[
      option('delegate','빈자리를 바로 채워줘','같은 체험·10분 이내에서만 이동','지피짱이 동의한 범위 안에서 대기표를 조정했다. 너는 새로 온 손님 안내를 이어갔다.', '범위를 정한 뒤 현장 조정은 AI가 바로 실행하도록 맡겼어요.'),
      option('review','바뀐 순서는 먼저 보여줘','한 번씩 확인한 뒤 손님에게 안내','바뀐 대기표를 네가 확인한 뒤 안내했다. 확인하는 동안 다음 손님에게 잠시 기다려 달라고 했다.', '조금 기다리더라도 바뀐 순서를 직접 확인하는 쪽을 골랐어요.'),
      unsure('자동으로 바꿀지는 아직 몰라','자동 변경은 보류했다. 오늘은 네가 표를 정리하되, 앞으로 맡길지는 열린 채로 남겼다.'),
    ],
  },
  {
    id:'robot2036', axis:'outlook', chapter:1, image:'booth', title:'멋진 시연 다음의 빈 상자',
    scene:'옆 부스 로봇은 정해진 순서로 물건을 능숙하게 포장했다. 처음 보는 모양의 상자를 주자 멈췄다.',
    speech:'시연 밖으로 나오니 어려워졌네. 이런 빈틈도 10년이면 많이 메워질까?',
    options:[
      option('gradual','낯선 현장이 계속 발목 잡겠지','잘하는 일과 못하는 일의 차이가 남음','엽서에 “시연과 낯선 현장 사이의 간격”을 적었다. 멈춘 로봇 옆에서 직원이 상자를 바꿨다.', '낯선 환경에 적응하는 문제가 오래 남을 것으로 예상했어요.'),
      option('leap','낯선 일도 배워서 해낼 듯해','현장에서 익히는 능력이 크게 달라짐','엽서에 “낯선 일도 현장에서 익히는 AI”를 적었다. 멈춘 로봇 옆에서 직원이 상자를 바꿨다.', '현장에서 새로운 일을 익히는 능력에 큰 변화가 있을 것으로 봤어요.'),
      unsure('이 시연만 보고는 모르겠어','이번 시연만으로 10년 뒤를 정하긴 어려웠다. 엽서에 물음표 하나를 남겼다.'),
    ],
  },
  {
    id:'break', axis:'relationship', chapter:1, image:'evening', title:'부스 문을 닫고 나면',
    scene:'운영이 끝났다. 해 질 무렵 잠깐 걸을 시간이 있다. 지피짱이 강변과 골목길, 두 경로를 보여준다.',
    speech:'둘 다 시간 안에 돌아올 수 있어. 나는 오늘 강변이 끌리는데, 어떻게 고를까?',
    options:[
      option('tool','내 취향에 맞춰 추천해줘','내가 좋아할 경로를 찾는 도움으로','네가 좋아하는 풍경을 기준으로 경로를 정했다. 지피짱이 지도를 접고 옆에서 길을 안내했다.', 'AI의 제안은 내 취향에 맞는 선택을 돕는 역할로 받았어요.'),
      option('partner','서로 끌리는 쪽을 맞춰보자','함께 걷는 상대의 제안으로','너도 끌리는 풍경을 말하고 함께 길을 골랐다. 지피짱이 지도를 접고 네 옆으로 걸음을 맞췄다.', 'AI의 제안을 함께 맞춰 갈 동행의 의견처럼 받았어요.'),
      unsure('어떤 마음으로 받을지 모르겠어','그 제안을 어떻게 받아들일지는 정하지 않았다. 우선 눈앞에 열린 산책길로 걸음을 옮겼다.'),
    ],
  },
  {
    id:'share', axis:'openness', chapter:2, image:'home', title:'우리 안내를 나눠 달라는 연락',
    scene:'다음 날, 집에서 사진을 정리하다 연락을 받았다. 다른 모임도 우리가 만든 여행 안내를 쓰고 싶다고 한다.',
    speech:'각자 고쳐 쓰게 나눌까? 아니면 우리가 관리하는 같은 버전을 쓰게 할까?',
    options:[
      option('open','각자 고칠 수 있게 나누자','다양해지지만 모임마다 동작이 달라짐','개인 자료를 뺀 안내 코드와 설정을 묶었다. 각 모임이 고친 버전은 따로 관리하기로 했다.', '동작이 달라질 수 있어도 여러 모임이 직접 바꾸는 자유를 택했어요.'),
      option('managed','한 버전으로 관리해서 열자','맞춤 수정은 줄이고 안내를 일관되게','개인 자료를 뺀 공용 서비스를 열기로 했다. 고칠 점을 모아 한 버전씩 함께 갱신한다.', '각자의 수정 범위보다 공통된 동작과 관리 창구를 중시했어요.'),
      unsure('어디까지 나눌지 더 생각할래','공개 범위는 아직 정하지 않았다. 지금은 체험 방법을 소개하고 질문을 더 받아 보기로 했다.'),
    ],
  },
  {
    id:'album', axis:'delegation', chapter:2, image:'home', title:'마지막 열두 장',
    scene:'사진이 백 장 넘게 남았다. 얼굴이 흔들리지 않고 장면이 겹치지 않는 열두 장으로 앨범을 만들기로 했다.',
    speech:'기준대로 추려서 완성할 수 있어. 원본은 전부 따로 남겨둘게.',
    options:[
      option('delegate','그 기준으로 완성해줘','세부 컷 선택과 순서는 맡기기','지피짱이 열두 장을 골라 앨범을 펼쳤다. 원본 사진은 모두 별도 폴더에 남아 있다.', '되돌릴 수 있고 기준이 정해진 작업은 완성까지 맡겼어요.'),
      option('review','마지막 컷은 내가 고를게','추린 사진을 보고 최종 구성 확인','지피짱이 후보 사진을 펼쳤다. 너는 남길 열두 장과 순서를 고른 뒤 앨범을 닫았다.', '기준이 있어도 마지막 결과물은 직접 고르고 싶어 했어요.'),
      unsure('맡길 범위는 더 생각할래','앨범은 아직 완성하지 않고 후보 사진만 모았다. 어느 부분을 맡길지는 다음에 정한다.'),
    ],
  },
  {
    id:'work2036', axis:'outlook', chapter:2, image:'home', title:'다음 엽서는 2036년에',
    scene:'어제 적은 엽서를 앨범 사이에 넣는다. 이번엔 다음 박람회를 준비하는 평범한 하루를 상상한다.',
    speech:'10년 뒤, “이런 부스를 열자”는 말 다음에는 누가 일을 이어갈 것 같아?',
    options:[
      option('leap','AI가 준비부터 운영까지 잇겠지','사람은 목표를 정하고 큰 방향을 고름','엽서의 마지막 줄에 “목표를 말하면 일의 흐름을 잇는 AI”라고 적었다. 오늘의 앨범도 거의 완성됐다.', '여러 단계의 일을 AI가 이어 맡아 일하는 방식이 크게 바뀔 것으로 봤어요.'),
      option('gradual','사람이 단계마다 이어줘야겠지','AI가 잘하는 일을 골라 붙여 쓰기','엽서의 마지막 줄에 “단계를 연결하는 사람과 곁의 AI”라고 적었다. 오늘의 앨범도 거의 완성됐다.', '능력이 좋아져도 단계 사이를 잇는 사람의 역할이 클 것으로 예상했어요.'),
      unsure('일하는 모습은 아직 그려지지 않아','엽서의 마지막 줄에는 빈칸이 남았다. 지금 정할 수 없는 미래도 그대로 넣어 두기로 했다.'),
    ],
  },
  {
    id:'continuity', axis:'relationship', chapter:2, image:'home', title:'다음에도 같이 갈래?',
    scene:'앱에서 다음 여행용 AI를 고르라는 알림이 왔다. 두 버전의 기능과 이용 조건은 같다. 차이는 함께 쌓은 대화의 연속성이다.',
    speech:'사진과 여행 정보는 어느 쪽에도 옮길 수 있어. 다음엔 어떻게 시작하고 싶어?',
    options:[
      option('partner','오늘의 우리를 이어가자','같이 쌓은 대화까지 이어지는 지피짱','앨범 옆에 다음 여행의 빈 페이지를 남겼다. “그럼, 오늘 얘기 다음부터 이어가자.”', '기능과 기록 외에도 같은 상대와 대화가 이어지는 데 의미를 뒀어요.'),
      option('tool','기록만 옮겨 새로 시작하자','필요한 정보가 있으면 새 AI도 괜찮음','앨범 옆에 다음 여행의 빈 페이지를 남겼다. “다음에도 도움이 될 기록은 잘 챙겨 둘게.”', '대화 상대의 연속성보다 필요한 정보와 기능이 이어지는 데 무게를 뒀어요.'),
      unsure('지금은 정하지 않을래','다음 여행의 빈 페이지는 아직 누구와 채울지 정하지 않았다. 오늘 고른 것부터 함께 펼쳐 본다.'),
    ],
  },
];

export function chosen(answers, id) {
  return questions.find(q=>q.id===id)?.options.find(o=>o.value===answers[id]);
}
export function validateAnswers(answers, complete=false) {
  if (!answers || typeof answers!=='object' || Array.isArray(answers)) return false;
  const keys=Object.keys(answers);
  return (!complete || keys.length===questions.length) && keys.every(id=>chosen(answers,id));
}
export const createState = () => ({version:VERSION,view:'intro',index:0,answers:{},editing:false});
export function validState(s) {
  return !!s && s.version===VERSION && ['intro','question','result','journal','types'].includes(s.view)
    && Number.isInteger(s.index) && s.index>=0 && s.index<questions.length
    && typeof s.editing==='boolean' && validateAnswers(s.answers)
    && (s.view!=='question'||questions.slice(0,s.index).every(q=>chosen(s.answers,q.id)))
    && (s.view!=='result' && s.view!=='types' || validateAnswers(s.answers,true))
    && (!s.editing || s.view==='question' && validateAnswers(s.answers,true));
}
export function step(state, action) {
  if (!validState(state) || typeof action!=='string') return state;
  if (action==='reset') return createState();
  if (action==='start' && state.view==='intro') return {...state,view:'question',index:0};
  if (action==='journal' && Object.keys(state.answers).length) return {...state,view:'journal',editing:false};
  if (action==='result' && validateAnswers(state.answers,true)) return {...state,view:'result',editing:false};
  if (action==='types' && validateAnswers(state.answers,true)) return {...state,view:'types',editing:false};
  if (action==='continue' && state.view==='journal') {
    const first=questions.findIndex(q=>!chosen(state.answers,q.id));
    return {...state,view:first<0?'result':'question',index:first<0?11:first,editing:false};
  }
  if (action==='back' && state.view==='question' && !state.editing) {
    return {...state,view:state.index===0?'intro':'question',index:Math.max(0,state.index-1)};
  }
  if (action.startsWith('edit:') && ['result','journal'].includes(state.view)) {
    const index=questions.findIndex(q=>q.id===action.slice(5));
    if(index<0||!chosen(state.answers,questions[index].id))return state;
    return {...state,view:'question',index,editing:validateAnswers(state.answers,true)};
  }
  if (action==='cancel-edit' && state.editing) return {...state,view:'result',editing:false};
  if (action.startsWith('choose:') && state.view==='question') {
    const q=questions[state.index], value=action.slice(7);
    if(!q.options.some(o=>o.value===value))return state;
    const answers={...state.answers,[q.id]:value};
    const finished=state.editing || state.index===questions.length-1;
    if(finished && !validateAnswers(answers,true))return state;
    return {...state,answers,view:finished?'result':'question',index:finished?state.index:state.index+1,editing:false};
  }
  return state;
}
export function sceneArt(state) {
  if (state.view==='intro')return art.airport;
  if (state.view!=='question')return art.home;
  if(state.index===1 && state.answers.flight!=='undecided')return art[state.answers.flight==='delegate'?'pass':'review'];
  return art[questions[state.index].image];
}
export function receipt(state) {
  if(state.view==='question' && !state.editing && state.index>0) {
    const q=questions[state.index-1],o=chosen(state.answers,q.id);
    return o?{label:o.label,text:o.reply}:null;
  }
  if(state.view==='result')return {label:'오늘의 여행',text:chosen(state.answers,'continuity')?.reply||''};
  return null;
}
