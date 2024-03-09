import Robot from "./Robot.js";

export default class FlyingRobot extends Robot {
  constructor(name, legs) {
    super(name, legs);
    this.canFly = true;
    super.sayHi();
  }
  sayHi() {
    console.log(`Hello! My name is ${this.robotName} and I am a flying robot`);
  }
  takeOff() {
    console.log(`Have a good flight ${this.robotName}`);
  }
  land() {
    console.log(`Welcome back ${this.robotName}`);
  }
}
