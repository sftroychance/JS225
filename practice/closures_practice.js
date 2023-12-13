// (1)
// Create a makeCounterLogger function that takes a number as an argument and
// returns a function. When we invoke the returned function with a second
// number, it should count up or down from the first number to the second
// number, logging each number to the console:

function makeCounterLogger(startValue) {
  return function(endValue) {
    let range;

    if (endValue > startValue) {
      range = Array.from({length: endValue - startValue + 1},
        (_, idx) => idx + startValue);
    } else {
      range = Array.from({length: startValue - endValue + 1},
        (_, idx) => startValue - idx);
    }

    range.forEach(num => console.log(num));
  }
}

let countlog = makeCounterLogger(5);
countlog(8);
countlog(2);

// (2)
// We'll build a simple todo list program using the techniques we've seen in
// this assignment. Write a makeList function that returns a new function
// that implements a todo list. The returned function should have the
// following behavior:

// When called with an argument that is not already on the list, it adds that
// argument to the list.

// When called with an argument that is already on the list, it removes the
// element from the list.

// When called without arguments, it logs all items on the list. If the list
// is empty, it logs an appropriate message.

function makeList() {
  const todos = [];

  return function(item) {
    if (!item) {
      if (todos.length === 0) console.log('The list is empty');
      todos.forEach(todo => console.log(todo));
    } else if (todos.includes(item)) {
      todos.splice(todos.indexOf(item), 1);
      console.log(`${item} removed!`);
    } else {
      todos.push(item);
      console.log(`${item} added!`);
    }
  };
}

let list = makeList();
list();
// The list is empty.
list('make breakfast');
// make breakfast added!
list('read book');
// read book added!
list();
// make breakfast
// read book
list('make breakfast');
// make breakfast removed!
list();
// read book

// Second set
// (1)
// Write a function named makeMultipleLister that, when invoked and passed a
// number, returns a function that logs every positive integer multiple of that
// number less than 100.

function makeMultipleLister(multiplier) {
  return function() {
    Array.from({length: 98}, (_, idx) => idx + 1)
      .filter(num => num % multiplier === 0)
      .forEach(num => console.log(num));
  }
}
let lister = makeMultipleLister(13);
lister();
lister = makeMultipleLister(10);
lister();

// (2)
// Write a program that uses two functions, add and subtract, to manipulate a
// running total value. When you invoke either function with a number, it should
// add or subtract that number from the running total and log the new total to
// the console.
function makeAdd() {
  let current = 0;

  return function(val) {
    current += val;
    console.log(current);
  }
}

const add = makeAdd();
const subtract = function(val) {
  add(-val);
};

add(1); // 1
add(42); // 43
subtract(39); // 4
add(6); // 10

// (3)
// Below, how can you set the value of systemStatus to the value of the inner
// variable status without changing startup in any way?

// We cannot do this! There is no way to access a function-scoped variable
// outside the function (unless it is somehow returned by the function,
// by return statement or mutation).

function startup() {
  let status = 'ready';
  return function() {
    console.log('The system is ready.');
  };
}

let ready = startup();
let systemStatus = // ?

// Lesson Walkthrough
// We can improve the interface of makelist (above) by returning an Object from
// makeList instead of a single Function.

// (1)
// Reimplement makeList, so that it returns an Object that provides the
// interface shown below, including add, list, and remove methods.

function makeList() {
  let list = [];

  return {
    add(newItem) {
      list.push(newItem);
      console.log(`${newItem} added!`);
    },

    remove(item) {
      let idx = list.indexOf(item);

      if (idx !== -1) {
        list.splice(idx, 1);
        console.log(`${item} removed!`);
      }
    },

    list() {
      if (list.length === 0) {
        console.log('The list is empty.');
      } else {
        list.forEach(item => console.log(item));
      }
    }
  };
}

list = makeList();
list.add('peas');
// peas added!
list.list();
// peas
list.add('corn');
// corn added!
list.list();
// peas
// corn
list.remove('peas');
// peas removed!
list.list();
// corn
