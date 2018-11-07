import { helper } from '@ember/component/helper';
import leftPad from 'left-pad';

export function toDigitPlace([number, place]) {
  const placeIndex = (place.toString().match(/0/g) || []).length;
  return parseInt(leftPad(number, 3, "0").split('').reverse()[placeIndex]);
}

export default helper(toDigitPlace);
