// (1)
// What naming convention separates constructor functions from other functions?

// Constructor functions are capitalized by convention.

// (2)
// What will the code below output? Why?

// this will return an error.  Because the constructor function is invoked
// without keyword `new`, it does not return a new object, and there is no
// explicit return statement, so the value of `lizzy` is set to `undefined`
// We will get an error for trying to invoke the function `scamper` on
// `undefined`

function Lizard() {
  this.scamper = function() {
    console.log("I'm scampering!");
  };
}

let lizzy = Lizard();
lizzy.scamper(); // TypeError - lizzy is `undefined`

// (3)
// Alter the code in problem 2 so that it produces the desired output.

// We just need to insert the keyword `new` when we invoke the constructor
// function

lizzy = new Lizard();
lizzy.scamper(); //
