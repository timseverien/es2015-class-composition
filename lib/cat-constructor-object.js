import Animal from './base/animal-object';
import Hostile from './base/hostile-object';

export default class Cat {
  constructor() {
    return Object.assign(
      {},
      Animal,
      Hostile,
      {
        className: 'Cat',

        methodA() {
          return 'Cat.methodA';
        },

        methodC() {
          return 'Cat.methodC';
        },
      },
    );
  }
}
