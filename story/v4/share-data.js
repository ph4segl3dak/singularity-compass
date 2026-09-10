import { decisions, createState } from './story-data.js';

// Answer indices are versioned with this exact decision and option ordering.
export const SHARE_PREFIX = '#r=journey4.';
export function encodeJourney(answers) {
  if (!answers || Object.keys(answers).length !== decisions.length) throw new Error('Complete journey required');
  const digits = decisions.map(d => {
    const index = d.options.findIndex(o => o.value === answers[d.id]);
    if (index < 0) throw new Error('Unknown answer');
    return String(index);
  });
  return SHARE_PREFIX + digits.join('');
}
export function decodeJourney(hash) {
  if (typeof hash !== 'string' || !/^#r=journey4\.[012]{13}$/.test(hash)) return null;
  const digits = hash.slice(SHARE_PREFIX.length);
  const state = createState();
  for (const [index, d] of decisions.entries()) {
    const option = d.options[Number(digits[index])];
    if (!option) return null;
    state.answers[d.id] = option.value;
  }
  state.scene = 'result';
  state.tripApproved = state.messageApproved = state.scheduleApproved = true;
  return state;
}
