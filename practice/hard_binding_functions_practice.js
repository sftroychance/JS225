// (1)
// What method can we use to permanently bind a function to a particular
// execution context?

// We can use `Function.prototype.bind()`, with the execution context (the
// target object) as the first argument, and then any other arguments to the
// function.

// (2)
// What will the code below log to console?

// This will not log anything to the console. `bind()` does bind `foo()` to
// `obj`, but the result, which will be a new function, is not assigned to
// a variable or called immediately with `foo.bind(obj)();`

let obj = {
  message: 'JavaScript',
};

function foo() {
  console.log(this.message);
}

foo.bind(obj);

// (3)
// What will the code below output?

// This will log '5'. `foo()` is bound to `obj` and returned as `bar()`

let obj = {
  a: 2,
  b: 3,
};

function foo() {
  return this.a + this.b;
}

let bar = foo.bind(obj);

console.log(bar());

// (4)
// What will the code below log to the console?

// This will log 'JavaScript makes sense!'. The function assigned to `bar` is permanently
// bond to `positiveMentality`, and although the function is then assigned to a property
// of `negativeMentality`, it retains its permanent binding to `positiveMentality`

let positiveMentality = {
  message: 'JavaScript makes sense!',
};

let negativeMentality = {
  message: 'JavaScript makes no sense!',
};

function foo() {
  console.log(this.message);
}

let bar = foo.bind(positiveMentality);

negativeMentality.logMessage = bar;
negativeMentality.logMessage();

// (5)
// What will the code below output?

// this will log 'Amazebulous!'. `bar` is assigned the `foo` bound to `obj`, and
// that binding is permanent. even trying to assign a different context with `call()`
// will not change that binding

let obj = {
  a: 'Amazebulous!',
};
let otherObj = {
  a: "That's not a real word!",
};

function foo() {
  console.log(this.a);
}

let bar = foo.bind(obj);

bar.call(otherObj);

console.log({...bar})

