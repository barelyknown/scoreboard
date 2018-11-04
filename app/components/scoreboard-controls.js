import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: '',

  actions: {
    changeValue(attribute, direction, step=1) {
      this.scoreboard.get(direction).call(this.scoreboard, attribute, step);
    },
    toggle(attribute) {
      this.scoreboard.toggle(attribute);
    }
  }
});
