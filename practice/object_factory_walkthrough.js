// let sedan = {
//   speed: 0,
//   rate: 8,
//   accelerate() {
//     this.speed += this.rate;
//   },
// };
// 
// let coupe = {
//   speed: 0,
//   rate: 12,
//   accelerate() {
//     this.speed += this.rate;
//   },
// };

// We want to create a function that will return the above objects
// to save us all this duplicate code.

function makeCar(rate) {
	return {
		speed: 0,
		rate,
		accelerate() {
			this.speed += this.rate;
		},
	}
} 

let sedan = makeCar(8);
const coupe = makeCar(12);

sedan.accelerate();
coupe.accelerate();

console.log(sedan.speed);
console.log(coupe.speed);

console.log(sedan);
console.log(coupe);

// Use your new definition of makeCar to create a hatchback car whose rate of
// acceleration is 9 mph/s.

const hatchback = makeCar(9);
console.log(hatchback);

// Our application now needs to handle braking to slow down. Extend the code
// from problem 1 to handle specifying a braking rate for each car. Also, add a
// method that tells the car to apply the brakes for one second. It should work
// like this:
//
// let sedan = makeCar(8, 6);
// sedan.accelerate();
// sedan.speed;
// =>8
// sedan.brake();
// sedan.speed;
// =>2
// sedan.brake();
// sedan.speed;
// => 0
//
// note that the speed never goes below 0

function makeCar(accelRate, brakeRate) {
	return {
		speed: 0,
		accelRate,
		brakeRate,
		accelerate() {
			this.speed += this.accelRate;
		},
		brake() {
			this.speed = this.speed > this.brakeRate
				? this.speed - this.brakeRate
				: 0;
		}
	}
}

console.log('---makeCar redefined---');

sedan = makeCar(8, 6);
sedan.accelerate();
console.log(sedan.speed); // 8 

sedan.brake();
console.log(sedan.speed); // 2

sedan.brake();
console.log(sedan.speed); // 0

console.log(sedan);
