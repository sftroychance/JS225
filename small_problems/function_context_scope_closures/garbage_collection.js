// Read the following code carefully. Will the JavaScript garbage collection
// mechanism garbage collect the array assigned to the variable array after the
// function pushIt is called on line 11?

// No. `pushIt()` has a closure that contains `array`; until `pushIt()` is
// reassigned, or after the program has ended, `array` cannot be
// garbage collected

function makeArrays() {
  let array = [];

  return () => {
    array.push('');
    return array;
  };
}

const pushIt = makeArrays();
pushIt();
// more code
