// Using functions inside objects as methods
// coding following lesson:

// define object representing me
let me = {
	firstName: 'Troy',
	lastName: 'Graves',
};

// properties can be defined outside the object:
me.hometown = 'Hephzibah';

console.log(me);
// { firstName: 'Troy', lastName: 'Graves', hometown: 'Hephzibah' }

// create a function fullName that logs the full name
function fullName(person) {
	console.log(`${person.firstName} ${person.lastName}`);
}

fullName(me);
// Troy Graves

// function fullName will work with any object that has properties
// 'firstName' and 'lastName'
let friend = {
	firstName: 'Victor',
	lastName: 'Bearzbub',
};

fullName(friend);

// Create parent objects
let mother = {
	firstName: 'Judy',
	lastName: 'Silver',
};

let father = {
	firstName: 'Joseph',
	lastName: 'Graves',
}

fullName(mother);
fullName(father);

// create an array to hold all the people we are creating
let people = [];

people.push(me);
people.push(friend);
people.push(mother);
people.push(father);

console.log(people);

// create a function rollCall() that iterates over the people collection and logs full name
// note: forEach takes a callback function and sends that callback 
// function the next element in the collection, one of the entries in 
// the 'people' array
// Because fullName() also takes a person object, we can just use the
// name of the fullName() function as the callback.
// Note there will be an issue if the callback takes more than one argument
// as 'forEach()' also sends index and a reference to the calling 
// array as the next arguments to the callback

function rollCall(collection) {
	// collection.forEach(person => fullName(person));
	collection.forEach(fullName); 
}

rollCall(people);

// now combine the collection and the functions into an object 'people'
people = {
	collection: [me, friend, mother, father],

	fullName(person) {
		console.log(`${person.firstName} ${person.lastName}`);
		if (person?.hometown) console.log(`${person.hometown}`);
	},

	rollCall() {
		this.collection.forEach(this.fullName);
	}
}
// note the use of 'this' to refer to properties of the current object
// if we use 'people' instead of this, that would work, but the methods
// would break if we changed the variable name 'people' to something else
//
// the original rollCall() and fullName() functions were not attached 
// to an object (they were not methods), so their 'this' value would be 
// 'global' or 'window' (depending on context).
//
// now that both functions are methods attached to a parent object, 
// (people), that parent object is the default context, which we access
// with 'this' keyword
//

people.rollCall();

// so far we have hardcoded the person objects in the collection 
// object within object 'people'. We should provide a way to add a 
// person to the collection:

people.add = function(person) {
	this.collection.push(person);
};

let stranger = {
	firstName: 'Peter',
	lastName: 'Neal',
};

people.add(stranger);
people.rollCall();

// to remove a person from the people collection, we need to:
// - find the index of the person we want to remove in collection
// 		- iterate over collection and return index of person
// 		  with the target firstName and lastName; return -1 if not found
// - if not found, return (nothing to be removed)
// - call 'splice' to remove the person from the collection using the index
//
// to do this:
// - define method 'getIndex(person)' that iterates over collection
// 	 and returns index if the firstName and lastName match, -1 if not found
// - define method 'remove(person)' that calls 'getIndex()' to find the 
// 		target index; if target index is not found, return from function
// 		- call splice on the collection to remove the element at target index
//

people.getIndex = function(person) {
	let index = -1;
	this.collection.forEach((candidate, idx) => {
		if (candidate.firstName === person.firstName && candidate.lastName === person.lastName) {
			index = idx;
		}
	});

	return index;
};


people.remove = function(person) {
	let targetIndex = this.getIndex(person);

	if (targetIndex === -1) return;

	this.collection.splice(targetIndex, 1);
};

people.remove(stranger);
people.rollCall();

// add some validation to 'add' and 'remove' that verifies the
// person object is valid (has firstName and lastName properties that
// are strings)

// - add isInvalidPerson(person) to return boolean
people.isInvalidPerson = function(person) {
	return typeof person.firstName !== 'string' || typeof person.lastName !== 'string';
}

// revise 'add' and 'remove' to verify whether person object sent
// as an argument is valid.
people.add = function(person) {
	if (this.isInvalidPerson(person)) return; 

	this.collection.push(person);
};

people.remove = function(person) {
	if (this.isInvalidPerson(person)) return; 

	let targetIndex = this.getIndex(person);

	if (targetIndex === -1) return;

	this.collection.splice(targetIndex, 1);
};

people.add(stranger);
people.rollCall();

people.remove(stranger);
people.rollCall();

// add methods 'get' and 'update'	to access and change person
// both with param -> person, both validate person before taking action

people.get = function(person) {
	if (this.isInvalidPerson(person)) return; 

	let targetIndex = this.getIndex(person);

	if (targetIndex === -1) return;

	return this.collection[targetIndex];
}

people.update = function(person) {
	if (this.isInvalidPerson(person)) return; 

	let targetIndex = this.getIndex(person);
	
	if (targetIndex === -1) {
		this.add(person);
	} else {
		this.collection[targetIndex] = person;
	}
}

console.log(people.get(friend));

friend.hometown = 'Detroit';
people.update(friend);
people.rollCall();

// if two persons have the same name, we might not locate the 
// right one to update or delete. add an IDnumber to the person
// object. maintain a variable in 'people' lastIDUsed, and every
// time we call 'add' to add a person to the list, increment the 
// variable lastIDUsed and assign that value to the idNumber property
// of the person object (recall that collections holds references
// to the person objects, so the original objects would be updated
// with the new property.) 
//
// - add local variable to the people object - lastIDUsed; initialize to 0
// - update 'add' to increment this value and set the property
// - update 'rollCall' to print ID with the name
// - update 'getIndex' to check ID instead of name 
// 	(this updates 'get', 'update', and 'remove')
//
// 	start by restating the full definition of 'people' to include
// 	the methods we have dynamically added in this walkthrough
// 	- make the changes within that redefined object

people = {
	_lastIDUsed: 0,

	collection: [],

	fullName(person) {
		console.log(`${person.ID} - ${person.firstName} ${person.lastName}`);
	},

	rollCall() {
		this.collection.forEach(this.fullName);
	},

	getIndex(person) {
		let index = -1;
		this.collection.forEach((candidate, idx) => {
			if (candidate.ID === person.ID) {
				index = idx;
			}
		});

		return index;
	},

	isInvalidPerson(person) {
		return typeof person.firstName !== 'string' || typeof person.lastName !== 'string';
	},

	add(person) {
		if (this.isInvalidPerson(person)) return; 

		this._lastIDUsed += 1;
		person.ID = this._lastIDUsed;

		this.collection.push(person);
	},

	remove(person) {
		if (this.isInvalidPerson(person)) return; 

		let targetIndex = this.getIndex(person);

		if (targetIndex === -1) return;

		this.collection.splice(targetIndex, 1);
	},

	get(person) {
		if (this.isInvalidPerson(person)) return; 

		let targetIndex = this.getIndex(person);

		if (targetIndex === -1) return;

		return this.collection[targetIndex];
	},

	update(person) {
		if (this.isInvalidPerson(person)) return; 

		let targetIndex = this.getIndex(person);
		
		if (targetIndex === -1) {
			this.add(person);
		} else {
			this.collection[targetIndex] = person;
		}
	},
}

people.collection = [];

people.add(me);
people.add(friend);
people.add(mother);
people.add(father);

people.rollCall();

people.remove(father);
friend.lastName = 'BZB';
people.update(friend);
console.log('after removal and update:');
people.rollCall();
