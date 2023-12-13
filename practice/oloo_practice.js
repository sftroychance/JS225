// (1)
// Use the OLOO pattern to create an object prototype that we can use to create
// pet objects. The prototype should let us create and use pets as below.

let PetPrototype = {
  init(animal, name) {
    this.animal = animal;
    this.name = name;
    return this;
  },

  sleep() {
    console.log('I am sleeping');
  },

  wake() {
    console.log('I am awake');
  }
};

let pudding = Object.create(PetPrototype).init("Cat", "Pudding");
console.log(`I am a ${pudding.animal}. My name is ${pudding.name}.`);
pudding.sleep(); // I am sleeping
pudding.wake();  // I am awake

let neptune = Object.create(PetPrototype).init("Fish", "Neptune");
console.log(`I am a ${neptune.animal}. My name is ${neptune.name}.`);
neptune.sleep(); // I am sleeping
neptune.wake();  // I am awake

// (2)
// Convert your code from the previous exercise to use the pseudo-classical
// object creation pattern using a Pet constructor.

function Pet(animal, name) {
  this.animal = animal;
  this.name = name;
}

Pet.prototype.sleep = function() {
  console.log('I am sleeping');
};

Pet.prototype.wake = function() {
  console.log('I am awake');
}

pudding = new Pet("Cat", "Pudding");
console.log(`I am a ${pudding.animal}. My name is ${pudding.name}.`);
pudding.sleep(); // I am sleeping
pudding.wake();  // I am awake

neptune = new Pet("Fish", "Neptune");
console.log(`I am a ${neptune.animal}. My name is ${neptune.name}.`);
neptune.sleep(); // I am sleeping
neptune.wake();  // I am awake
