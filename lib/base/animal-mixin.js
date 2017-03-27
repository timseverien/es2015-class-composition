export default (Base) => class Animal extends Base {
  constructor() {
    super();

    this.className = 'Animal';
  }

  methodA() {
    return 'Animal.methodA';
  }

  methodB() {
    return 'Animal.methodB';
  }
};
