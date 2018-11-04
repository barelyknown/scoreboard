import Component from '@ember/component';
import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { isBlank, isPresent } from '@ember/utils';

const PATTERNS = [
  [ // 0
    [1,1,1,1],
    [1,0,0,1],
    [1,0,0,1],
    [1,0,0,1],
    [1,0,0,1],
    [1,0,0,1],
    [1,1,1,1],
  ],
  [ // 1
    [0,0,0,1],
    [0,0,0,1],
    [0,0,0,1],
    [0,0,0,1],
    [0,0,0,1],
    [0,0,0,1],
    [0,0,0,1],
  ],
  [ // 2
    [1,1,1,1],
    [0,0,0,1],
    [0,0,0,1],
    [1,1,1,1],
    [1,0,0,0],
    [1,0,0,0],
    [1,1,1,1],
  ],
  [ // 3
    [1,1,1,1],
    [0,0,0,1],
    [0,0,0,1],
    [1,1,1,1],
    [0,0,0,1],
    [0,0,0,1],
    [1,1,1,1],
  ],
  [ // 4
    [1,0,0,1],
    [1,0,0,1],
    [1,0,0,1],
    [1,1,1,1],
    [0,0,0,1],
    [0,0,0,1],
    [0,0,0,1],
  ],
  [ // 5
    [1,1,1,1],
    [1,0,0,0],
    [1,0,0,0],
    [1,1,1,1],
    [0,0,0,1],
    [0,0,0,1],
    [1,1,1,1],
  ],
  [ // 6
    [1,1,1,1],
    [1,0,0,0],
    [1,0,0,0],
    [1,1,1,1],
    [1,0,0,1],
    [1,0,0,1],
    [1,1,1,1],
  ],
  [ // 7
    [1,1,1,1],
    [0,0,0,1],
    [0,0,0,1],
    [0,0,0,1],
    [0,0,0,1],
    [0,0,0,1],
    [0,0,0,1],
  ],
  [ // 8
    [1,1,1,1],
    [1,0,0,1],
    [1,0,0,1],
    [1,1,1,1],
    [1,0,0,1],
    [1,0,0,1],
    [1,1,1,1],
  ],
  [ // 9
    [1,1,1,1],
    [1,0,0,1],
    [1,0,0,1],
    [1,1,1,1],
    [0,0,0,1],
    [0,0,0,1],
    [1,1,1,1],
  ],
]

export default Component.extend({
  tagName: '',

  showZero: readOnly('number.showZero'),

  color: computed('_color', 'number.color', {
    get() {
      if (isPresent(this._color)) {
        return this._color;
      } else if (isPresent(this.number)) {
        return this.number.color;
      }
    },
    set(_, value) {
      this.set('_color', value);
      return value;
    }
  }),

  isOn: computed('_isOn', 'showZero', 'digit', 'rowIndex', 'colIndex', {
    get() {
      if (isPresent(this._isOn)) {
        return this._isOn;
      } else {
        const { digit, rowIndex, colIndex, showZero } = this;
        if (isBlank(digit) || isBlank(rowIndex) || isBlank(colIndex)) return false;
        if (digit === 0 && !showZero) return false;

        return PATTERNS[digit][rowIndex][colIndex] === 1;
      }
    },
    set(_, value) {
      this.set('_isOn', value);
      return value;
    }
  })
});
