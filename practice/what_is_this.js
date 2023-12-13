// (1)
// What does this point to in the code below?
//
// 'this' doesn't point to anything here...the function has not been 
// invoked; 'this' is determined by how the function is invoked. We do not 
// know the context.

function whatIsMyContext() {
  return this;
}

// (2)
// What does this point to in the code below?
//
// 'this' points to 'globalThis' ('window' or 'global'); 
// this is the global context. If strict mode were in place
// 'this' would be 'undefined'

function whatIsMyContext() {
  return this;
}

whatIsMyContext();

// (3) 
// What does this point to in the code below?
//
// the global context (globalThis object) or 'undefined' if in strict mode
// function invocation syntax

function foo() {
  function bar() {
    function baz() {
      console.log(this);
    }

    baz();
  }

  bar();
}

foo();

// (4) 
// What does this point to in the code below?
//
// 'this' points to 'obj'; this is method invocation syntax
// so the implicit context is the calling object

let obj = {
  count: 2,
  method() {
    return this.count;
  },
};

obj.method();

// (5)
// In strict mode, what does the following program log to the console?
//
// with function invocation syntax, in strict mode, 'this' is 'undefined'
// this code will raise an error, as we are trying to access a nonexistent
// property on 'undefined'--in strict mode this raises an error

function foo() {
  console.log(this.a);
}

let a = 2;
foo();

// (6) What does the following program log to the console?
//
// this logs 2
// method invocation syntax, the implicit context is 'obj', the
// calling object

let a = 1;
function bar() {
  console.log(this.a);
}

let obj = {
  a: 2,
  foo: bar,
};

obj.foo();

// (7)
// What does the following code log to the console?
//
// the first call is with method invocation syntax; the context is 'foo'
// the second call is function invocation syntax; the context is the global
// context
//
// with the first call, 'this' is 'foo', and the 'foo' object is logged
// with the second call, we will get an error; we attempt to invoke `baz()`
// on the global object, where it does not exist. 
// 'this.baz is not a function'

let foo = {
  a: 1,
  bar() {
    console.log(this.baz());
  },

  baz() {
    return this;
  },
};

foo.bar();
let qux = foo.bar;
qux();

Part II
// (1)
// What does this point to in the code below, and what does the method return?
//
// 'this' points to 'myChildObject' but 'myChildObject' does not have 'count'
// property to access with 'this'; the method returns 'undefined'

et myObject = {
  count: 1,
  myChildObject: {
    myMethod() {
      return this.count;
    },
  },
};

myObject.myChildObject.myMethod();

// (2)
// In the previous problem, how would you change the context, or the value of
// this, to myObject?
//
// I would invoke the method with 'call' to explicitly set the context

let myObject = {
  count: 1,
  myChildObject: {
    myMethod() {
      return this.count;
    },
  },
};

myObject.myChildObject.myMethod.call(myObject);

// (3)
// What does the following code log to the console?
//
// 'Peter Parker is the Amazing Spiderman!'
// 'whoIsSpiderman' is assigned to the 'fullName' method bound to 
// the person object; although invoked with function invocation
// syntax, the bound object will be the implicit context

let person = {
  firstName: 'Peter',
  lastName: 'Parker',
  fullName() {
    console.log(this.firstName + ' ' + this.lastName +
                ' is the Amazing Spiderman!');
  },
};

let whoIsSpiderman = person.fullName.bind(person);
whoIsSpiderman();

// (4)
// What does the following code log to the console?
//
// context loss by internal function
// this will return 35000; in method 'specialDiscount', 
// 'this' refers to the global context, so the 'else'
// clause will execute ('this.price' will return undefined)
//
// If you want this program to log 34000, how would you fix it?
//
// We need to provide the 'computer' context to the internal
// function. one way to do this would be to assign 'this' to 'self'
// in the 'total' method so it will be within scope in the internal
// method

let computer = {
  price: 30000,
  shipping: 2000,
  total() {
    let tax = 3000;
		let self = this;
    function specialDiscount() {
      if (self.price > 20000) {
        return 1000;
      } else {
        return 0;
      }
    }

    return this.price + this.shipping + tax - specialDiscount();
  }
};

console.log(computer.total());

// Other ways to fix this:
// - bind 'specialDiscount' to 'this' in 'total'
// - invoke 'specialDiscount()' with call to explicitly set the 
//   context to 'this'
// - define 'specialDiscount' using an arrow function, which 
//   retains 'this' in the context of its definition
