import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: '',

  minutes: computed('secondsRemaining', function() {
    return Math.floor(Math.ceil(this.secondsRemaining) / 60);
  }),

  seconds: computed('secondsRemaining', function() {
    return Math.ceil(this.secondsRemaining) % 60;
  }),
});
