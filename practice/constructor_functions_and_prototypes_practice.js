// (1)
// What does the following code log to the console?

let a = 1;
let foo;
let obj;

function Foo() {
  this.a = 2;
  this.bar = function() {
    console.log(this.a);
  };
  this.bar();
}

foo = new Foo(); // 2

foo.bar(); // 2
Foo(); // 2 -> globalThis.a is set to 2 now

obj = {};
Foo.call(obj); // 2 obj.a is set to 2
obj.bar(); // 2

console.log(this.a); // 2 globalThis.a is still 2

// (2)
// What does the following code log to the console?

// NaN is logged for both. The methods called on RECTANGLE are called
// with RECTANGLE set as the implicit context; width and height
// are not defined for that object, so both values would be `undefined`
// and used in arith expressions, both calls result in NaN

let RECTANGLE = {
  area() {
    return this.width * this.height;
  },
  perimeter() {
    return 2 * (this.width + this.height);
  },
};

function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  this.area = RECTANGLE.area();
  this.perimeter = RECTANGLE.perimeter();
}

let rect1 = new Rectangle(2, 3);
console.log(rect1.area); // NaN
console.log(rect1.perimeter); // NaN

// fix this
// we need to explicitly set the context when calling the RECTANGLE methods
// usingn call (or apply)
function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  this.area = RECTANGLE.area.call(this);
  this.perimeter = RECTANGLE.perimeter.call(this);
}

// (3)
// Write a constructor function Circle, that takes a radius as an argument. You
// should be able to call an area method on the created objects to get the
// circle's area. Test your implementation with the following code:

function Circle(radius) {
  this.radius = radius;
}

Circle.prototype.area = function() {
  return Math.PI * this.radius * this.radius;
};

let c = new Circle(3);
let b = new Circle(4);

console.log(c.area().toFixed(2)); // => 28.27
console.log(b.area().toFixed(2)); // => 50.27

// (4)
// What will the following code log out and why?

// true; the method is appropriately defined on the Ninja prototype
// even after the object is created, the new method is available in the
// object prototype

let ninja;
function Ninja() {
  this.swung = true;
}

ninja = new Ninja();

Ninja.prototype.swingSword = function() {
  return this.swung;
};

console.log(ninja.swingSword());

// (5)
// What will the following code log out and why?

// TypeError - ninja.swingSword is not a function
// the prototype for Ninja has been changed
// however, ninja still points to the original prototype
// it was assigned when it was created

let ninja;
function Ninja() {
  this.swung = true;
}

ninja = new Ninja();

Ninja.prototype = {
  swingSword: function() {
    return this.swung;
  },
};

console.log(Object.getPrototypeOf(ninja));
console.log(Ninja.prototype);
console.log(ninja.swingSword());

// (6)
// Implement the method described in the comments below:

// note: if a method returns `this`, that makes it chainable with
// other methods available to that object.

let ninjaA;
let ninjaB;
function Ninja() {
  this.swung = false;
}

ninjaA = new Ninja();
ninjaB = new Ninja();

Ninja.prototype.swing = function() {
  this.swung = !this.swung;
  return this;
}
// Add a swing method to the Ninja prototype which
// returns the calling object and modifies swung

console.log(ninjaA.swing().swung);      // must log true
console.log(ninjaB.swing().swung);      // must log true

// (7)
// In this problem, we'll ask you to create a new instance of an object, without
// having direct access to the constructor function:

// we can create an object using the same prototype using Object.create

let ninjaA = (function() {
  function Ninja(){};
  return new Ninja();
})();

let ninjaB = Object.create(Object.getPrototypeOf(ninjaA));
// Also: let ninjaB = new ninjaA.constructor;

// my initial solution was `let ninjaB = Object.create(ninjaA)`
// but the idea is that we use the same constructor as ninjaA
// not add ninjaA to the ninjaB prototype chain

console.log(ninjaB.constructor === ninjaA.constructor);    // should log true

// PART 2
// (1)
// Follow the steps below:

// Create an object called shape that has a getType method.

// Define a Triangle constructor function whose prototype is shape. Objects
// created with Triangle should have four own properties: a, b, c (representing
// the sides of a triangle), and type.

// Add a new method to the prototype called getPerimeter.

// Test your implementation with the following code:

// NOTE: constructor is a property of Triangle.prototype
// when we set the prototype to shape, we changed the constructor
// since we want the constructor to be Triangle (by output)
// after we add getPerimeter to the prototype, we must set
// Triangle.prototype.constructor back to Triangle

// note: unable to set the different prototype inside the constructor

const shape = {
  getType() {
    return this.type;
  },
}

function Triangle(a, b, c) {
  this.a = a;
  this.b = b;
  this.c = c;
  this.type = 'triangle';
}

// this resets prototype but also disconnects constructor
Triangle.prototype = shape;
Triangle.prototype.getPerimeter = function() {
  return this.a + this.b + this.c;
}

// must reset constructor because prototype changed
Triangle.prototype.constructor = Triangle;

let t = new Triangle(3, 4, 5);
console.log(t.constructor);                 // Triangle(a, b, c)
console.log(shape.isPrototypeOf(t));        // true
console.log(t.getPerimeter());              // 12
console.log(t.getType());                   // "triangle"

// (2)
// Update the following code so that, instead of logging the values, each
// statement logs the name of the constructor to which it belongs.

// console.log("Hello");
// console.log([1,2,3]);
// console.log({name: 'Srdjan'});

// initially tried Object.getPrototypeOf(obj).constructor, but
// constructor on the object by itself would inherit that anyway
// we can use property name of the constructor to give us the string
// (constructor returns the function itself)
// functions have a name property

console.log("Hello".constructor.name);
console.log([1,2,3].constructor.name);
console.log({name: 'Srdjan'}.constructor.name);

// (3)
// Since a constructor is just a function, it can be called without the new
// operator, and this can lead to unexpected results and errors especially for
// inexperienced programmers.

// Write a constructor function that can be used with or without the new
// operator, and return the same result in either form. Use the code below to
// check your solution:

// recall what a constructor function does: creates the new object, sets its
// prototype, and returns the new object

// we are using a scope-safe constructor: we test whether this is an instance
// of the constructor type; if not, that means the constructor was called
// without `new`, so we recursively call using `new` with the arguments.
// This is the same mechanism in JS that allows x = Array(1, 2, 3) AND x = new
// Array(1, 2, 3);

function User(first, last) {
  if (!(this instanceof User)) {
    return new User(first, last);
  }

  this.name = first + ' ' + last;
}

let name = 'Jane Doe';
let user1 = new User('John', 'Doe');
let user2 = User('John', 'Doe');

console.log(name);         // => Jane Doe
console.log(user1.name);   // => John Doe
console.log(user2.name);   // => John Doe

// (4)
// Create a function that can create an object with a given object as its
// prototype, without using Object.create.

// initial solution was to create a new object with a literal and then
// call Object.setPrototypeOf(), it works, but it can raise performance issues

function createObject(obj) {
  // let newObject = {};
  // Object.setPrototypeOf(newObject, obj);
  // return newObject;
  function F() {} // create temporary constructor function
  F.prototype = obj; // set the prototype for the constructor function
  return new F(); // return a new object created by the temporary function
}

let foo = {
  a: 1
};

let bar = createObject(foo);
foo.isPrototypeOf(bar);         // true

// (5)
// Similar to the problem above, without using Object.create, create a
// begetObject method that you can call on any object to create an object
// inherited from it:

// the key is that you can call it on any object! (my solution only allows
// it to be called on 'foo')

let foo = {
  a: 1,
};

// this is actually what `Object.create(prot)` is doing
Object.prototype.begetObject = function() { // can call on any object
  function F() {}
  F.prototype = this; // method invocation, so this is the calling object
  return new F();
}

let bar = foo.begetObject();
foo.isPrototypeOf(bar);         // true

// (6)
// Create a function neww, so that it works like the new operator. For this
// practice problem, you may use Object.create.

function neww(constructor, args) {
  let newObject = Object.create(constructor.prototype);
  // newObject.firstName = args[0];
  // newObject.lastName = args[1];
  // return newObject;

  let result = constructor.apply(newObject, args);
  console.log(result); // undefined recall, when you call constructor without
  // `new` it does not implicitly return a new object; we're just calling
  // the constructor to set the object properties (calling it as a regular
  // function)
  return typeof result === 'object' ? result : object;
}

function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

Person.prototype.greeting = function() {
  console.log('Hello, ' + this.firstName + ' ' + this.lastName);
};

let john = neww(Person, ['John', 'Doe']);
john.greeting();          // => Hello, John Doe
john.constructor;         // Person(firstName, lastName) {...}
