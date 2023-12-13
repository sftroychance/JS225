function outer() {
  let x = 3;
  let z = 7;  // will not show up in the closure
  return function inner(y) {
      return x*y
  }
}

let multiplyByThree = outer();
console.dir(multiplyByThree);
