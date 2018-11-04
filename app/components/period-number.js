import Component from '@ember/component';
import { equal, number } from 'ember-awesome-macros';

export default Component.extend({
  tagName: '',

  isPeriod: equal('scoreboard.period', number('number')),
});
