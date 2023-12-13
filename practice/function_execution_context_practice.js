// The code below is being run in Chrome Snippets
// The results will be different if running in Node.

// (1)
// What will the code below output?
// this will log the window object
// the global object is the implicit execution context for function
// invocation syntax

function foo() {
  return this;
}

let context = foo();
console.log(context);

// (2)
// What will the code in the previous question output in strict mode?

// In strict mode, this will output `undefined`; in strict mode the
// implicit execution context with function invocation syntax is `undefined`

// (3)
// What will the code below output? Explain the difference, if any, between this
// output and that of problem 1.

// Here, the method is being invoked using method invocation syntax and its
// return value is assigned to `context`; note that we are not assigning
// `obj.foo` to `context` but its return value. Tricky!

// Because we are using method invocation syntax, the execution context is the
// calling object `obj`, which when logged is `{foo: f}

let obj = {
  foo() {
    return this;
  },
};

let context = obj.foo();

console.log(context);

// (4)
// What will the code below output?

// 'Hello from the global scope!'
// 'Hello from the function scope!'

// On the first function invocation (deliverMessage), the implicit execution
// context is 'window', and `message` is defined on the `window` object

// On the method invocation, the implicit execution context is the calling
// object, which is `bar`, and `bar` defines its own message property, so
// that message is logged.

var message = 'Hello from the global scope!';

function deliverMessage() {
  console.log(this.message);
}

deliverMessage();

let bar = {
  message: 'Hello from the function scope!',
};

bar.deliverMessage = deliverMessage;

bar.deliverMessage();

// (5)
// What will the code below output? What would happen if we replaced var on line
// 1 with let? Can you explain why the output changes?

// Caught it: look carefully: this.a + b  - not this.a + this.b
// The first function call is with function invocation syntax, which implicitly
// sets 'window' as the execution context. `a` is defined on the global object, so
// within the function it is accessible with `this.a`; `b` has global scope (not
// a property of the global object but defined at the top level); this will log `20`

// The second call uses method invocation syntax, which implicitly sets 'c' as the
// execution context (the calling object). object `c` defines property `a`, which is the
// value returned by `this.a`; again, b is within scope from its top-level definition. this
// will log `0`

// if we replace 'var' with 'let' on the first line, `a` will not be set on the
// global object, so in the first call (`add()`), this will returned `NaN` (`undefined` + 10);
// the method invocation would return `0` since it is not looking for `a` in the global object


var a = 10;
let b = 10;
let c = {
  a: -10,
  b: -10,
};

function add() {
  return this.a + b;
}

c.add = add;

console.log(add());
console.log(c.add());

// (6)
// The problems above all feature implicit function execution context. What
// methods have we learned so far that let us explicitly specify what a
// function's execution context should be?

// We can use method `call()` or `apply()` to explicitly set the execution
// context for a function/method invocation

// (7)
// In the code below, use call to invoke bar.add as a method but with foo as the
// execution context. What will this return?

let foo = {
  a: 1,
  b: 2,
};

let bar = {
   a: 'abc',
   b: 'def',
   add() {
     return this.a + this.b;
   },
};

bar.add.call(foo); // will return 3

// (8)
// Given the code and desired output shown below, should you use call or apply
// to supply explicit context and the arguments to outputList? That is, which
// method makes the most sense to use? Implement a solution using your preferred
// method such that the desired output is logged, and explain your choice.

let fruitsObj = {
  list: ['Apple', 'Banana', 'Grapefruit', 'Pineapple', 'Orange'],
  title: 'A Collection of Fruit',
};

function outputList() {
  console.log(this.title + ':');

  let args = [].slice.call(arguments);

  args.forEach(function(elem) {
    console.log(elem);
  });
}

// invoke outputList here
outputList.call(fruitsObj, ...fruitsObj.list);
// we want to bind outputList to fruitsObj
// this takes care of the access to `this.title`
// `args` wants an array returned, and `arguments` is the array
// containing individual arguments sent to the function. we need to send
// the individual values of the array and should use call with a
// spread operator on the list

// actually, we can do this also--apply will send the elements
// of the array as individual arguments to the function, so `arguments` would
// still access them the same way
outputList.apply(fruitsObj, fruitsObj.list);

// to remember: apply takes an array but sends the elements of the array as
// individual arguments to the function

// Desired output:
// A Collection of Fruit:
// Apple
// Banana
// Grapefruit
// Pineapple
// Orange

// (9)
// For an extra challenge, consider this line of code from the previous problem:

let args = [].slice.call(arguments);

// Inside of JavaScript functions, arguments is an object that holds all of the
// arguments passed to the function. Bearing in mind that the function author
// wants to iterate over the arguments later in the method using an Array
// method, why do you think he or she is invoking call?

// What is happening in this line of code is that `slice` is being called on an
// empty array, but the execution context for `slice()` is what is being changed
// by using call, so it is the equivalent of `arguments.slice`. `arguments` here
// is not representing the arguments to the `slice()` method, but a new calling
// object. This is being done because `forEach()` is an array method, but `arguments`
// is an array-like object that cannot call `forEach()` directly.

// This is a typical pattern we see when treating array-like objects like arrays. The
// array-like object has non-zero integer indexes that correspond to array indexes,
// and also a length property that is expected for an array.

// further
// here, args is already an array, not an array-like object, so
// it is not necessary to use `call()` within the function; however
// we call it the same way because it still expects the individual
// arguments
let fruitsObj = {
  list: ['Apple', 'Banana', 'Grapefruit', 'Pineapple', 'Orange'],
  title: 'A Collection of Fruit',
};

function outputList(...args) {
  console.log(this.title + ':');

  args.forEach(function(elem) {
    console.log(elem);
  });
}

// invoke outputList here
outputList.call(fruitsObj, ...fruitsObj.list);
outputList.apply(fruitsObj, fruitsObj.list);
