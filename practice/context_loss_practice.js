// (1)
// Our desired output for the code below is: Christopher Turk is a Surgeon. What
// will the code output, and what explains the difference, if any, between the
// actual and desired outputs?

// The actual result is 'undefined undefined is a undefined.'
// the function definition is sent as an argument to 'logReturnVal()'
// within that method, the function is invoked using function invocation syntax
// so the implicit context is 'globalThis' or 'undefined'

let turk = {
  firstName: 'Christopher',
  lastName: 'Turk',
  occupation: 'Surgeon',
  getDescription() {
    return this.firstName + ' ' + this.lastName + ' is a ' + this.occupation + '.';
  }
};

function logReturnVal(func) {
  let returnVal = func();
  console.log(returnVal);
}

logReturnVal(turk.getDescription);

// (2)
// Alter logReturnVal such that it takes an additional context argument, and use
// one of the methods we've learned in this lesson to invoke func inside of
// logReturnVal with context as its function execution context. Alter the
// invocation of logReturnVal and supply turk as the context argument.

// note we can also use `apply()` - they are interchangeable when there are
// no arguments

function logReturnVal(func, context) {
  let returnVal = func.call(context);
  console.log(returnVal);
}

logReturnVal(turk.getDescription, turk);

// (3)
// Suppose that we want to extract getDescription from turk, but always have it
// execute with turk as context. Use one of the methods we've learned in the
// last lesson to assign such a permanently bound function to a new variable,
// getTurkDescription.

getTurkDescription = turk.getDescription.bind(turk);
console.log(getTurkDescription());

// (4)
// Consider the code below, and our desired output:

let TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames() {
    this.titles.forEach(function(title) {
      console.log(this.seriesTitle + ' ' + title);
    });
  }
};

TESgames.listGames();

// Desired output:
// The Elder Scrolls Arena
// The Elder Scrolls Daggerfall
// The Elder Scrolls Morrowind
// The Elder Scrolls Oblivion
// The Elder Scrolls Skyrim

// Will this code log our desired output? Why or why not?

// No. When the callback function is invoked by 'forEach', the implicit
// context is 'globalThis'. This is an example of context loss by function
// as argument. This will log 'undefined Arena, undefined Daggerfall, etc'

// (5)
// Use an arrow function so that the code logs our desired output.

let TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames() {
    this.titles.forEach(title => {
      console.log(this.seriesTitle + ' ' + title);
    });
  }
};

TESgames.listGames();

// (6)
// Use the let self = this fix to alter TESgames.listGames such that it logs our
// desired output to the console.

let TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames() {
    let self = this;

    this.titles.forEach(function(title) {
      console.log(self.seriesTitle + ' ' + title);
    });
  }
};

TESgames.listGames();

// (7)
// If we don't want to rely on let self = this, forEach provides us with an
// alternative means of supplying execution context to the inner function. Use
// this means to achieve our desired output.

let TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames() {
    this.titles.forEach(function(title) {
      console.log(this.seriesTitle + ' ' + title);
    }, this);
  }
};

TESgames.listGames();

// (8)
// Consider the code below. What will the value of foo.a be after this code has executed?

// This is context loss by internal function. When 'increment()' is invoked within
// 'incrementA()', the implicit context provided will be 'globalThis'. My prediction is
// that we will get an error when we run this because `global.a += 1` is trying
// to reference a property on the global object that does not exist.

// this did NOT cause an error. accessing a non-existent property results in 'undefined'
// so `this.a += 1` will resolve to `NaN`, and then on subsequent invocations it will be `NaN`
// (NaN + NaN === NaN); on the first iteration it will set `globalThis.a` to 'NaN'.

// foo.a will still be 0 after these invocations

let foo = {
  a: 0,
  incrementA() {
    function increment() {
      this.a += 1;
    }

    increment();
  }
};

foo.incrementA();
foo.incrementA();
foo.incrementA();

// (9)
// Use one of the methods we learned in this lesson to invoke increment with
// explicit context such that foo.a is incremented with each invocation of
// incrementA.

let foo = {
  a: 0,
  incrementA() {
    function increment() {
      this.a += 1;
    }

    increment.call(this);
  }
};

foo.incrementA();
foo.incrementA();
foo.incrementA();

// (10)
// We decide that we want each invocation of foo.incrementA to increment foo.a
// by 3, rather than 1, and alter our code accordingly:

let foo = {
  a: 0,
  incrementA() {
    function increment() {
      this.a += 1;
    }

    increment.apply(this);
    increment.apply(this);
    increment.apply(this);
  }
};

// Calling apply three times seems repetitive, though. Use bind to permanently
// set foo as increment's execution context.

let foo = {
  a: 0,
  incrementA() {
    const increment = (function() {
      this.a += 1;
    }).bind(this);

    increment();
    increment();
    increment();
  }
};
