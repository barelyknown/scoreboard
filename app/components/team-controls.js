import Component from '@ember/component';
import { collect, array, raw } from 'ember-awesome-macros';

export default Component.extend({
  tagName: '',

  scoreAttribute: array.join(collect('team',raw('Score')),raw('')),

  bonusAttribute: array.join(collect('team',raw('Bonus')),raw('')),

  actions: {
    changeValue(attribute, direction, step=1) {
      this.scoreboard.get(direction).call(this.scoreboard, attribute, step);
    },
    toggle(attribute) {
      this.scoreboard.toggle(attribute);
    },
  }
});
