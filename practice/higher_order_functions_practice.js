// (1)
// What are the characteristics that define higher-order functions?
//
// Higher order functions (1) take a function as an argument, (2) return
// a function, or (3) both.
//
// (2) Of the two functions invoked (checkEven and filter), which is a
// higher-order function and why?
//
// Here, 'filter' is the higher-order function--it accepts a function as 
// argument
//
let numbers = [1, 2, 3, 4];
function checkEven(number) {
  return number % 2 === 0;
}

numbers.filter(checkEven); // [2, 4]

// (3)
//
// Implement makeCheckEven below, such that the last line of the code 
// returns an array [2, 4].

let numbers = [1, 2, 3, 4];
function makeCheckEven() {
	return function(num) {
		return num % 2 === 0;
	}
} 

let checkEven = makeCheckEven();

numbers.filter(checkEven); // [2, 4]

// (4)
// Implement execute below, such that the return values for the two function
// invocations match the commented values.
//
function execute(func, operand) {
	return func(operand);
} 

execute(function(number) {
  return number * 2;
}, 10); // 20

execute(function(string) {
  return string.toUpperCase();
}, 'hey there buddy'); // "HEY THERE BUDDY"

// (5)
// Implement makeListTransformer below such that timesTwo's return value
// matches the commented return value.
//

function makeListTransformer(func) {
	return function(arr) {
		return arr.map(func);
	};
}

let timesTwo = makeListTransformer(function(number) {
  return number * 2;
});

timesTwo([1, 2, 3, 4]); // [2, 4, 6, 8]
