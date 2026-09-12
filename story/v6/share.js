import {questions,validateAnswers} from './story.js';
export const SHARE_PREFIX='journey6.';
export function encode(answers){if(!validateAnswers(answers,true))throw new TypeError('Complete journey6 required');return '#r='+SHARE_PREFIX+questions.map(q=>q.options.findIndex(o=>o.value===answers[q.id])).join('');}
export function decode(hash){if(typeof hash!=='string'||!/^#r=journey6\.[0-4]{10}$/.test(hash))return null;const digits=hash.slice(12);const answers=Object.fromEntries(questions.map((q,i)=>[q.id,q.options[Number(digits[i])]?.value]));return validateAnswers(answers,true)?answers:null;}
