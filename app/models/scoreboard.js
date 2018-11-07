import DS from 'ember-data';
import attr from 'ember-data/attr';
import { get, computed } from '@ember/object';
import { isPresent } from '@ember/utils';

const VALUE_LIMITS = {
  homeScore: {
    min: 0,
    max: 199,
  },
  guestsScore: {
    min: 0,
    max: 199,
  },
  secondsRemaining: {
    min: 0,
    max: 100 * 60 - 1,
  },
  period: {
    min: 1,
    max: 4,
  }
};

export default DS.Model.extend({
  init() {
    this._super(...arguments);
    this.resetChangeValueSound();
    this.set('hornSound', new Audio('/sounds/airhorn.mp3'));
  },

  resetChangeValueSound() {
    this.set('changeValueSound', new Audio('/sounds/button.mp3'));
  },

  homeScore: attr('number', { defaultValue: 0 }),

  homeBonus: attr('boolean', { defaultValue: false }),

  guestsScore: attr('number', { defaultValue: 0 }),

  guestsBonus: attr('boolean', { defaultValue: false }),

  secondsRemaining: attr('number', { defaultValue: 0 }),

  clockStartedAt: attr('date'),

  period: attr('number', { defaultValue: 1 }),

  isClockRunning: computed('clockStartedAt', {
    get() {
      return isPresent(this.clockStartedAt);
    },
    set(_, value) {
      if (this.secondsRemaining === 0) return false;

      if (value) {
        this.set('clockStartedAt', new Date());
      } else {
        this.set('clockStartedAt', null);
      }
      return value;
    },
  }),

  changeValue(attribute, newValue) {
    this.set(attribute, newValue);
    this.changeValueSound.play();
    this.resetChangeValueSound();
  },

  increment(attribute, step) {
    const { max, min } = VALUE_LIMITS[attribute];
    const currentValue = get(this, attribute);
    let newValue = Math.ceil(currentValue);
    let remainingStep = step;
    while (remainingStep > 0) {
      if (newValue === max) {
        newValue = min;
      } else {
        newValue += 1;
      }
      remainingStep -= 1;
    }
    this.changeValue(attribute, newValue);
  },

  decrement(attribute, step = 1) {
    const { max, min } = VALUE_LIMITS[attribute];
    const currentValue = get(this, attribute);
    let newValue = Math.ceil(currentValue);
    let remainingStep = step;
    while (remainingStep > 0) {
      if (newValue === min) {
        newValue = max;
      } else {
        newValue -= 1;
      }
      remainingStep -= 1;
    }
    this.changeValue(attribute, newValue);
  },

  toggle(attribute) {
    this.changeValue(attribute, !get(this, attribute));
  }
});
