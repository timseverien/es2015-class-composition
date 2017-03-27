import Animal from './base/animal';
import Hostile from './base/hostile';

export default class Cat {
  constructor() {
    return Object.assign(
      {},
      Object.create(Animal.prototype),
      Object.create(Hostile.prototype),
      Object.create(Cat.prototype),
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
