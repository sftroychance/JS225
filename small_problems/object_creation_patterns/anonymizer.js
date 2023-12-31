// Using OLOO create an Account prototype object that anonymizes user objects on
// init. The created object should not have access to the function that
// anonymizes a user other than through the init and reanonymize methods. The
// function that anonymizes creates a 16 character sequence composed of letters
// and numbers. The following are the properties and methods on the Account
// object:

// init: The init method sets the email, password, firstName, lastName, and
// displayName of user. The displayName is a 16 character sequence generated for
// the user. It's used as the display name of a user.

// reanonymize: This method generates a new 16 character sequence and reassigns
// it to the displayName property if the password provided is valid. Returns
// true if successfully re-anonymized. Returns 'Invalid Password' if the
// password provided is not valid.

// resetPassword: This method asks the user for a new password and reassigns it
// to the password property. To reset the password, the user must provide the
// current password. Returns 'Invalid Password' if the password provided is not
// valid. Returns true if the password is successfully reset.

// firstName: This method returns the first name of the user if the password
// provided is valid. Returns 'Invalid Password' if the password provided is not
// valid.

// lastName: This method returns the last name of the user if the password
// provided is valid. Returns 'Invalid Password' if the password provided is not
// valid.

// email: This method returns the email name of the user if the password
// provided is valid. Returns 'Invalid Password' if the password provided is not
// valid.

// displayName: This property returns the displayName — the 16 character
// sequence.

// Other than the above properties, methods, and properties inherited from
// Object.prototype, no other method or property should exist on the object
// returned by the Account prototype object.

// OLOO - create a prototype object with init, define all methods in object
// to privatize data/methods: IIFE that returns the prototype object, uses
// closure to maintain private data/method

// however: this defeats OLOO because with `init` you are returning an
// object containing all the methods, so it's really an object factory
// all the objects carry the full method definitions (not references)

let Account = function generateNewAccount() {
  let userEmail;
  let userPassword;
  let userFirstName;
  let userLastName;

  function anonymize() {
    return (Math.random().toString(36).slice(2) +
      Math.random().toString(36).slice(2)).slice(1, 17);
  }

  function isAuthenticated(enteredPassword) {
    return userPassword === enteredPassword;
  }

  return {
    init(email, password, firstName, lastName) {
      userEmail = email;
      userPassword = password;
      userFirstName = firstName;
      userLastName = lastName;
      this.displayName = anonymize();

      return this;
    },

    reanonymize(password) {
      if (!isAuthenticated(password)) {
        return 'Invalid Password';
      }

      this.displayName = anonymize();
      return true;
    },

    resetPassword(oldPassword, newPassword) {
      if (!isAuthenticated(oldPassword)) {
        return 'Invalid Password';
      }

      userPassword = newPassword;
      return true;
    },

    firstName(password) {
      if (!isAuthenticated(password)) {
        return 'Invalid Password';
      }

      return userFirstName;
    },

    lastName(password) {
      if (!isAuthenticated(password)) {
        return 'Invalid Password';
      }

      return userLastName;
    },

    email(password) {
      if (!isAuthenticated(password)) {
        return 'Invalid Password';
      }

      return userEmail;
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
console.log(fooBar.displayName);
console.log(displayName === fooBar.displayName);   // logs false

let bazQux = Object.create(Account).init('baz@qux.com', '123456', 'baz', 'qux');
console.log(fooBar.displayName);
console.log(bazQux.displayName);
console.log(fooBar.firstName('abc'));              // logs 'Invalid Password'
console.log(fooBar.email('abc'));                  // logs 'Invalid Password'

// console.log(bazQux.firstName('123456'));
console.log(fooBar.firstName('abc'));

// revised solution
let Account = function generateNewAccount() {
  function anonymize() {
    return (Math.random().toString(36).slice(2) +
      Math.random().toString(36).slice(2)).slice(1, 17);
  }

  function isAuthenticated(password, enteredPassword) {
    return password === enteredPassword;
  }

  return {
    init(email, password, firstName, lastName) {
      let displayName = anonymize();

      return {
        displayName,
        reanonymize(enteredPassword) {
          if (!isAuthenticated(password, enteredPassword)) {
            return 'Invalid Password';
          }

          this.displayName = anonymize();
          return true;
        },

        resetPassword(oldPassword, newPassword) {
          if (!isAuthenticated(password, oldPassword)) {
            return 'Invalid Password';
          }

          password = newPassword;
          return true;
        },

        firstName(enteredPassword) {
          if (!isAuthenticated(password, enteredPassword)) {
            return 'Invalid Password';
          }

          return firstName;
        },

        lastName(enteredPassword) {
          if (!isAuthenticated(password, enteredPassword)) {
            return 'Invalid Password';
          }

          return lastName;
        },

        email(enteredPassword) {
          if (!isAuthenticated(password, enteredPassword)) {
            return 'Invalid Password';
          }

          return email;
        },
      };
    },
  };
}();
