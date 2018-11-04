import Component from '@ember/component';

export default Component.extend({
  tagName: '',

  actions: {
    onPush() {
      if (this.onPush) {
        this.onPush();
      }
    },
    onRelease() {
      if (this.onRelease) {
        this.onRelease();
      }
    }
  }
});
