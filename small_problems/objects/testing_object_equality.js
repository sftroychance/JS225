// In JavaScript, comparing two objects either with == or === checks for object
// identity. In other words, the comparison evaluates as true if it's the same
// object on either side of == or ===. This is a limitation, in a sense, because
// sometimes we need to check if two objects have the same key/value pairs.
// JavaScript doesn't give us a way to do that.

// Write a function objectsEqual that accepts two object arguments and returns
// true or false depending on whether the objects have the same key/value pairs.

// note: rewrite after accidental deletion of file
// approach:
//  immediately return true if obj1 === obj2
//  return false if objects do not have the same keys
//  (Object.keys() returns own properties)
//  iterate over keys of obj1
//  - if both values at the key are objects, recursively call this function
//    on those values
//  - return false if obj1[key] !== obj2[key]
//  return true

function objectsEqual(obj1, obj2) {
  if (obj1 === obj2) return true;

  if (String(Object.keys(obj1).sort()) !== String(Object.keys(obj2).sort())) {
    return false;
  }

  for (const key of Object.keys(obj1)) {
    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      return objectsEqual(obj1[key], obj2[key]);
    }

    if (obj1[key] !== obj2[key]) return false;
  }

  return true;
}

console.log(objectsEqual({a: 'foo'}, {a: 'foo'}));                      // true
console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}));            // false
console.log(objectsEqual({}, {}));                                      // true
console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1}));  // false
console.log(objectsEqual({a: 'foo', b: [1, 2, 3]}, {a: 'foo', b: [1, 2, 3]}));  // true
console.log(objectsEqual({a: 'foo', b: [1, 3, 2]}, {a: 'foo', b: [1, 2, 3]}));  // false
