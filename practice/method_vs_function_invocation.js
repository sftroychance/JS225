const myObj = {
  name: 'Troy',
  sayMyName() { // note concise syntax
    console.log(this);
    console.log(`I am ${this.name}.`);
  }
}

// defined as you would any other property, dot notation
// named the function instead of using anonymous function--does it matter here?
// - when logging the object it lists the method as 'sayAnotherName: [Function: sayAnotherName]'
//   instead of 'sayAnotherName: [Function (anonymous)]'
// myObj.sayAnotherName = function(otherName) {
myObj.sayAnotherName = function sayAnotherName(otherName) {
  console.log(this);
  console.log(`I am ${otherName}. I am not ${this.name}.`);
}

myObj.sayMyName(); // 'this' within the method refers to myObj
// 'I am Troy.'

sayIt = myObj.sayMyName;

sayIt(); // 'this' in the method refers to the global object; there is no receiver
// 'I am undefined.'

// but look at this! just a guess
// we can use bind to bind the function to this particular object
const sayItBound = myObj.sayMyName.bind(myObj);

sayItBound();
// 'I am Troy.'

const sayItRepeat = sayItBound;
sayItRepeat();
// 'I am Troy.' the function stays bound to the object

const sayItRepeatUnbound = sayItBound.bind(null);
// const sayItRepeatUnbound = sayItBound.bind(global); also tried this
sayItRepeatUnbound();
// 'I am Troy.'
// oops can't re-bind to null or global
