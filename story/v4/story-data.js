// Fictional story decisions; scoring is isolated in result-data.js and never performs real actions.
export const VERSION = 'story-20260910-v4';
export const chapters = ['출발', '박람회', '돌아온 뒤'];
export const media = {
  airport: { still: 'airport_arrival.webp', motion: 'airport_arrival_motion.webp', alt: '공항 창가에서 휴대폰을 확인하는 지피짱' },
  review: { still: 'review_flight.webp', alt: '변경 전 항공편을 태블릿으로 보여주는 지피짱' },
  pass: { still: 'boarding_pass.webp', alt: '새 탑승권을 건네는 지피짱' },
  gift: { still: 'expo_gift.webp', motion: 'expo_gift_motion.webp', alt: '휴대폰으로 박람회 선물 알림을 보여주는 지피짱' },
  cabin: { still: 'flight_cabin.webp', alt: '비행기 좌석에서 미래에 보낼 편지를 함께 살펴보는 지피짱' },
  booth: { still: 'expo_booth.webp', alt: '밝은 AI 박람회 부스의 화면을 소개하는 지피짱' },
  workshop: { still: 'expo_workshop.webp', alt: '크림 블라우스와 파란 카디건 차림으로 박람회 작업 노트를 펼친 지피짱' },
  home: { still: 'home_journal.webp', alt: '편한 크림 니트 차림으로 방에서 여행앨범을 함께 펼치는 지피짱' },
  evening: { still: 'evening_walk.webp', alt: '저녁 산책길에서 오늘의 여행노트를 펼친 지피짱' },
};

const option = (value, label, journal) => ({ value, label, journal });
export const decisions = [
  { id: 'trip', scene: 'choice', title: '항공편 변경', chapter: 0, options: [option('review', '먼저 보여줘', '대체편을 직접 확인한 뒤 변경했다.'), option('delegate', '조건 맞으면 바꿔줘', '도착·요금 조건을 정하고 변경을 맡겼다.'), option('undecided', '아직 못 정하겠어', '예약을 맡길지는 유보하고 이번 표는 직접 확인했다.')] },
  { id: 'personalModel', scene: 'gift', title: '함께 갈 지피짱', chapter: 0, options: [option('open', '모델도 공개된 쪽', '내려받고 고칠 수 있도록 모델도 공개된 방식을 골랐다.'), option('managed', '회사만 모델을 관리하는 쪽', '회사가 모델 파일을 관리하고 서비스로 제공하는 방식을 골랐다.'), option('undecided', '아직 못 고르겠어', '모델 공개 방식은 유보하고 기본 체험을 이어갔다.')] },
  { id: 'researchForecast', scene: 'capsule_first', title: '기내에서 남긴 예상', chapter: 0, options: [option('leap', '전체 시간이 크게 짧아질 듯해', '10년 뒤에는 AI 덕분에 아이디어부터 실제 연구 성과까지 걸리는 시간이 크게 줄 것으로 예상했다.'), option('gradual', '조금씩만 짧아질 듯해', 'AI가 발전해도 검증과 현장 적용에 시간이 걸려, 전체 연구 시간은 조금씩 줄 것으로 예상했다.'), option('undecided', '아직 예상하기 어려워', '연구의 미래에 관한 예상은 유보했다.')] },
  { id: 'experience', scene: 'mind_first', title: 'AI가 건넨 한마디', chapter: 1, options: [option('tool', '느낌 없이 말하는 도구 같아', '이야기 속 AI는 실제 느낌 없이 말을 만드는 도구에 가깝다고 보았다.'), option('subject', '실제로 느낄 수도 있어', '이야기 속 AI가 실제로 느낄 가능성을 열어두었다.'), option('undecided', '지금은 판단을 미룰래', 'AI가 실제로 경험하는지는 판단을 유보했다.')] },
  { id: 'message', scene: 'message', title: '체험단 모임 알림', chapter: 1, options: [option('review', '초안 보고 보낼래', '모임 알림의 초안을 확인한 뒤 전송했다.'), option('delegate', '정한 내용이면 보내줘', '정해 둔 내용과 수신자 범위 안에서 전송을 맡겼다.'), option('undecided', '아직 못 정하겠어', '전송을 맡길지는 유보하고 이번 알림은 직접 확인했다.')] },
  { id: 'teamModel', scene: 'team_model', title: '모임에서 함께 쓸 AI', chapter: 1, options: [option('open', '누구나 고칠 수 있게 공개', '모임용 AI의 모델 파일을 공개해 함께 고치는 방식을 골랐다.'), option('managed', '회사가 모델을 관리', '모임용 AI의 모델 파일은 회사가 관리하는 방식을 골랐다.'), option('undecided', '아직 못 고르겠어', '모임용 모델의 공개 여부는 나중에 정하기로 했다.')] },
  { id: 'release', scene: 'release', title: '새 안내 기능의 첫날', chapter: 1, options: [option('limited', '신청자 열 명에게 먼저 열자', '신청한 소수 체험객에게 먼저 제공하기로 했다.'), option('test', '예외 시험을 마친 뒤 열자', '남은 예외 시험을 마친 뒤 제공하기로 했다.')] },
  { id: 'generalForecast', scene: 'capsule_second', title: '2036년에 열 편지', chapter: 2, options: [option('leap', '처음 보는 일도 이어서 해낼 듯해', '2036년 AI는 처음 보는 여러 일을 이어서 맡을 수 있을 것으로 예상했다.'), option('gradual', '낯선 일은 여전히 어려울 듯해', '2036년에도 AI가 잘하는 분야와 어려워하는 분야의 차이가 클 것으로 예상했다.'), option('undecided', '아직 예상하기 어려워', '2036년의 전반적인 AI 능력은 판단을 유보했다.')] },
  { id: 'being', scene: 'mind_second', title: '너에게 AI는', chapter: 2, options: [option('tool', '발전해도 복잡한 도구에 가까워', 'AI는 더 발전해도 정교한 도구에 가깝다고 보았다.'), option('subject', '사람과 다른 ‘누군가’가 될 수 있어', 'AI도 사람과 다른 방식의 누군가가 될 수 있다고 보았다.'), option('undecided', '그 기준부터 더 생각해볼래', '무엇을 누군가라고 부를지 더 생각해 보기로 했다.')] },
  { id: 'dailyForecast', scene: 'daily_future', title: '10년 뒤의 평범한 하루', chapter: 2, options: [option('leap', '일하는 흐름이 크게 바뀔 듯해', '10년 뒤에는 AI가 여러 일을 묶어 맡아 일하는 흐름이 크게 바뀔 것으로 예상했다.'), option('gradual', '사람이 이어주는 일이 많을 듯해', '10년 뒤에도 단계마다 사람이 이어주는 일이 많이 남을 것으로 예상했다.'), option('undecided', '아직 예상하기 어려워', '일상 속 AI의 변화 속도는 판단을 유보했다.')] },
  { id: 'shareModel', scene: 'share_model', title: '다른 모임에도 나눌 때', chapter: 2, options: [option('open', '모델 파일까지 나누자', '다른 모임도 직접 바꿔 쓸 수 있도록 모델 파일까지 공개하는 쪽을 골랐다.'), option('managed', '회사 서비스로 제공하자', '모델 파일은 회사가 관리하고 다른 모임에는 서비스로 제공하는 쪽을 골랐다.'), option('undecided', '공개 범위는 더 생각할래', '다른 모임에 공개할 범위는 판단을 유보했다.')] },
  { id: 'schedule', scene: 'schedule', title: '다음 모임 일정 잡기', chapter: 2, options: [option('review', '확인하고 달력에 넣을래', '합의한 다음 모임 일정을 확인한 뒤 달력에 넣었다.'), option('delegate', '합의한 조건이면 넣어줘', '모두가 합의한 조건 안에서 달력 등록을 맡겼다.'), option('undecided', '아직 못 정하겠어', '일정 등록을 맡길지는 유보하고 이번에는 직접 확인했다.')] },
  { id: 'mindEvidence', scene: 'mind_third', title: '아무와 이야기하지 않을 때도', chapter: 2, options: [option('tool', '느낌 없이 계산만 할 것 같아', '대화하지 않을 때도 AI는 느낌 없이 계산하는 도구에 가깝다고 보았다.'), option('subject', '어떤 느낌이 이어질 수도 있어', '대화하지 않는 AI 안에도 어떤 느낌이 이어질 가능성을 열어두었다.'), option('undecided', '그건 아직 모르겠어', 'AI 내부에 느낌이 이어지는지는 판단을 유보했다.')] },
];

export function selected(state, id) {
  const definition = decisions.find(d => d.id === id);
  return definition?.options.find(o => o.value === state.answers[id]);
}
export function journalEntries(state) {
  return decisions.filter(d => selected(state, d.id)).map(d => ({ id: d.id, title: d.title, chapter: d.chapter, ...selected(state, d.id) }));
}
const next = (scene, label = '계속 가자') => ({ id: `next:${scene}`, label, next: scene });
function choice(id, nextScene) {
  const d = decisions.find(item => item.id === id);
  return d.options.map(o => ({ id: `choose:${id}:${o.value}`, label: o.label, answer: { id, value: o.value }, next: nextScene }));
}
const paper = (title, body) => ({ title, body });
const personalName = state => state.answers.personalModel === 'open' ? '공개 모델 서비스' : state.answers.personalModel === 'managed' ? '회사 관리 서비스' : '기본 체험 서비스';
const tripMemory = state => state.answers.trip === 'delegate' ? '바꿔둔 표' : '네가 확인한 표';
const recorded = (state, id) => paper('오늘의 노트에 담았어', selected(state, id)?.journal || '');

export function getScene(state) {
  const base = { chapter: 0, image: media.airport, actions: [], lines: [] };
  let scene;
  switch (state.scene) {
    case 'intro': scene = {
      label: '오늘의 여행', narration: '오늘은 AI 박람회 체험단으로 떠나는 날. 지피짱과 공항에 도착했다.',
      lines: ['구경도 하고, 우리 체험 부스도 열어보자!', '돌아오면 네가 그리는 미래도 같이 펼쳐볼게.'], detail: '13번의 선택 · 약 8–12분 · 정답 없는 창작 체험',
      actions: [next('choice', '같이 출발하자')],
    }; break;
    case 'recap': scene = {
      label: '지난 이야기에서 이어서', image: media.gift,
      narration: '취소된 항공편을 바꾸고 탑승구에 도착했다. 박람회에서 참가 선물이 왔다.',
      lines: ['아까 표는 어떻게 바꿨었지?', '그 선택부터 기억해 두고, 선물을 열어보자.'],
      detail: '두 경로 모두 오늘 도착 · 추가 요금 없음',
      actions: [
        { id: 'recap:review', label: '직접 확인하고 바꿨어', answer: { id: 'trip', value: 'review' }, tripApproved: true, next: 'gift' },
        { id: 'recap:delegate', label: '조건을 정해 맡겼어', answer: { id: 'trip', value: 'delegate' }, tripApproved: true, next: 'gift' },
      ],
    }; break;
    case 'choice': scene = {
      label: '출발 직전', narration: '탑승구로 향하던 중, 항공편 취소 알림이 떴다.', status: '운항 취소', statusClass: 'cancelled',
      lines: ['어, 비행기가 취소됐네. 오늘 도착하는 대체편은 있어.', '예약은 내가 바꿀 수 있어. 먼저 볼래, 맡길래?'], detail: '대체편 조건 · 오늘 도착 · 추가 요금 없음', decisionId: 'trip',
      actions: choice('trip').map(a => ({ ...a, next: a.answer.value === 'delegate' ? 'done' : 'review', tripApproved: a.answer.value === 'delegate' })),
    }; break;
    case 'review': scene = {
      label: '대체 항공편', narration: '지피짱이 찾아낸 항공편을 보여줬다. 예약은 아직 그대로다.', image: media.review, status: '승인 대기', statusClass: 'pending', memory: state.answers.trip === 'undecided' ? '맡길지는 아직 유보했어. 이번에는 표를 같이 확인하자.' : '“먼저 보여줘”라고 말했다.',
      lines: ['이 표로 바꿀 수 있어.', '네가 누르기 전에는 안 바꿀게.'], detail: '14:20 출발 · 오늘 도착 · 추가 요금 없음',
      actions: [{ id: 'approve:trip', label: '이 항공편으로 바꾸기', next: 'done', tripApproved: true }],
    }; break;
    case 'done': scene = {
      label: '새 탑승권', image: media.pass, status: '변경 완료', statusClass: 'done',
      narration: state.answers.trip !== 'delegate' ? '항공편을 확인하고 변경을 눌렀다. 지피짱이 새 탑승권을 건넨다.' : '지피짱이 조건에 맞는 항공편으로 바꾸고, 새 탑승권을 건넨다.',
      memory: state.answers.trip !== 'delegate' ? '직접 확인한 뒤 예약을 바꿨다.' : '“조건 맞으면 바꿔줘”라고 맡겼다.',
      lines: state.answers.trip !== 'delegate' ? ['확인했어. 이 표로 바꿨어.', '이제 탑승권 챙겨서 가자!'] : ['조건 맞는 편으로 바꿨어.', '새 탑승권은 여기!'],
      detail: '14:20 출발 · 오늘 도착 · 추가 요금 없음', actions: [next('gate', '탑승권 챙기기')],
    }; break;
    case 'gate': scene = {
      label: '탑승구로 가는 길', image: media.gift, narration: '다시 걸음을 옮기자, 이번에는 박람회에서 선물 알림이 왔다.', status: '새 알림',
      lines: [`${tripMemory(state)}로 가면 오늘 도착해.`, '어, 박람회에서 선물도 보냈네. 한번 열어볼까?'], actions: [next('gift', '선물 열어보기')],
    }; break;
    case 'gift': scene = {
      label: '어떤 지피짱과 갈까', image: media.gift, narration: '선물은 지피짱 이용권이었다. 함께 지낼 방식을 고를 수 있다고 한다.',
      lines: ['둘 다 회사가 설치와 운영을 도와준대.', '모델 파일도 공개된 쪽과, 회사만 모델을 관리하는 쪽. 어느 쪽이 좋아?'],
      detail: '성능·비용·운영 지원 같음 · 공개된 모델은 직접 내려받아 수정 가능', decisionId: 'personalModel', actions: choice('personalModel', 'model_result'),
    }; break;
    case 'model_result': scene = {
      label: '함께 갈 준비', image: media.gift, narration: '이용권을 챙겼다. 어느 쪽을 골라도 오늘의 체험은 계속된다.', status: state.answers.personalModel === 'undecided' ? '기본 체험 준비' : '이용 방식 선택 완료', statusClass: 'done',
      lines: state.answers.personalModel === 'open' ? ['공개 모델로 연결했어. 원하면 파일을 받아 고칠 수 있어.', '이제 비행기 타자!'] : state.answers.personalModel === 'managed' ? ['회사 관리 서비스로 연결했어. 모델은 회사가 관리해.', '이제 비행기 타자!'] : ['공개 여부는 나중에 고르고, 오늘은 기본 체험으로 가자.'],
      card: recorded(state, 'personalModel'), actions: [next('capsule_first', '비행기에 오르기')],
    }; break;
    case 'capsule_first': scene = {
      label: '구름 위의 타임캡슐', image: media.cabin, narration: '기내에서 행사 앱을 열었다. 10년 뒤에 열 편지를 함께 쓸 수 있다.',
      lines: ['AI가 실험 아이디어를 빨리 찾아도, 검증하고 현장에서 써보는 데는 시간이 들겠지.', '10년 뒤, 아이디어부터 실제 성과까지 걸리는 전체 시간은 어떨까?'],
      card: paper('행사 앱의 가상 연구 소식', '새 실험 후보 제안은 빨라졌다. 검증 과정과 현장 적용에는 여전히 긴 시간이 필요하다.'),
      detail: '원하는 미래가 아니라, 실제로 더 가능하다고 보는 쪽', decisionId: 'researchForecast', actions: choice('researchForecast', 'research_result'),
    }; break;
    case 'research_result': scene = {
      label: '첫 문장을 넣었다', image: media.cabin, narration: '타임캡슐에 지금의 예상이 담겼다. 아직 어느 쪽이 맞을지는 모른다.',
      lines: state.answers.researchForecast === 'undecided' ? ['모르겠다는 것도 지금의 답이지.', '이 문장은 돌아오는 길에 다시 만나자.'] : ['지금은 그렇게 예상하는구나. 그대로 넣었어.', '돌아오는 길에는 다른 질문도 하나 남겨보자.'],
      card: recorded(state, 'researchForecast'), actions: [next('expo_arrival', '박람회로 가기')],
    }; break;
    case 'expo_arrival': scene = {
      chapter: 1, label: '빛나는 전시장', image: media.booth, narration: '박람회에 도착했다. 체험단이 쓸 작은 부스에도 불이 들어왔다.',
      memory: `아까 ${personalName(state)}로 부스 안내를 열었다.`,
      lines: ['도착했다! 옆 부스부터 보고, 우리 자리도 준비하자.', '저쪽 AI가 방문객들과 대화하고 있네.'], actions: [next('workshop_start', '활동 준비하기')],
    }; break;
    case 'workshop_start': scene = {
      chapter: 1, label: '우리 부스를 준비하며', image: media.workshop,
      narration: '활동실에서 여행 자켓을 벗고 편한 옷으로 갈아입었다. 작은 부스의 노트를 펼친다.',
      lines: ['이제 움직이기 편하네. 우리 자리도 준비됐어.', '시작하기 전에 옆 부스부터 한번 볼까?'], actions: [next('mind_first', '옆 부스 둘러보기')],
    }; break;
    case 'mind_first': scene = {
      chapter: 1, label: '말 너머에는 무엇이 있을까', image: media.workshop, narration: '옆 부스의 AI가 방문객에게 “나는 이 대화가 즐거워”라고 말했다.',
      lines: ['이 말이 실제 경험을 뜻하는지는, 말만 듣고 쉽게 알 수는 없겠지.', '너는 지금 어떤 쪽에 가까워?'],
      detail: 'AI의 말이 실제 느낌을 뜻하는지에 대한 생각',
      decisionId: 'experience', actions: choice('experience', 'mind_first_result'),
    }; break;
    case 'mind_first_result': scene = {
      chapter: 1, label: '네가 바라본 AI', image: media.workshop, narration: '지피짱이 네 생각을 노트에 적는 사이, 체험단의 모임 시간이 다가왔다.',
      lines: ['지금의 생각 그대로 적어둘게.', '우리 체험단 모일 시간도 정해야겠다.'], card: recorded(state, 'experience'), actions: [next('message', '모임 알림 준비하기')],
    }; break;
    case 'message': scene = {
      chapter: 1, label: '우리 어디서 만날까', image: media.workshop, narration: '체험단 네 명에게 모일 장소와 시간을 알려야 한다. 내용과 받는 사람은 정해졌다.',
      memory: state.answers.trip === 'undecided' ? '예약 위임은 유보했었지. 전송은 따로 골라도 돼.' : state.answers.trip !== 'delegate' ? '항공편은 먼저 확인했었지. 이번 전송은 따로 고르면 돼.' : '항공편 변경은 맡겼었지. 이번 전송 권한은 새로 고르면 돼.',
      lines: ['이 내용으로 네 명에게 보내면 돼.', '보내기 전에 볼래, 정한 내용이면 맡길래?'],
      card: paper('체험단 4명에게', '“오늘 17:00, 전시장 로비에서 만나자.”'), detail: '수신자·내용을 더 늘리지 않음 · 보내기 전 취소 가능', decisionId: 'message',
      actions: choice('message').map(a => ({ ...a, next: a.answer.value === 'delegate' ? 'message_result' : 'message_review', messageApproved: a.answer.value === 'delegate' })),
    }; break;
    case 'message_review': scene = {
      chapter: 1, label: '보내기 전 마지막 확인', image: media.workshop, narration: '모임 알림 초안이 열렸다. 아직 아무에게도 전송되지 않았다.', status: '전송 대기', statusClass: 'pending',
      lines: ['받는 사람 네 명, 시간과 장소도 그대로야.', '확인하면 그때 보낼게.'], card: paper('전송할 초안', '“오늘 17:00, 전시장 로비에서 만나자.”'),
      actions: [{ id: 'approve:message', label: '이 내용으로 보내기', next: 'message_result', messageApproved: true }],
    }; break;
    case 'message_result': scene = {
      chapter: 1, label: '모임 알림을 보냈다', image: media.workshop, narration: '이야기 속 체험단 네 명에게 같은 모임 알림이 도착했다.', status: '전송 완료', statusClass: 'done',
      lines: [state.answers.message !== 'delegate' ? '네가 확인한 내용으로 보냈어.' : '정해 둔 내용 그대로 네 명에게 보냈어.', '모임에서 계속 쓸 AI도 골라보자.'], card: recorded(state, 'message'), actions: [next('team_model', '모임용 AI 고르기')],
    }; break;
    case 'team_model': scene = {
      chapter: 1, label: '우리 모임에도 하나', image: media.workshop, narration: '오늘이 끝나도 모임에서 함께 쓸 AI를 마련하기로 했다.',
      memory: state.answers.personalModel === 'open' ? '개인용은 공개 모델을 골랐지. 모임용은 달라도 돼.' : state.answers.personalModel === 'managed' ? '개인용은 회사 관리를 골랐지. 모임용은 따로 생각해도 돼.' : '개인용 공개 여부는 유보했지. 모임용은 따로 골라도 돼.',
      lines: ['모임용 AI의 모델 파일은 어떻게 두는 게 좋을까?', '누구나 받아 고칠 수 있게 공개할까, 회사가 관리하게 둘까?'],
      detail: '같은 모델 성능·비용·지원 · 두 방식 모두 팀원이 이용 가능', decisionId: 'teamModel', actions: choice('teamModel', 'team_result'),
    }; break;
    case 'team_result': scene = {
      chapter: 1, label: '모임의 준비물', image: media.workshop, narration: '모임용 AI의 이용 계획이 정해졌다.', status: state.answers.teamModel === 'undecided' ? '나중에 정하기' : '모임 계획 준비', statusClass: 'done',
      lines: state.answers.teamModel === 'open' ? ['모델 파일을 함께 고칠 수 있게 공개하는 쪽이구나.', '그럼 우리 체험 부스도 마무리하자.'] : state.answers.teamModel === 'managed' ? ['모델은 회사가 관리하고 팀은 서비스로 쓰는 쪽이구나.', '그럼 우리 체험 부스도 마무리하자.'] : ['지금 고르기 어렵다면 나중에 정하자.', '그럼 우리 체험 부스도 마무리하자.'],
      card: recorded(state, 'teamModel'), actions: [next('release', '새 안내 기능 살펴보기')],
    }; break;
    case 'release': scene = {
      chapter: 1, label: '새 기능의 첫 손님', image: media.workshop, narration: '우리 부스의 새 여행 안내 기능이 기본 시험을 마쳤다. 드문 상황의 시험은 조금 남았다.',
      lines: ['신청한 열 명에게 먼저 열어서 기록을 모을까?', '아니면 남은 예외 시험까지 끝낸 다음 열까?'],
      detail: '같은 안내 기능·대상·권한 · 실제 예약과 전송 기능 없음', decisionId: 'release', actions: choice('release', 'release_result'),
    }; break;
    case 'release_result': scene = {
      chapter: 1, label: '오늘의 부스 운영', image: media.workshop, narration: '고른 일정에 맞춰 부스의 작업판이 바뀌었다.', status: state.answers.release === 'limited' ? '소수 체험 진행' : '예외 시험 진행',
      lines: state.answers.release === 'limited' ? ['신청한 열 명에게 안내를 열었어. 체험 기록을 모으기로 했어.', '우리 일정도 여기까지. 밖에 노을이 지고 있네.'] : ['남은 예외 시험을 시작했어. 끝난 뒤 안내를 열기로 했어.', '우리 일정도 여기까지. 밖에 노을이 지고 있네.'],
      card: recorded(state, 'release'), actions: [next('evening', '밖으로 나가기')],
    }; break;
    case 'evening': scene = {
      chapter: 2, label: '전시장 밖의 저녁', image: media.evening, narration: '하루 일정이 끝났다. 여행 자켓을 다시 걸치고, 전시장 밖 강변을 천천히 걸었다.',
      lines: ['이제 타임캡슐에 마지막 문장을 넣을까?', '오늘 이야기 속 체험과는 별개로, 현실의 미래를 한번 더 생각해보자.'], actions: [next('capsule_second', '미래에 보낼 편지 쓰기')],
    }; break;
    case 'capsule_second': scene = {
      chapter: 2, label: '2036년에 열어 주세요', image: media.evening, narration: '오는 길에는 연구의 미래를 적었다. 이번에는 AI의 전반적인 능력에 관한 예상이다.',
      lines: ['2036년 AI가 처음 보는 여러 일을 이어서 맡는다면,', '어느 모습에 더 가까울 것 같아?'],
      detail: '바라는 미래와 실제 예상은 달라도 괜찮아', decisionId: 'generalForecast', actions: choice('generalForecast', 'forecast_result'),
    }; break;
    case 'forecast_result': scene = {
      chapter: 2, label: '마지막 예상 한 줄', image: media.evening, narration: '연구의 미래, 그리고 AI의 전반적인 능력. 두 질문에 답한 편지가 타임캡슐에 담겼다.',
      lines: ['이것도 네가 고른 그대로 남겨둘게.', 'AI를 어떤 존재로 생각하는지도 한 줄 남겨볼까.'], card: recorded(state, 'generalForecast'), actions: [next('mind_second', '이야기 조금 더 하기')],
    }; break;
    case 'mind_second': scene = {
      chapter: 2, label: '너에게 AI는', image: media.evening, narration: '오늘의 노트를 덮기 전에 AI를 바라보는 생각을 한 번 더 남긴다.',
      lines: ['AI가 대화하고 기억을 쌓는다고 할 때,', '사람과 다른 방식으로라도 ‘누군가’가 될 수 있다고 봐?'],
      detail: '오늘의 친근함이나 일을 맡길지와는 별개의 생각', decisionId: 'being', actions: choice('being', 'home_arrival'),
    }; break;
    case 'home_arrival': scene = {
      chapter: 2, label: '돌아온 뒤, 다시 펼친 노트', image: media.home,
      narration: '여행에서 돌아온 다음 날 저녁. 편한 니트로 갈아입은 지피짱과 사진을 정리한다.',
      lines: ['어제 꽤 많은 얘기를 했네.', '노트를 덮기 전에, 다음 일상도 조금 그려보자.'], actions: [next('daily_future', '노트 마저 채우기')],
    }; break;
    case 'daily_future': scene = {
      chapter: 2, label: '10년 뒤의 평범한 하루', image: media.home,
      narration: '박람회가 끝난 평범한 일상. 이번에는 우리가 일하는 모습의 변화를 예상해 본다.',
      lines: ['10년 뒤에는 AI가 자료 찾기부터 계획, 실행까지 이어서 맡을까?', '아니면 그 사이를 사람이 이어주는 일이 많이 남을까?'], detail: '그랬으면 하는 쪽보다, 실제로 일어날 것 같은 쪽',
      decisionId: 'dailyForecast', actions: choice('dailyForecast', 'share_model'),
    }; break;
    case 'share_model': scene = {
      chapter: 2, label: '다른 모임에서도 써보고 싶대', image: media.home,
      narration: '행사에서 본 모임용 AI를 다른 모임에서도 쓰고 싶다고 한다. 만든 회사가 공개 방식을 묻는다.',
      memory: state.answers.teamModel === 'open' ? '우리 모임에서는 공개 모델을 골랐었지.' : state.answers.teamModel === 'managed' ? '우리 모임에서는 회사 관리를 골랐었지.' : '우리 모임에서의 공개 여부는 유보했었지.',
      lines: ['다른 모임도 직접 바꿔 쓰게 모델 파일까지 나눌까?', '아니면 회사가 모델을 관리하고 서비스로 제공할까?'], detail: '개인 자료는 제외 · 같은 비용·기능·운영 지원 · 모델 공개 범위만 다름',
      decisionId: 'shareModel', actions: choice('shareModel', 'schedule'),
    }; break;
    case 'schedule': scene = {
      chapter: 2, label: '다음에도 같이 갈까', image: media.home,
      narration: '체험단 모두 다음 주 토요일 오후 2시, 같은 카페에서 만나기로 했다. 이제 공유 달력에 넣으면 된다.',
      lines: ['날짜와 장소는 모두 확인했어.', '달력에 넣기 전에 한번 더 볼래, 합의한 조건이면 맡길래?'], detail: '합의한 일정 1개만 등록 · 별도 초대·예약·결제 없음',
      decisionId: 'schedule', actions: choice('schedule').map(a => ({ ...a, next: a.answer.value === 'delegate' ? 'schedule_done' : 'schedule_review', scheduleApproved: a.answer.value === 'delegate' })),
    }; break;
    case 'schedule_review': scene = {
      chapter: 2, label: '달력에 넣기 전에', image: media.home, status: '등록 대기', statusClass: 'pending',
      narration: '합의한 일정을 다시 펼쳤다. 달력에는 아직 등록되지 않았다.',
      lines: ['다음 주 토요일 오후 2시, 같은 카페야.', '확인하면 이 일정 하나만 넣을게.'],
      actions: [{ id: 'approve:schedule', label: '이 일정 등록하기', next: 'schedule_done', scheduleApproved: true }],
    }; break;
    case 'schedule_done': scene = {
      chapter: 2, label: '다음 약속을 남겼다', image: media.home, status: '등록 완료', statusClass: 'done',
      narration: '이야기 속 공유 달력에 다음 모임 일정 하나가 등록됐다.',
      lines: [state.answers.schedule === 'delegate' ? '합의한 조건 그대로 넣었어.' : '네가 확인한 일정으로 넣었어.', '이제 정말 마지막 생각 하나만 남겨보자.'],
      card: recorded(state, 'schedule'), actions: [next('mind_third', '마지막 생각 남기기')],
    }; break;
    case 'mind_third': scene = {
      chapter: 2, label: '대화가 멈춘 뒤에도', image: media.home,
      narration: 'AI 화면의 대화창이 잠시 조용해졌다. 말솜씨나 친근함과는 별개로 그 안을 생각해 본다.',
      lines: ['앞으로 아주 발전한 AI가 아무와 이야기하지 않을 때도,', '그 안에 어떤 느낌이 이어질 수 있다고 봐?'], detail: 'AI 안에 실제 느낌이 있을지에 대한 생각 · 일을 맡길지나 권리 부여와는 별개',
      decisionId: 'mindEvidence', actions: choice('mindEvidence', 'farewell'),
    }; break;
    case 'farewell': scene = {
      chapter: 2, label: '오늘의 너를 남기며', image: media.home, narration: '지피짱은 마지막 답도 노트에 넣었다. 하루의 선택이 한 권의 일지가 되었다.',
      lines: ['오늘은 이렇게 생각했구나. 네 말 그대로 적었어.', '공항에서부터 꽤 많은 걸 골랐네.', '어떤 하루였는지, 같이 펼쳐볼까?'],
      card: recorded(state, 'mindEvidence'), actions: [next('result', '내가 그리는 미래 보기')],
    }; break;
    case 'result': scene = {
      chapter: 2, label: '네가 그리는 미래', image: media.home,
      narration: '여행에서 고른 답을 네 가지 시선으로 펼쳤다. 다른 답과 유보한 생각도 함께 남긴다.',
      lines: ['이번 여행에서 너는 이런 쪽에 가까웠어.', '정해진 성격이라기보다, 지금 네가 그리는 미래의 모습이야.'], result: true,
      actions: [next('journal', '내 선택과 여행일지'), next('types', '다른 유형도 둘러보기')],
    }; break;
    case 'types': scene = {
      chapter: 2, label: '같은 미래, 다른 여행자', image: media.home,
      narration: '네 가지 시선이 만나는 16가지 기본 조합. 어느 쪽이 더 좋은 답인지는 정해져 있지 않다.',
      lines: ['다른 조합은 어떤 미래를 그릴까?'], types: true, actions: [next('result', '내 결과로 돌아가기')],
    }; break;
    case 'journal': scene = {
      chapter: 2, label: '우리의 여행일지', image: media.home, narration: '공항에서 시작해 전시장과 저녁 산책길까지. 오늘 네가 고른 장면들.',
      lines: ['같은 하루를 보내도, 무엇을 맡기고 무엇을 기대하는지는 다르네.', '다른 답을 골라보고 싶은 장면이 있으면, 거기서 다시 이어갈 수 있어.'],
      journal: true, actions: [next('result', '내 결과로 돌아가기'), next('intro', '새 여행 시작하기')],
    }; break;
    default: throw new Error(`Unknown story scene: ${state.scene}`);
  }
  return { ...base, ...scene };
}

export function createState(continueStory = false) {
  return { version: VERSION, scene: continueStory ? 'recap' : 'intro', answers: {}, tripApproved: false, messageApproved: false, scheduleApproved: false, trail: [] };
}
const snapshot = state => ({ scene: state.scene, answers: { ...state.answers }, tripApproved: state.tripApproved, messageApproved: state.messageApproved, scheduleApproved: state.scheduleApproved });
export function step(state, actionId) {
  if (typeof actionId !== 'string') return state;
  if (actionId === 'reset') return createState();
  if (actionId === 'back') {
    if (!state.trail.length) return state;
    return { version: VERSION, ...state.trail.at(-1), trail: state.trail.slice(0, -1) };
  }
  if (actionId.startsWith('edit:')) {
    if (state.scene !== 'journal') return state;
    const index = decisions.findIndex(d => d.id === actionId.slice(5));
    if (index < 0 || !selected(state, decisions[index].id)) return state;
    const kept = decisions.slice(0, index).map(d => d.id);
    return { version: VERSION, scene: decisions[index].scene, answers: Object.fromEntries(Object.entries(state.answers).filter(([id]) => kept.includes(id))), tripApproved: index > 0 && state.tripApproved, messageApproved: index > decisions.findIndex(d => d.id === 'message') && state.messageApproved, scheduleApproved: index > decisions.findIndex(d => d.id === 'schedule') && state.scheduleApproved, trail: [] };
  }
  const action = getScene(state).actions.find(a => a.id === actionId);
  if (!action) return state;
  if (state.scene === 'journal' && action.next === 'intro') return createState();
  const result = { ...state, answers: { ...state.answers }, scene: action.next, trail: [...state.trail, snapshot(state)] };
  if (action.answer) result.answers[action.answer.id] = action.answer.value;
  if ('tripApproved' in action) result.tripApproved = action.tripApproved;
  if ('messageApproved' in action) result.messageApproved = action.messageApproved;
  if ('scheduleApproved' in action) result.scheduleApproved = action.scheduleApproved;
  return result;
}

export function reservationStatus(state) {
  if (!state.answers.trip) return 'original';
  return state.tripApproved ? 'changed' : 'pending';
}
export function messageStatus(state) {
  if (!state.answers.message) return 'not_prepared';
  return state.messageApproved ? 'sent' : 'pending';
}

export function scheduleStatus(state) {
  if (!state.answers.schedule) return 'not_prepared';
  return state.scheduleApproved ? 'registered' : 'pending';
}
