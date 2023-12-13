// (1)
//Use partial function application to implement a function, makeSub, that
//returns a function that subtracts 5 from the argument passed to the return
//function.

function subtract(a, b) {
  return a - b;
}

function makeSub() {
  return function(a) {
    return subtract(a, 5);
  }
}

const sub5 = makeSub();

console.log(sub5(10)); // 5
console.log(sub5(20)); // 15

// (2)
//This code is a bit limited however, because we can only subtract by 5.
//Implement the makeSubN function below so that we can supply any value we want
//to be subtracted from a, and get a new function that will always subtract this
//value.

function subtract(a, b) {
  return a - b;
}

function makeSubN(n) {
  return function(a) {
    return subtract(a, n);
  }
}

const sub4 = makeSubN(4);
const sub7 = makeSubN(7);

console.log(sub4(10)); // 6
console.log(sub4(20)); // 16
console.log(sub7(10)); // 3
console.log(sub7(20)); // 13

// (3)
// Although the solution above is more flexible, we now want to be able to
// supply any operation, not just subtraction. Implement makePartialFunc below.

function makePartialFunc(func, b) {
  return function(a) {
    return func(a, b);
  }
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

let multiplyBy5 = makePartialFunc(multiply, 5);
let divideBy2 = makePartialFunc(divide, 2);

console.log(multiplyBy5(100)); // 500
console.log(divideBy2(100)); // 50

// (4)
//In our previous solution, multiplyBy5 retains access to func and b long after
//makePartialFunc has finished execution. What makes this possible?

// These are sent as arguments to `makePartialFunc` and are in scope
// when referenced in the function being returned; access is retained
// because the variales form part of the closure for the returned
// function

// (5)
// Implement makeMathRollCall such that it returns a partially applied rollCall
// function, with the subject as 'Math'.

// partial function application might be more useful if our
// makeMathRollCall were just makeRollCall(subject), and we could
// access the students via the closure on 'subjects'

let subjects = {
  English: ['Bob', 'Tyrone', 'Lizzy'],
  Math: ['Fatima', 'Gary', 'Susan'],
  Biology: ['Jack', 'Sarah', 'Tanya'],
};

function rollCall(subject, students) {
  console.log(subject + ':');
  students.forEach(function(student) {
    console.log(student);
  });
}

function makeMathRollCall() {
  return function(targetStudents) {
    // let subject = Object.entries(subjects)
    //   .filter(([subject, students]) => String(students) === String(targetStudents))
    //   .map(([subject, _]) => subject)[0];

    rollCall('Math', targetStudents);
  }
}

let mathRollCall = makeMathRollCall();
mathRollCall(subjects['Math']);
// => Math:
// => Fatima
// => Gary
// => Susan
