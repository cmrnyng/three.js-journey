export default class Robot {
  constructor(name, legs) {
    this.robotName = name;
    this.legs = legs;
    console.log(`I am ${this.robotName}. Thank you creator`);
  }
  sayHi() {
    console.log(`Hello! My name is ${this.robotName}`);
  }
}
