// Our earlier implementation of the Function.prototype.bind was simplistic.
// Function.prototype.bind has another trick up its sleeve besides hard-binding
// functions to context objects. It's called partial function application. Read
// this assignment and the MDN documentation to learn more about partial
// function application.

// Alter the myBind function written in the previous exercise to support partial
// function application of additional arguments to the original function.

function myBind(func, context, ...initialArgs) {
  return function(...args) {
    return func.apply(context, [...initialArgs, ...args]);
  };
}

const foo = {
  count: 1,
  bar(a, b, c) {
    console.log(this.count + a + b + c);
  },
};

const bindFoo = myBind(foo.bar, foo, 1, 2);
bindFoo(3); // 7

baz = foo.bar;
baz(1, 2, 3); // 'NaN'
const bindBaz = myBind(baz, foo, 1, 2);
bindBaz(4); // 8

// demo with regular function (null context)
function add(a, b) {
  console.log(a + b);
}

const add7 = myBind(add, null, 7);
add7(5); // 12
