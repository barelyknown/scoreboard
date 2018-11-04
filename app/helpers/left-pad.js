import { helper } from '@ember/component/helper';
import * as _leftPad from 'left-pad';

export function leftPad([value, count, string]) {
  return _leftPad(value, count, string);
}

export default helper(leftPad);
