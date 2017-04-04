import Animal from './base/animal';
import Hostile from './base/hostile';

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

Object.setPrototypeOf(Cat, Object.assign({}, Object.getPrototypeOf(Animal), Object.getPrototypeOf(Hostile)));
