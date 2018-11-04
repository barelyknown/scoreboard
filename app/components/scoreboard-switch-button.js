import Component from '@ember/component';
import { task } from 'ember-concurrency';

export default Component.extend({
  tagName: '',

  onPushTask: task({
    *perform(toggle) {
      toggle();
    }
  }).drop(),
});
