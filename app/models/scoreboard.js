import DS from 'ember-data';
import attr from 'ember-data/attr';
import { get, computed } from '@ember/object';
import { isPresent } from '@ember/utils';
import { notEmpty } from 'ember-awesome-macros';
import { task, timeout } from 'ember-concurrency';
import { run } from '@ember/runloop';

const VALUE_LIMITS = {
  homeScore: {
    min: 0,
    max: 199,
  },
  guestScore: {
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
    this.set('airhornSound', new Audio('/sounds/airhorn.mp3'));
  },

  resetChangeValueSound() {
    this.set('changeValueSound', new Audio('/sounds/button.mp3'));
  },

  homeScore: attr('number', { defaultValue: 0 }),

  homeBonus: attr('boolean', { defaultValue: false }),

  guestScore: attr('number', { defaultValue: 0 }),

  guestBonus: attr('boolean', { defaultValue: false }),

  secondsRemaining: attr('number', { defaultValue: 0 }),

  period: attr('number', { defaultValue: 1 }),

  isClockRunning: computed('clockStartedAt', {
    get() {
      return isPresent(this.clockStartedAt);
    },
    set(_, value) {
      if (value) {
        this.set('clockStartedAt', new Date());
      } else {
        this.set('clockStartedAt', null);
      }
      return value;
    },
  }),

  clockStartedAt: computed('_clockStartedAt', {
    get() {
      return this._clockStartedAt;
    },
    set(_, value) {
      this.set('_clockStartedAt', value);
      if (isPresent(value)) {
        run.next(() => {
          this.updateSecondsRemainingTask.perform();
        })
      }
      return value;
    },
  }),

  updateSecondsRemainingTask: task(function * () {
    let start = this.secondsRemaining;
    while (this.secondsRemaining > 0 && this.isClockRunning) {
      const diff = (new Date() - this.clockStartedAt) / 1000;
      this.set('secondsRemaining', Math.max(0, start - diff));
      if (this.secondsRemaining === 0) {
        this.set('isClockRunning', false);
        this.airhornSound.play();
      }
      yield timeout(50);
    }
  }).drop(),

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
