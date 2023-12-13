// (1)
// Create a class Cat that logs the string I'm a cat! to the console whenever a
// new instance is created. Then instantiate a new instance of Cat and assign it
// to a kitty variable.

// class Cat {
//   constructor() {
//     console.log('I\'m a cat!');
//   }
// }

// let kitty = new Cat();
// console.log(kitty);
// console.log(kitty.constructor);

// (2)
// Using the code from the previous exercise, add a parameter to constructor
// that provides a name for the Cat object, and assign this parameter to a
// property called name. If no argument is provided, the name should default to
// Kitty. Then, replace the I'm a cat! message with a greeting that includes the
// provided name.

// class Cat {
//   constructor(name = 'Kitty') {
//     this.name = name;
//     console.log(`I'm ${this.name} the cat!`);
//   }
// }

// let kitty = new Cat();
// let james = new Cat('James');
// console.log(james.name);

// (3)
// Using the code from the previous exercise, move the greeting from the
// constructor method to an instance method named greet that logs a greeting to
// the console when invoked. Additionally, define one more instance method named
// rename that renames a Cat instance when invoked.

// class Cat {
//   constructor(name = 'Kitty') {
//     this.name = name;
//   }

//   greet() {
//     console.log(`I'm ${this.name} the cat!`);
//   }

//   rename(newName) {
//     this.name = newName;
//   }
// }

// let kitty = new Cat();
// kitty.rename('James');
// kitty.greet();
// console.log(kitty.name);

// (4)
// Using the code from the previous question, write any code necessary so that
// the string Hello! I'm a cat! is logged to the console when
// Cat.genericGreeting is invoked.

// class Cat {
//   constructor(name = 'Kitty') {
//     this.name = name;
//   }

//   static genericGreeting() {
//     console.log('Hello! I\'m a cat!');
//   }

//   greet() {
//     console.log(`I'm ${this.name} the cat!`);
//   }

//   rename(newName) {
//     this.name = newName;
//   }
// }

// Cat.genericGreeting();

// (5)
// Create a class Rectangle.

// The constructor should take 2 arguments which represent width and length,
// respectively.

// Implement the class so that the output from the example below is correct.

class Rectangle {
  constructor(width, length) {
    this.width = width;
    this.length = length;
  }

  getWidth() {
    return this.width;
  }

  getLength() {
    return this.length;
  }

  getArea() {
    return this.width * this.length;
  }
}


const rect = new Rectangle(4, 5);

console.log(rect.getWidth()); // 4
console.log(rect.getLength()); // 5
console.log(rect.getArea()); // 20

// (6)
// Given the class from the previous problem, write a class called Square that
// inherits from Rectangle, and is used like this:

class Square extends Rectangle {
  constructor(side) {
    super(side, side);
  }
}

const square = new Square(5);
console.log(`area of square = ${square.getArea()}`); // area of square = 25

// (7)
// Without calling the Cat constructor, create an object that looks and acts
// like a Cat instance that doesn't have a defined name.

// class Cat {
//   constructor(name) {
//     this.name = name;
//   }
//   speaks() {
//     return `${this.name} says meowwww.`;
//   }
// }

// let fakeCat = Object.create(Cat.prototype);

// console.log(fakeCat instanceof Cat); // logs true
// console.log(fakeCat.name);           // logs undefined
// console.log(fakeCat.speaks());       // logs undefined says meowwww.

// fakeCat.name = 'Simon';
// console.log(fakeCat.speaks());

// (8)
// Update this code so that when you run it, you see the below output:

// My cat Pudding is 7 years old and has black and white fur.
// My cat Butterscotch is 10 years old and has tan and white fur.

// class Pet {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }
// }

// class Cat extends Pet {
//   constructor(name, age, color) {
//     super(name, age);
//     this.color = color;
//   }

//   info() {
//     const message = `My cat ${this.name} is ${this.age} ` +
//       `${this.age > 1 ? 'years' : 'year'} old and has ${this.color} fur.`;
//     console.log(message);
//   }
// }

// let pudding = new Cat('Pudding', 7, 'black and white');
// let butterscotch = new Cat('Butterscotch', 10, 'tan and white');
// let james = new Cat('James', 1, 'green');

// console.log(pudding.info());
// console.log(butterscotch.info());
// console.log(james.info());

// (9)
// Given a class Animal create two classes Cat and Dog that inherit from it.

// The Cat constructor should take 3 arguments, name, age and status. Cats
// should always have a leg count of 4 and a species of cat. Also, the introduce
// method should be identical to the inherited one except, after the returned
// phrase, there should be a single space and the words Meow meow!.

// The Dog constructor should take 4 arguments, name, age and status and master.
// Dogs should always have a leg count of 4 and a species of dog. Dogs have the
// same introduce method as any other animal, but they have their own method
// called greetMaster(), which accepts no arguments and returns Hello (master's
// name)! Woof, woof!. (Make sure you replace (master's name) with the name of
// the dog's master.)

class Animal {
  constructor(name, age, legs, species, status) {
    this.name = name;
    this.age = age;
    this.legs = legs;
    this.species = species;
    this.status = status;
  }
  introduce() {
    return `Hello, my name is ${this.name} and I am ${this.age} years old and ${this.status}.`;
  }
}

class Cat extends Animal {
  constructor(name, age, status) {
    super(name, age, 4, 'cat', status);
  }

  introduce() {
    // return super.introduce() + ` Meow meow!`;
    return `${super.introduce()} Meow meow!`;
  }
}

class Dog extends Animal {
  constructor(name, age, status, master) {
    super(name, age, 4, 'dog', status);
    this.master = master;
  }

  greetMaster() {
    return `Hello ${this.master}! Woof Woof!`;
  }
}

const cat = new Cat("Pepe", 2, "happy");
console.log(cat.introduce() === "Hello, my name is Pepe and I am 2 years old and happy. Meow meow!");
// logs true

const dog = new Dog('Delta', 11, 'sleepy', 'Troy');
console.log(dog.introduce());
console.log(dog.greetMaster());

// (10)
// Refactor these classes so they all use a common superclass, and inherit
// behavior as needed.

// class Car {
//   constructor(make, model) {
//     this.make = make;
//     this.model = model;
//   }

//   getWheels() {
//     return 4;
//   }

//   info() {
//     return `${this.make} ${this.model}`;
//   }
// }

// class Motorcycle {
//   constructor(make, model) {
//     this.make = make;
//     this.model = model;
//   }

//   getWheels() {
//     return 2;
//   }

//   info() {
//     return `${this.make} ${this.model}`
//   }
// }

// class Truck {
//   constructor(make, model, payload) {
//     this.make = make;
//     this.model = model;
//     this.payload = payload;
//   }

//   getWheels() {
//     return 6;
//   }

//   info() {
//     return `${this.make} ${this.model}`
//   }
// }

class Vehicle {
  constructor(make, model, wheels) {
    this.make = make;
    this.model = model;
    this.wheels = wheels;
  }

  getWheels() {
    return this.wheels;
  }

  info() {
    return `${this.make} ${this.model}`;
  }
}

class Car extends Vehicle {
  constructor(make, model) {
    super(make, model, 4);
  }
}

class Motorcycle extends Vehicle {
  constructor(make, model) {
    super(make, model, 2);
  }
}

class Truck extends Vehicle {
  constructor(make, model, payload) {
    super(make, model, 6);
    this.payload = payload;
  }
}

// (11)
// What will the following code log?

class Something {
  constructor() {
    this.data = "Hello";
  }

  dupData() {
    return this.data + this.data;
  }

  static dupData() {
    return "ByeBye";
  }
}

const thing = new Something();
console.log(Something.dupData()); // ByeBye
console.log(thing.dupData()); // HelloHello

// (12)
// Rewrite the two following object types to use the class keyword, instead of
// direct prototype manipulation. Person exposes a method greeting, which when
// called logs the provided greeting text. Shouter is a subtype of Person, and
// is a bit loud, so whatever he says is uppercased.

// function Person() {}
// Person.prototype.greeting = function(text) {
//   console.log(text);
// }

// function Shouter() {
//   Person.call(this);
// }

// Shouter.prototype = Object.create(Person.prototype)
// Shouter.prototype.greeting = function(text) {
//   Person.prototype.greeting.call(this, text.toUpperCase());
// }

class Person {
  greeting(text) {
    console.log(text);
  }
}

class Shouter extends Person {
  greeting(text) {
    super.greeting(text.toUpperCase());
  }
}

const person = new Person();
const shouter = new Shouter();

person.greeting("Hello. It's very nice to meet you."); // Hello. It's very nice to meet you
shouter.greeting("Hello my friend."); // HELLO MY FRIEND.

// (13)
// Write the classes and methods that will be necessary to make this code run,
// and log the following output:

// notes:
// think about responsibilities
// pet should provide its own description
// owner should maintain its own pets list
// owner should print its own pets
// owner should have a method to add a pet, rather than allowing
//  shelter to manipulate owner's pet list directly
// shelter can keep an array of owner objects and access
//  pet data through that object

class Pet {
  constructor(animal, name) {
    this.animal = animal;
    this.name = name;
  }

  description() {
    return `a ${this.animal} named ${this.name}`;
  }
}

class Owner {
  constructor(name) {
    this.name = name;
    this.pets = [];
  }

  addPet(newPet) {
    this.pets.push(newPet);
  }

  numberOfPets() {
    return this.pets.length;
  }

  printPets() {
    this.pets.forEach((pet) => console.log(pet.description()));
  }
}

class Shelter {
  constructor() {
    this.owners = [];
  }

  adopt(owner, pet) {
    if (!(this.owners.includes(owner))) {
      this.owners.push(owner);
    }

    owner.addPet(pet);
  }

  printAdoptions() {
    for (const owner of this.owners) {
      console.log(`${owner.name} has adopted the following pets:`);
      owner.printPets();
      console.log();
    }
  }
}

const butterscotch = new Pet('cat', 'Butterscotch');
const pudding = new Pet('cat', 'Pudding');
const darwin = new Pet('bearded dragon', 'Darwin');
const kennedy = new Pet('dog', 'Kennedy');
const sweetie = new Pet('parakeet', 'Sweetie Pie');
const molly = new Pet('dog', 'Molly');
const chester = new Pet('fish', 'Chester');

const phanson = new Owner('P Hanson');
const bholmes = new Owner('B Holmes');

const shelter = new Shelter();
shelter.adopt(phanson, butterscotch);
shelter.adopt(phanson, pudding);
shelter.adopt(phanson, darwin);
shelter.adopt(bholmes, kennedy);
shelter.adopt(bholmes, sweetie);
shelter.adopt(bholmes, molly);
shelter.adopt(bholmes, chester);
shelter.printAdoptions();
console.log(`${phanson.name} has ${phanson.numberOfPets()} adopted pets.`);
console.log(`${bholmes.name} has ${bholmes.numberOfPets()} adopted pets.`);

// P Hanson has adopted the following pets:
// a cat named Butterscotch
// a cat named Pudding
// a bearded dragon named Darwin

// B Holmes has adopted the following pets:
// a dog named Molly
// a parakeet named Sweetie Pie
// a dog named Kennedy
// a fish named Chester

// P Hanson has 3 adopted pets.
// B Holmes has 4 adopted pets.

// (14)
// complete this class for the given functionality:

class Banner {
  constructor(message) {
    this.message = message;
  }

  displayBanner() {
    console.log([this.horizontalRule(), this.emptyLine(), this.messageLine(), this.emptyLine(), this.horizontalRule()].join("\n"));
  }

  horizontalRule() {
    return `+${'-'.repeat(this.message.length + 2)}+`;
  }

  emptyLine() {
    return `|${' '.repeat(this.message.length + 2)}|`;
  }

  messageLine() {
    return `| ${this.message} |`
  }
}

let banner1 = new Banner('To boldly go where no one has gone before.');
banner1.displayBanner();
// +--------------------------------------------+
// |                                            |
// | To boldly go where no one has gone before. |
// |                                            |
// +--------------------------------------------+

let banner2 = new Banner('');
banner2.displayBanner();
// +--+
// |  |
// |  |
// |  |
// +--+
