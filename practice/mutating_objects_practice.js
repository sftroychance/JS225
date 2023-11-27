// (1)
// What will the code below output to the console?
//
// 'Hello from the function scope!'
// 'Hello from the global scope!'
//
// a string is not mutable, so the global value
// could not be affected by the function in any case.
// the global variable 'message' is shadowed in 'func()'
// and assigned a new value; that new value is logged
// within the function, and then outside the function
// the global 'message' value is logged.

let message = 'Hello from the global scope!';

function func(message) {
  message = 'Hello from the function scope!';
  console.log(message);
}

func(message);
console.log(message);

// (2)
// What will the code below log to the console? What does this output
// demonstrate in relation to the output of problem one?
// 
// 'Greetings from the function scope!'
// 'Greetings from the function scope!'
// 
// Here, an object, which is mutable, is sent as an argument to
// 'func()', where the object is mutated by reassigning its message
// property to a new value. Because the object is mutated, the change
// is reflected by the logging statement within the function and also
// the one outside it.
//
// The overall concept: the mutability of objects. The reference
// contained in 'obj' is not changed in 'func()'; 'obj' is never
// reassigned to a new value, so it maintains the reference shared by
// 'myObj'

let myObj = { message: 'Greetings from the global scope!' };

function func(obj) {
  obj.message = 'Greetings from the function scope!';
  console.log(obj.message);
}

func(myObj);

console.log(myObj.message);

// (3)
// What will the code below log to the console?
// 
// 'Hello from the function scope!'
// 'Hello from the function scope!'
//
// Here, 'func()' is accessing the global variable 'message'
// and reassigning it to a new value. This is a demonstration
// of scope--a variable in outer scope (here, global scope) is in
// scope within 'func()'.

let message = 'Hello from the global scope!';

function func() {
  message = 'Hello from the function scope!';
  console.log(message);
}

func();
console.log(message);

// (4)
// What will the code below log to the console?
// 
// false
// true
//
// 'newObj' is assigned the reference to 'obj'; both
// variables point to the same object. When the property 'a' 
// is reassigned, the object is mutated, and it is reflected
// accessing the object with either variable. 
//
// In the object literal assigned to 'obj', a is copied as a property;
// however, since the number value is immutable, the value is copied,
// not a reference. Therefore, when the property is reassigned, it does not
// affect variable 'a', so 'obj.a' is not equal to 'a'. Since 'newObj' and 
// 'obj' point to the same object, 'newObj.a' is equal to 'obj.a'

let a = 10;
let obj = {
  a
}

let newObj = obj;
newObj.a += 10;

console.log(obj.a === a);
console.log(newObj.a === obj.a);

// (5)
// Consider the code below. If objects are mutable, why does the second to last
// line return false?
// 
// the variable 'animal' is ressigned to a new object, but the 
// reference to the original object is still held by 'menagerie.warthog'

let animal = {
  name: 'Pumbaa',
  species: 'Phacochoerus africanus',
};

let menagerie = {
  warthog: animal,
};

animal = {
  name: 'Timon',
  species: 'Suricata suricatta',
};

menagerie.meerkat = animal;

menagerie.warthog === animal; // false
menagerie.meerkat === animal; // true
