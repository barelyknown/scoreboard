import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.store.createRecord('scoreboard');
  },

  actions: {
    reset() {
      this.refresh();
    }
  }
});
