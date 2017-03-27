export default (Base) => class Hostile extends Base {
  constructor() {
    super();

    this.className = 'Hostile';
  }

  methodA() {
    return 'Hostile.methodA';
  }

  methodB() {
    return 'Hostile.methodB';
  }
};
