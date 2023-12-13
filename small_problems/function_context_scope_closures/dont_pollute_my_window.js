// Considering the code below: Note that the message property uses the result of
// interpolation as its value. As a result, we have two global variables: name,
// and greeting that pollute the global scope. As we already know, we should
// limit the use of global variables as much as we can. Here we can avoid using
// the global variables by simply setting the message property to the value
// "Hello Naveed!". But let's pretend that we must use variables and
// interpolation to accomplish this. Can you think of a way to refactor this
// code so we don't have any other variables in the global scope besides
// greeter?

// const name = 'Naveed';
// const greeting = 'Hello';

// const greeter = {
//   message: `${greeting} ${name}!`,
//   sayGreetings() {
//     console.log(this.message);
//   }
// };

// We can make greeter an IIFE that takes two arguments (name and greeting)
// and immediately returns the object with the two values set

let greeter = function(name, greeting) {
  return {
    message: `${greeting} ${name}`,
    sayGreetings() {
      console.log(this.message);
    },
  };
}('Naveed', 'Hello');

greeter.sayGreetings();

// alternative solution per lesson:
// set the message property to an IIFE that returns the appropriate value

greeter = {
  message: (function() {
    const name = 'Naveed';
    const greeting = 'Hello';

    return `${greeting} ${name}`;
  })(),
  sayGreetings() {
    console.log(this.message);
  },
};

greeter.sayGreetings();
