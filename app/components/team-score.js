import Component from '@ember/component';
import { getBy, collect, array, raw } from 'ember-awesome-macros';

export default Component.extend({
  tagName: '',

  scoreAttribute: array.join(collect('team',raw('Score')),raw('')),

  score: getBy('scoreboard', array.join(collect('team',raw('Score')),raw(''))),

  isBonus: getBy('scoreboard', array.join(collect('team',raw('Bonus')),raw(''))),
});
