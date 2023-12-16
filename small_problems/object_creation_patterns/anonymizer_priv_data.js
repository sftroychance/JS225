// a solution to maintaining private data with this IIFE implementation:
// - create a privateData object in the IIFE funct
// - declare an ID variable, initialize to 0, in IIFE
// - declare a function nextID() that will return the next ID in sequence
let Account = function generateNewAccount() {
  const privateData = {};
  let accountID = 0;

  function nextAccountID() {
    accountID += 1;
    return accountID;
  }

  function anonymize() {
    return (Math.random().toString(36).slice(2) +
      Math.random().toString(36).slice(2)).slice(0, 16);
  }

  function isAuthenticated(enteredPassword, storedPassword) {
    return enteredPassword === storedPassword;
  }

  return {
    init(email, password, firstName, lastName) {
      this.id = nextAccountID();
      privateData[this.id] = {};

      privateData[this.id].email = email;
      privateData[this.id].password = password;
      privateData[this.id].firstName = firstName;
      privateData[this.id].lastName = lastName;

      this.displayName = anonymize();

      return this;
    },

    reanonymize(password) {
      if (!isAuthenticated(password, privateData[this.id].password)) {
        return 'Invalid Password';
      }

      this.displayName = anonymize();
      return true;
    },

    resetPassword(oldPassword, newPassword) {
      if (!isAuthenticated(oldPassword, privateData[this.id].password)) {
        return 'Invalid Password';
      }

      privateData[this.id].password = newPassword;
      return true;
    },

    firstName(password) {
      if (!isAuthenticated(password, privateData[this.id].password)) {
        return 'Invalid Password';
      }

      return privateData[this.id].firstName;
    },

    lastName(password) {
      if (!isAuthenticated(password, privateData[this.id].password)) {
        return 'Invalid Password';
      }

      return privateData[this.id].lastName;
    },

    email(password) {
      if (!isAuthenticated(password, privateData[this.id].password)) {
        return 'Invalid Password';
      }

      return privateData[this.id].email;
    },

  };
}();

let fooBar = Object.create(Account).init('foo@bar.com', '123456', 'foo', 'bar');
console.log(fooBar.firstName);                     // returns the firstName function
console.log(fooBar.email);                         // returns the email function
console.log(fooBar.firstName('123456'));           // logs 'foo'
console.log(fooBar.firstName('abc'));              // logs 'Invalid Password'
console.log(fooBar.displayName);                   // logs 16 character sequence
console.log(fooBar.resetPassword('123', 'abc'))    // logs 'Invalid Password';
console.log(fooBar.resetPassword('123456', 'abc')) // logs true

let displayName = fooBar.displayName;
console.log(fooBar.reanonymize('abc'));                         // returns true
console.log(displayName === fooBar.displayName);   // logs false

let bazQux = Object.create(Account).init('baz@qux.com', '123456', 'baz', 'qux');
console.log(fooBar.displayName);
console.log(bazQux.displayName);
console.log(fooBar.firstName('abc'));              // foo
console.log(bazQux.firstName('123456'));              // foo
console.log(fooBar.email('abc'));                  // foo@bar.com

console.log(fooBar.id); // 1
console.log(bazQux.id); // 2

