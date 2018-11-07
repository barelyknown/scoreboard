import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';
import { readOnly } from '@ember/object/computed';
import { gte, not, conditional } from 'ember-awesome-macros';

export default Component.extend({
  tagName: '',

  slowStep: 1,

  fastStep: 1,

  fastThreshhold: 5,

  slowWaitMs: 500,

  fastWaitMs: 50,

  onPushTask: task({
    count: 0,

    slowStep: readOnly('component.slowStep'),

    fastStep: readOnly('component.fastStep'),

    fastThreshhold: readOnly('component.fastThreshhold'),

    slowWaitMs: readOnly('component.slowWaitMs'),

    fastWaitMs: readOnly('component.fastWaitMs'),

    waitMs: conditional('isSlow', 'slowWaitMs', 'fastWaitMs'),

    isFast: gte('count', 'fastThreshhold'),

    isSlow: not('isFast'),

    step: conditional('isSlow', 'slowStep', 'fastStep'),

    changeValue: readOnly('component.changeValue'),

    *perform(component) {
      this.set('component', component);
      while (true) {
        this.changeValue(this.step);
        this.incrementProperty('count');
        yield timeout(this.waitMs);
      }
    }
  }).drop(),

  onReleaseTask: task(function * () {
    this.onPushTask.cancelAll();
  }),
});
