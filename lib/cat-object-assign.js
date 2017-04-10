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

// Reading prototypes from classes is problematic, so neither of these work
// Object.assign(Cat.prototype, Animal, Hostile);
// Object.assign(Cat.prototype, Animal.prototype, Hostile.prototype);
// Object.assign(Cat.prototype, Object.create(Animal.prototype), Object.create(Hostile.prototype));
Object.assign(
  Cat.prototype,
  Animal.prototype,
  Hostile.prototype,
  Cat.prototype
);
