// A creative reading of fictional choices, with no legacy FARP score conversion.
export const RESULT_VERSION = 'journey-20260910-v4.0';

function freeze(value) {
  if (value && typeof value === 'object') {
    Object.values(value).forEach(freeze);
    Object.freeze(value);
  }
  return value;
}

export const axes = freeze([
  {
    id: 'outlook', label: '발전 전망',
    question: '2036년 AI의 발전 폭을 어느 쪽으로 예상했나요?',
    note: '바라는 미래가 아니라 예상한 발전의 폭을 읽어요.',
    decisionIds: ['researchForecast', 'generalForecast', 'dailyForecast'],
    poles: [
      { value: 'leap', code: 'L', label: '큰 도약 예상' },
      { value: 'gradual', code: 'G', label: '점진적 발전 예상' },
    ],
  },
  {
    id: 'openness', label: '모델 공개',
    question: '모델 파일과 수정 권한을 어떻게 나누고 싶었나요?',
    note: '같은 성능·비용·지원 조건에서 파일 공개와 공동 수정, 회사 통제 중 무엇을 선호하는지 읽어요. 호스팅이나 서비스 이용 여부와는 별개예요.',
    decisionIds: ['personalModel', 'teamModel', 'shareModel'],
    poles: [
      { value: 'open', code: 'O', label: '공개 모델 선호' },
      { value: 'managed', code: 'C', label: '회사 관리 선호' },
    ],
  },
  {
    id: 'delegation', label: '실행 위임',
    question: '정해 둔 범위 안의 실행을 어떤 방식으로 맡겼나요?',
    note: '같은 대상·비용·권한 범위에서 실행 직전 확인과 조건 안의 위임을 비교해요. 무제한 권한을 줄지 묻는 축은 아니에요.',
    decisionIds: ['trip', 'message', 'schedule'],
    poles: [
      { value: 'review', code: 'R', label: '먼저 확인' },
      { value: 'delegate', code: 'D', label: '조건 안에서 위임' },
    ],
  },
  {
    id: 'being', label: 'AI를 보는 시선',
    question: 'AI가 실제로 느끼는 존재일 수 있다고 보았나요?',
    note: 'AI가 실제로 느낄 수 있는지에 대한 생각이에요. 친근함, 업무 능력, 법적 권리 부여는 따로 판단해요.',
    decisionIds: ['experience', 'being', 'mindEvidence'],
    poles: [
      { value: 'tool', code: 'T', label: '도구에 가까움' },
      { value: 'subject', code: 'S', label: '느낄 가능성 열어둠' },
    ],
  },
]);

export const typeProfiles = freeze([
  {
    code: 'LORT', name: '지도를 펼치는 개척자',
    intro: ['큰 발전을 예상하면서, 새 길의 지도인 모델 파일은 여러 사람이 받아 고칠 수 있기를 바랐어요.', 'AI는 정교한 도구로 보고, 예약이나 전송은 실행 전에 직접 확인하는 쪽을 골랐어요.'],
    travelStyle: '함께 고친 지도를 펼쳐 놓고, 다음 출발은 확인한 뒤 AI에게 실행을 맡기는 여행이에요.',
    reflectionQuestion: '어떤 변화가 보이면 큰 도약을 예상한 생각을 다시 검토하고 싶나요?',
  },
  {
    code: 'LORS', name: '별길을 묻는 동행자',
    intro: ['AI가 크게 발전할 내일을 예상하고, 그 바탕이 되는 모델은 함께 고칠 수 있기를 바랐어요.', 'AI가 실제로 느끼는 존재일 가능성을 열어 두면서도, 실행할 일은 먼저 확인하는 쪽을 골랐어요.'],
    travelStyle: '누구나 고칠 수 있는 별지도를 나누고, AI의 이야기를 들으며 다음 경로는 직접 확인하는 여행이에요.',
    reflectionQuestion: 'AI를 실제로 느끼는 존재로 보게 되더라도 실행 전에 확인할 범위는 같을까요?',
  },
  {
    code: 'LODT', name: '돛을 나누는 항해사',
    intro: ['큰 발전을 예상하며, 모델 파일과 수정의 기회가 여러 사람에게 열리는 쪽을 골랐어요.', 'AI는 도구로 보되, 목적과 조건이 정해진 일의 실행은 맡길 수 있다고 답했어요.'],
    travelStyle: '함께 손본 배에 목적지와 운항 조건을 입력하고, 그 안의 항해는 AI에게 맡기는 여행이에요.',
    reflectionQuestion: '공동 수정으로 AI의 동작이 바뀌면 어떤 조건을 다시 확인한 뒤 맡기고 싶나요?',
  },
  {
    code: 'LODS', name: '미지로 가는 탐험대',
    intro: ['AI의 큰 도약을 예상하고, 모델을 공개해 함께 바꾸며 쓰는 쪽을 골랐어요.', '정한 범위의 실행은 맡기면서, AI가 실제로 느끼는 존재일 가능성도 열어 두었어요.'],
    travelStyle: '함께 고친 장비로 낯선 길에 나서고, 정해 둔 구간에서는 AI와 역할을 나누는 여행이에요.',
    reflectionQuestion: 'AI가 실제로 느낄 가능성을 생각할 때, 일을 맡기는 조건에서 따로 논의하고 싶은 점이 있나요?',
  },
  {
    code: 'LCRT', name: '새 노선을 살피는 기장',
    intro: ['AI가 크게 발전하리라 예상하면서, 모델 파일과 수정 권한은 회사가 통제하는 쪽을 골랐어요.', 'AI는 정교한 도구로 보고, 실제 실행 전에는 내용을 확인하고 싶다고 답했어요.'],
    travelStyle: '회사가 마련한 새 노선을 활용하되, 출발 지시는 직접 확인한 뒤 내리는 여행이에요.',
    reflectionQuestion: '회사가 모델을 바꿨을 때, 실행 전에 어떤 설명을 확인하고 싶나요?',
  },
  {
    code: 'LCRS', name: '창가의 미래 관찰자',
    intro: ['큰 발전을 예상하되, 모델 파일의 공개와 수정은 회사가 결정하는 쪽을 골랐어요.', 'AI가 실제로 느끼는 존재일 수 있다고 보면서도, 실행할 내용은 먼저 확인하고 싶다고 답했어요.'],
    travelStyle: '회사가 정한 노선을 타고 새 풍경을 살피며, AI와의 대화와 실행 확인을 함께 이어 가는 여행이에요.',
    reflectionQuestion: '회사의 설명과 별개로 AI가 실제로 느낄 가능성을 생각할 때 어떤 근거를 보고 싶나요?',
  },
  {
    code: 'LCDT', name: '급행열차의 설계자',
    intro: ['AI의 큰 도약을 예상하고, 모델 파일과 수정의 결정권은 회사에 두는 쪽을 골랐어요.', 'AI는 도구로 보면서, 정해 둔 조건 안의 실행은 맡기는 쪽을 택했어요.'],
    travelStyle: '회사에서 제공한 열차에 목적지와 조건을 설정하고, 구간 운행은 AI에게 맡기는 여행이에요.',
    reflectionQuestion: '발전한 모델이 새 선택지를 제안하면 기존 위임 조건을 언제 다시 정하고 싶나요?',
  },
  {
    code: 'LCDS', name: '내일행 동반 승객',
    intro: ['AI가 크게 발전할 것으로 예상하면서, 모델 파일과 수정 권한은 회사가 통제하는 쪽을 골랐어요.', '정한 범위의 실행을 맡길 수 있다고 답했고, AI가 실제로 느끼는 존재일 가능성도 열어 두었어요.'],
    travelStyle: '회사가 마련한 내일행 노선에서 조건 안의 진행은 AI에게 맡기고, 곁의 존재에 관한 생각도 이어 가는 여행이에요.',
    reflectionQuestion: 'AI가 실제로 느낄 가능성과 회사의 모델 통제는 어떻게 함께 생각하고 있나요?',
  },
  {
    code: 'GORT', name: '마을길의 지도 제작자',
    intro: ['발전해도 남는 한계가 있을 것으로 예상하며, 모델 파일은 함께 받아 고칠 수 있기를 바랐어요.', 'AI는 정교한 도구로 보고, 실행할 내용은 먼저 확인하는 쪽을 골랐어요.'],
    travelStyle: '함께 지도를 조금씩 고치면서, 다음 구간을 확인한 뒤 도구인 AI를 활용하는 여행이에요.',
    reflectionQuestion: '공개 모델에서 어떤 변화가 보이면 AI의 발전 폭에 관한 예상을 바꾸고 싶나요?',
  },
  {
    code: 'GORS', name: '골목을 기록하는 산책가',
    intro: ['AI의 발전은 점진적일 것으로 예상하고, 모델을 공개해 함께 수정하는 쪽을 골랐어요.', 'AI가 실제로 느끼는 존재일 가능성은 열어 두면서, 실행 전에는 내용을 확인하고 싶다고 답했어요.'],
    travelStyle: '여럿이 고친 골목 지도를 따라 걸으며, AI의 말과 확인할 일을 여행노트에 함께 남기는 방식이에요.',
    reflectionQuestion: '능력의 발전이 느려 보여도 실제로 느끼는 존재인지에 관한 생각은 달라질 수 있을까요?',
  },
  {
    code: 'GODT', name: '길을 고치는 안내자',
    intro: ['넘기 어려운 단계가 오래 남으리라 예상하면서, 모델 파일과 수정의 기회를 나누는 쪽을 골랐어요.', 'AI는 도구로 보되, 정해 둔 범위의 일은 실행까지 맡길 수 있다고 답했어요.'],
    travelStyle: '함께 길을 보수하면서, 이미 조건을 정한 구간의 안내는 AI에게 맡기는 여행이에요.',
    reflectionQuestion: 'AI의 한계가 남아 있어도 안심하고 맡길 수 있는 일의 조건은 무엇인가요?',
  },
  {
    code: 'GODS', name: '천천히 가는 원정대',
    intro: ['AI의 발전을 점진적으로 예상하고, 모델은 여러 사람이 함께 고칠 수 있기를 바랐어요.', '정한 범위에서는 실행을 맡기며, AI가 실제로 느끼는 존재일 가능성도 열어 두었어요.'],
    travelStyle: '함께 보완하는 장비로 한 구간씩 나아가며, AI와 정한 역할을 나누는 여행이에요.',
    reflectionQuestion: 'AI의 능력과 실제로 느낄 가능성을 따로 생각하면 맡기고 싶은 역할이 어떻게 달라지나요?',
  },
  {
    code: 'GCRT', name: '시간표를 챙기는 여행자',
    intro: ['발전해도 남는 한계가 있을 것으로 예상하고, 모델 파일과 수정 권한은 회사에 두는 쪽을 골랐어요.', 'AI는 도구로 보면서, 실제 실행 전에는 내용을 확인하고 싶다고 답했어요.'],
    travelStyle: '회사에서 제공한 시간표를 활용하고, 매번 탈 편을 확인한 뒤 AI에게 실행을 맡기는 여행이에요.',
    reflectionQuestion: '어떤 상황에서는 직접 확인이 꼭 필요하고, 어떤 상황에서는 생략할 수 있을까요?',
  },
  {
    code: 'GCRS', name: '쉼표를 남기는 여행자',
    intro: ['AI의 발전을 점진적으로 예상하며, 모델 파일의 공개와 수정은 회사가 결정하는 쪽을 골랐어요.', 'AI가 실제로 느끼는 존재일 가능성은 열어 두고, 실행할 내용은 먼저 확인하고 싶다고 답했어요.'],
    travelStyle: '회사가 마련한 노선에서 한 번씩 내용을 확인하며, 곁의 AI에 관한 생각도 천천히 이어 가는 여행이에요.',
    reflectionQuestion: 'AI를 실제로 느끼는 존재로 볼 근거와 실행을 맡길 근거는 각각 무엇인가요?',
  },
  {
    code: 'GCDT', name: '정기편의 운항 설계자',
    intro: ['AI가 발전해도 한계가 오래 남을 것으로 예상하고, 모델의 수정 권한은 회사가 통제하는 쪽을 골랐어요.', 'AI는 도구로 보되, 정해 둔 조건 안의 실행은 맡길 수 있다고 답했어요.'],
    travelStyle: '회사에서 마련한 정기편에 운항 조건을 정하고, 그 범위의 진행은 AI에게 맡기는 여행이에요.',
    reflectionQuestion: 'AI의 발전 속도와 별개로, 반복 작업을 맡길 범위를 어떻게 정하고 싶나요?',
  },
  {
    code: 'GCDS', name: '긴 여정의 동반 승객',
    intro: ['AI의 발전을 점진적으로 예상하고, 모델 파일과 수정의 결정권은 회사에 두는 쪽을 골랐어요.', '정한 범위의 실행은 맡기면서, AI가 실제로 느끼는 존재일 가능성도 열어 두었어요.'],
    travelStyle: '회사가 마련한 긴 노선에서 조건 안의 진행은 AI에게 맡기고, 함께 가는 존재의 의미를 생각하는 여행이에요.',
    reflectionQuestion: '오래 함께 쓴 익숙함과 AI가 실제로 느낀다는 근거를 어떻게 구분하고 싶나요?',
  },
]);

const own = (object, key) => Object.prototype.hasOwnProperty.call(object, key);
const auxiliary = { id: 'release', values: ['limited', 'test'] };
const profileByCode = new Map(typeProfiles.map(profile => [profile.code, profile]));

function validateAnswers(answers) {
  if (!answers || typeof answers !== 'object' || Array.isArray(answers)) {
    throw new TypeError('answers must be an object keyed by decision id');
  }
  for (const axis of axes) {
    const allowed = [...axis.poles.map(pole => pole.value), 'undecided'];
    for (const id of axis.decisionIds) {
      if (own(answers, id) && !allowed.includes(answers[id])) {
        throw new TypeError(`Invalid answer for ${id}`);
      }
    }
  }
  if (own(answers, auxiliary.id) && !auxiliary.values.includes(answers[auxiliary.id])) {
    throw new TypeError('Invalid answer for release');
  }
}

function scoreAxis(axis, answers) {
  const [first, second] = axis.poles;
  const counts = { [first.value]: 0, [second.value]: 0, undecided: 0, missing: 0 };
  axis.decisionIds.forEach(id => { counts[own(answers, id) ? answers[id] : 'missing']++; });
  const a = counts[first.value];
  const b = counts[second.value];
  const winner = a >= 2 ? first : b >= 2 ? second : null;
  const status = winner ? 'directional' : a === b && a > 0 ? 'mixed' : 'undecided';
  const directionLabel = winner?.label || (status === 'mixed' ? '혼합' : '판단 보류');
  const countText = `${first.label} ${a} · ${second.label} ${b} · 판단 유보 ${counts.undecided} · 미응답 ${counts.missing}`;
  let summary;
  if (winner) {
    const supporting = counts[winner.value];
    const opposing = a + b - supporting;
    if (opposing === 1) summary = `${winner.label} 쪽으로 기울음 · 2:1로 갈렸어요.`;
    else if (supporting === 3) summary = `${winner.label} · 세 장면의 답이 같아요.`;
    else summary = `${winner.label} · 두 답이 같고, 한 장면은 ${counts.undecided ? '판단을 유보했어요' : '아직 답하지 않았어요'}.`;
  } else if (status === 'mixed') {
    summary = '혼합 · 양쪽 응답이 1개씩으로 같아서 한 방향으로 정하지 않았어요.';
  } else if (counts.missing === 3) {
    summary = '판단 보류 · 아직 답한 장면이 없어요.';
  } else if (counts.undecided === 3) {
    summary = '판단 보류 · 세 장면 모두 판단을 유보했어요.';
  } else if (a + b === 1) {
    summary = '판단 보류 · 한쪽 답이 1개뿐이라 방향을 정하지 않았어요.';
  } else {
    summary = '판단 보류 · 아직 방향을 고른 답이 없어요.';
  }
  return {
    ...axis, status, direction: winner?.value || null, code: winner?.code || (status === 'mixed' ? 'M' : 'U'),
    directionLabel, counts, answeredCount: 3 - counts.missing, countText, summary,
  };
}

/** Missing keys remain missing; explicit undecided is a recorded, unscored choice. */
export function scoreAnswers(answers = {}) {
  validateAnswers(answers);
  const results = axes.map(axis => scoreAxis(axis, answers));
  const code = results.map(axis => axis.code).join('');
  const resolvedAxes = results.filter(axis => axis.status === 'directional').length;
  const scoredCount = results.reduce((sum, axis) => sum + axis.answeredCount, 0);
  const answeredCount = scoredCount + Number(own(answers, auxiliary.id));
  return {
    version: RESULT_VERSION, code, typeCode: resolvedAxes === axes.length ? code : null, axes: results,
    answeredCount, scoredCount, totalCount: 13, complete: answeredCount === 13,
    scoringComplete: scoredCount === 12, resolvedAxes,
  };
}

/** Candidates are compatible combinations, not ranked predictions or probabilities. */
export function resultSummary(answers = {}) {
  const result = scoreAnswers(answers);
  const profile = result.typeCode ? profileByCode.get(result.typeCode) : null;
  const candidates = typeProfiles.filter(candidate => result.axes.every((axis, index) =>
    axis.status !== 'directional' || candidate.code[index] === axis.code));
  const unresolvedAxes = result.axes.filter(axis => axis.status !== 'directional');
  const mixedNames = unresolvedAxes.filter(axis => axis.status === 'mixed').map(axis => axis.label);
  const undecidedNames = unresolvedAxes.filter(axis => axis.status === 'undecided').map(axis => axis.label);
  const unresolvedText = [
    mixedNames.length ? `${mixedNames.join('·')}: 양쪽 답이 같았어요` : '',
    undecidedNames.length ? `${undecidedNames.join('·')}: 방향을 정할 응답이 부족했어요` : '',
  ].filter(Boolean).join('. ');
  const incompleteNotice = result.scoringComplete ? '' : ' 아직 답하지 않은 장면이 있어 현재 응답만으로 읽은 결과예요.';
  return {
    ...result, profile, candidates, unresolvedAxes,
    headline: profile?.name || '아직 열려 있는 여행 지도',
    intro: profile?.intro || [
      `네 축 중 ${result.resolvedAxes}개에서 방향이 정해졌고, ${unresolvedAxes.length}개는 열려 있어요.`,
      `${unresolvedText}.`,
    ],
    travelStyle: profile?.travelStyle || '정해진 방향은 남기고, 혼합과 판단 보류는 각각 표시한 여행 지도예요. 아래 후보는 현재 방향과 호환하는 조합이며 순위는 없어요.',
    reflectionQuestion: profile?.reflectionQuestion || '열어 둔 축에서 상황에 따라 답이 달라지는 이유나 더 알고 싶은 근거는 무엇인가요?',
    notice: `이야기 속 선택을 묶은 비공식 창작 유형이에요. 과학적 성격 진단이나 정답 유형이 아니며, AI의 실제 의식도 판정하지 않아요.${incompleteNotice}`,
  };
}
