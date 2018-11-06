import {
  defineProperty
} from '@ember/object';

import {
  task
} from 'ember-concurrency';

import ComputedProperty from '@ember/object/computed';
const _ComputedProperty = ComputedProperty;

function parseArgs(args) {
  return {
    dependentKeys: args.slice(0, -1),
    generatorFunction: args[args.length - 1],
  };
}

const ComputedTaskProperty = function (...args) {
  const { dependentKeys, generatorFunction } = parseArgs(args);
  return _ComputedProperty.call(this, function(propertyName) {
    const taskName = `${propertyName}Task`;
    const isInitializedKeyName = `isComputedTaskInitialized-${propertyName}`;
    const isInitialized = this.get(isInitializedKeyName);
    const valueKeyName = `${taskName}.lastSuccessful.value`;
    if (!isInitialized) {
      defineProperty(this, taskName, task(generatorFunction).restartable());
      this.addObserver(valueKeyName, () => {
        this.notifyPropertyChange(propertyName);
      });
      this.get(taskName).perform();
      dependentKeys.forEach((dependentKey) => {
        this.addObserver(dependentKey, () => {
          this.get(taskName).perform();
        });
      });
      this.set(isInitializedKeyName, true);
    }

    return this.get(valueKeyName);
  });
}

ComputedTaskProperty.prototype = Object.create(ComputedProperty.prototype);

export default function computedTask(...args) {
  return new ComputedTaskProperty(...args);
}
