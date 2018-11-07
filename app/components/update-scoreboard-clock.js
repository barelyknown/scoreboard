import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';

export default Component.extend({
  tagName: '',

  init() {
    this._super(...arguments);
    this.updateScoreboardClockTask.perform();
  },

  updateScoreboardClockTask: task(function * () {
    const { scoreboard } = this;
    const start = scoreboard.secondsRemaining;
    while (scoreboard.isClockRunning) {
      const { clockStartedAt, hornSound } = scoreboard;
      const diff = (new Date() - clockStartedAt) / 1000;
      scoreboard.set('secondsRemaining', Math.max(0, start - diff));
      if (scoreboard.secondsRemaining === 0) {
        scoreboard.set('isClockRunning', false);
        hornSound.play();
      }
      yield timeout(50);
    }
  }).drop(),
});
