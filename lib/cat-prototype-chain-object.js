import Animal from './base/animal-object';
import Hostile from './base/hostile-object';

export default class Cat {
  constructor() {
    this.className = 'Cat';
  }

  methodA() {
    return 'Cat.methodA';
  }

  methodC() {
    return 'Cat.methodC';
  }
}

Object.setPrototypeOf(Cat, Object.assign({}, Animal, Hostile));
