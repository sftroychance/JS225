// (1)
// Use the method we learned above to assign foo below to a new Object with prot
// as its prototype.

let prot = {};

let foo = Object.create(prot);

// (2)
// Use getPrototypeOf to demonstrate the prototypal relationship between prot
// and foo.

console.log(Object.getPrototypeOf(foo) === prot); // true

// (3)
// Use isPrototypeOf to demonstrate the prototypal relationship between prot and
// foo.

console.log(prot.isPrototypeOf(foo)); // true

// (4)
// What will the last two lines of the code below return? Why?

// both true; prot is the prototype of `foo`
// Object.prototype is in the prototype chain for `foo`

prot = {};

foo = Object.create(prot);

console.log(prot.isPrototypeOf(foo)); // true
console.log(Object.prototype.isPrototypeOf(foo)); // true
