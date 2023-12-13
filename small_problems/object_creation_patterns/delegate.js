// Write a delegate function that can be used to delegate the behavior of a
// method or function to another object's method. delegate takes a minimum of
// two arguments: (1) the object and (2) name of the method on the object. The
// remaining arguments, if any, are passed — as arguments — to the objects'
// method that it delegates to.

// Note that this is not the same as using bind. bind returns a new function,
// whereas delegate maintains the reference.

// A: return a function that calls arg1[arg2](args.slice(2))

function delegate(obj, method, ...args) {
  return function() {
    obj[method](args);
  };
}

const foo = {
  name: 'test',
  bar(greeting) {
    console.log(`${greeting} ${this.name}`);
  },
};

const baz = {
  qux: delegate(foo, 'bar', 'hello'),
};

baz.qux();   // logs 'hello test';

foo.bar = () => { console.log('changed'); };

baz.qux();          // logs 'changed'

// note the LS solution is:
// return () => context[methodName].apply(context, args);

// But since we are calling the method on an object, and the
// context is not different than that object name, it seems
// that using `call()` or `apply()` is not necessary.
