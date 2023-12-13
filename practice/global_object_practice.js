// Note that all the following code is run in Chrome Snippets;
// Some answers will be different if running them in Node (including VSCode)

// (1)
// With strict mode not enabled, what object serves as the implicit execution
// context? What happens when strict mode is enabled?

// When strict mode is not enabled, `window`--the global object--is the implicit
// execution context (in Node it is `global`). If strict mode is enabled, the
// implicit execution context is `undefined`.

// (2)
// What does the code below log?
// This will log 'true'.  A variable declared without a keyword is placed
// on the global object `window`

a = 10;

console.log(window.a === a);

// (3)
// What does the code below log?
// This will result in an error. Strict mode does not allow any variable to be
// declared without a keyword. (ReferenceError)

"use strict"

a = 10;

console.log(window.a === a);

// (4)
// What does the code below do?
// This will result in an error. `b` is defined as a variable local to `func()`
// and is not available outside that function, so the logging statement will
// raise an error (ReferenceError)

function func() {
  let b = 1;
}

func();

console.log(b);

// (5)
// What does the code below do?
// This code will log the value 1
// 'b' is declared without a keyword, so it is placed on the global object
// Therefore, it is available outside the function when it is logged

function func() {
  b = 1;
}

func();

console.log(b);

// (6)
// What does the code below log?
// This will result in an error. strict mode does not allow variables to be
// declared without a keyword; the global object is not available as the
// implicit execution context. This is a ReferenceError because b is being
// referenced without being declared.

"use strict"

function func() {
  b = 1;
}

func();

console.log(b);
