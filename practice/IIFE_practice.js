// (1)
// Will the code below execute?

// nothing will be executed. An IIFE must be implemented as a function
// expression, and this is a function declaration.
// this actually returns an error, because it appears to be a function
// declaration, but the function is not given a name.

// The lesson indicates the error should be 'unexpected token ('

function() {
  console.log("Sometimes, syntax isn't intuitive!")
}();

// (2)
// Edit the code from problem one so it executes without error.

(function() {
  console.log("Sometimes, syntax isn't intuitive!")
})();

// (3)
// The code below throws an error. What kind of problem does this error
// highlight? Use an IIFE to address it, so that code runs without error.

// It appears that the error results from hoisting combined with having
// a variable and function with the same name. the function declaration for
// `sum` is hoisted, but then a `var` with the same name is declared and
// initialized. Predicting that the error will be that `sum` is not a
// function - Indeed, that is the case.

var sum = 0;
var numbers;

sum += 10;
sum += 31;

numbers = [1, 7, -3, 3];

sum += (function sum(arr) {
  return arr.reduce(function(sum, number) {
    sum += number;
    return sum;
  }, 0);
})(numbers);

console.log(sum); // 49

// original code
// function sum(arr) {
//   return arr.reduce(function(sum, number) {
//     sum += number;
//     return sum;
//   }, 0);
// }
//
// sum += sum(numbers);  // ?

// (4)
// Implement a function countdown that uses an IIFE to generate the desired
// output.

// countdown(7);
// 7
// 6
// 5
// 4
// 3
// 2
// 1
// 0
// Done!

// Process: assign result of IIFE to variable `countdown`
// not a good solution: uses IIFE to create the function, not to generate the output

let countdown = (function() {
  return function(startValue) {
    let range = Array.from({length: startValue + 1},
      (_, idx) => startValue - idx);

    range.forEach(val => console.log(val));
    console.log('Done!');
  }
})();

// Alternatively:
// Lesson solution: function declaration for `countdown`; when the
// function is invoked, the internal function expression executes as
// an IIFE

function countdown(start) {
  (function(startValue) {
    let range = Array.from({length: startValue + 1},
      (_, idx) => startValue - idx);

    range.forEach(val => console.log(val));
    console.log('Done!');
  })(start);
}

countdown(7);

function countdown(start) {
  for (let i = start; i >= 0; i -= 1) {
    console.log(i);
  }

  console.log('Done!');
}

// (5)
// Is the named function in this IIFE accessible in the global scope?

// No. The function expression is executed just once and is not saved
// to any variable
// This shows that the function in the IIFE can be named, but it can't
// be invoked on that name.

(function foo() {
  console.log('Bar');
})();

foo() // ?

// (6)
// For an extra challenge, refactor the solution to problem 4 using recursion,
// bearing in mind that a named function created in an IIFE can be referenced
// inside of the IIFE.

function countdown(count) {
  (function countItDown(n) {
    console.log(n);

    if (n === 0) {
      console.log('Done!');
    } else {
      countItDown(n - 1);
    }
  })(count);
}
