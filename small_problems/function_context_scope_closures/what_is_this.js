// Read the following code carefully. What do you think is logged on line 7. Try
// to answer the question before you run the code.

// the current execution context when `person` is defined is `globalThis`.
// therefore, when `fullName` is defined in `person`, `this` refers to the
// global object. Since `firstName` and `lastName` are not defined on the
// global object, this will result in `undefined` + `undefined`, which is `NaN`
// `NaN` will be logged

// Be careful when we see `this` outside any function.

const person = {
  firstName: 'Rick ',
  lastName: 'Sanchez',
  fullName: this.firstName + this.lastName,
};

console.log(person.fullName);
