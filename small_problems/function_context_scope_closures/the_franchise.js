// The method franchise.allMovies is supposed to return the following array:

// [
//   'How to Train Your Dragon 1',
//   'How to Train Your Dragon 2',
//   'How to Train Your Dragon 3'
// ]

// Explain why this method will not return the desired object. Try fixing this
// problem by taking advantage of JavaScript lexical scoping rules.

// const franchise = {
//   name: 'How to Train Your Dragon',
//   allMovies() {
//     return [1, 2, 3].map(function(number) {
//       return `${this.name} ${number}`;
//     });
//   },
// };

// This is a demonstration of context loss by function as argument. When `map`
// invokes the callback function, it is as a function invocation, not a method
// invocation; therefore, `this` refers to the global object

// To fix per instructions, in `allMovies()` we declare a variable `self` to
// point to `this`, and then we use `self` instead of `this` in the callback

// An alternative solution is to use an arrow function for the callback.
// An arrow function does access `this` lexically!

const franchise = {
  name: 'How to Train Your Dragon',
  allMovies() {
    const self = this;

    return [1, 2, 3].map(function(number) {
      return `${self.name} ${number}`;
    });
  },
};

console.log(franchise.allMovies());
