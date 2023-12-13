// (1)
// What will the code below log to the console?

// 1; `foo` is the prototype, and any properties added to the prototype
// will be reflected in objects sharing that prototype

let foo = {};
let bar = Object.create(foo);

foo.a = 1;

console.log(bar.a);

// (2)
// What will the code below log to the console?
// 2; bar originally inherits the `a` property from foo but then overwrites it
// (shadowing it) with 2

foo = {};
bar = Object.create(foo);

foo.a = 1;
bar.a = 2;
console.log(bar.a);

// (3)
// Given the code below, do we know for certain that on the last line we are
// ultimately referencing a property owned by boo? How can we test that far is
// not delegating to boo?

// we can use `far.hasOwnProperty('myProp'), and/or we can print all property
// names for both objects

const boo = {};
boo.myProp = 1;

const far = Object.create(boo);

// lots of code

far.myProp; // 1
console.log(far.hasOwnProperty('myProp'));
console.log(Object.getOwnPropertyNames(boo));
console.log(Object.getOwnPropertyNames(far));

// Practice problems section
// (1)
// Write a function that returns the object on a given object's prototype chain
// where a property is defined. See the example code below:

function getDefiningObject(object, propKey) {
  if (object.hasOwnProperty(propKey)) {
    return object;
  } else if (Object.getPrototypeOf(object) === Object.prototype) {
    return null;
  } else {
    return getDefiningObject(Object.getPrototypeOf(object), propKey);
  }
}

foo = {
  a: 1,
  b: 2,
};

bar = Object.create(foo);
let baz = Object.create(bar);
const qux = Object.create(baz);

bar.c = 3;
baz.d = 4;

console.log(getDefiningObject(qux, 'c') === bar); // => true
console.log(getDefiningObject(qux, 'd') === baz); // true
console.log(getDefiningObject(qux, 'e')); // => null

// (2)
// Write a function to provide a shallow copy of an object. The object that you
// copy should share the same prototype chain as the original object, and it
// should have the same own properties that return the same values or objects
// when accessed. Use the code below to verify your implementation:

function shallowCopy(object) {
  const newObject = Object.create(object);

  Object.getOwnPropertyNames(object).forEach((prop) => {
    newObject[prop] = object[prop];
  });

  return newObject;
}

foo = {
  a: 1,
  b: 2,
};

bar = Object.create(foo);
bar.c = 3;
bar.say = function() {
  console.log('c is ' + this.c);
};

baz = shallowCopy(bar);
console.log(baz.a); // => 1
baz.say(); // => c is 3
console.log(baz.hasOwnProperty('a')); // false
console.log(baz.hasOwnProperty('b')); // false
console.log(baz.hasOwnProperty('c')); // true

// (3)
// Write a function that extends an object (destination object) with contents
// from multiple objects (source objects).

function extend(destination, ...args) {
  args.forEach((source) => {
    Object.getOwnPropertyNames(source).forEach((prop) => {
      destination[prop] = source[prop];
    });
  });

  return destination;
}

foo = {
  a: 0,
  b: {
    x: 1,
    y: 2,
  },
};

const joe = {
  name: 'Joe',
};

const funcs = {
  sayHello() {
    console.log('Hello, ' + this.name);
  },

  sayGoodBye() {
    console.log('Goodbye, ' + this.name);
  },
};

const object = extend({}, foo, joe, funcs);

console.log(object.b.x); // => 1
object.sayHello(); // => Hello, Joe
