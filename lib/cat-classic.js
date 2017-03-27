export function Animal() {
  this.className = 'Animal';
}
Animal.prototype.methodA = function () {
  return 'Animal.methodA';
};
Animal.prototype.methodB = function () {
  return 'Animal.methodB';
};

export function Hostile() {
  this.className = 'Hostile';
}
Hostile.prototype.methodA = function () {
  return 'Hostile.methodA';
};

export function Cat() {
  this.className = 'Cat';
}

Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;

Cat.prototype = Object.create(Hostile.prototype);
Cat.prototype.constructor = Cat;

Cat.prototype.methodA = function () {
  return 'Cat.methodA';
};

Cat.prototype.methodC = function () {
  return 'Cat.methodC';
};
