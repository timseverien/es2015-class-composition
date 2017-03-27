import Base from './base/base';
import Animal from './base/animal-mixin';
import Hostile from './base/hostile-mixin';

export default class Cat extends Hostile(Animal(Base)) {
  constructor() {
    super();

    this.className = 'Cat';
  }

  methodA() {
    return 'Cat.methodA';
  }

  methodC() {
    return 'Cat.methodC';
  }
}
