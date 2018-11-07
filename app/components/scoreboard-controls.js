import Component from '@ember/component';
import { getBy, raw } from 'ember-awesome-macros';

export default Component.extend({
  tagName: '',

  isClockRunning: getBy('scoreboard', raw('isClockRunning')),

  actions: {
    changeValue(attribute, direction, step) {
      this.scoreboard.get(direction).call(this.scoreboard, attribute, step);
    },
    toggle(attribute) {
      this.scoreboard.toggle(attribute);
    },
    soundHorn() {
      this.scoreboard.hornSound.play();
    },
    reset() {
      this.reset();
    }
  }
});
