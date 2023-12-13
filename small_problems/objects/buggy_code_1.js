// Find where the error is
// in 'greet()', the properties of the object were not prefaced with
// 'this.' (and no local variables were defined for the given terms),
// so a ReferenceError occurred

// this was fixed by prepending 'this.' to all the property names

function createGreeter(name) {
  return {
    name,
    morning: 'Good Morning',
    afternoon: 'Good Afternoon',
    evening: 'Good Evening',
    greet(timeOfDay) {
      let msg = '';
      switch (timeOfDay) {
        case 'morning':
          msg += `${this.morning} ${this.name}`;
          break;
        case 'afternoon':
          msg += `${this.afternoon} ${this.name}`;
          break;
        case 'evening':
          msg += `${this.evening} ${this.name}`;
          break;
      }

      console.log(msg);
    },
  };
}

const helloVictor = createGreeter('Victor');
helloVictor.greet('morning');

// further exploration
// why does the following code work?

// ans: In this code, variable 'name' is being used in the 'greet()' method, instead of
//  'this.name'. 'name' is indeed a property of the object; however, it is also a function
//  -scoped variable sent as an argument to the function that created the object. This is an
// illustration of variable scope.
// Note that if we change the value of the 'name' property and call one of those methods again,
// the message logged will use the original value of 'name' because that variable has not changed.
// We might also say that this illustrates a closure--as written, we can't change the value of the
// function-scoped 'name' variable, but a closure is the mechanism by which the value is retained.

// // rest of code omitted for brevity

// switch (timeOfDay) {
//   case 'morning':
//     msg += this.morning + ' ' + name;
//     break;
//   case 'afternoon':
//     msg += this.afternoon + ' ' + name;
//     break;
//   case 'evening':
//     msg += this.evening + ' ' + name;
//     break;
// }

// rest of code omitted for brevity
