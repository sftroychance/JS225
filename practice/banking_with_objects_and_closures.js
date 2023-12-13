// In this assignment, we'll build a small banking application and look at how
// we can use closures to control access to the application's data. We'll
// proceed through this assignment using some example code and then you will
// write code that satisfies it.

// (1)
// Create an object named account that represents a bank account. It should
// contain a balance property that stores the account's current balance.

let account = {
  balance: 0,
};

// (2)
// Add a deposit method to the account object that takes a single argument, the
// value of the deposit. The deposit method adds the value of the argument
// passed to it to the account's balance, and then returns the deposit amount.
account.deposit = function(amount) {
  this.balance += amount;
  return amount;
}

console.log(account.balance); // 0
console.log(account.deposit(12)); // 12
console.log(account.balance); // 12
console.log(account.deposit(10)); // 10
console.log(account.balance); // 22

// (3)
// Add a withdraw method to the account object that takes a single argument, the
// amount to withdraw. It should subtract the amount from the account's balance
// and return the amount subtracted.

// If the account contains less than the withdrawal amount, the method should
// limit the withdrawal to the amount available, and return the actual amount
// withdrawn. This should leave the account with a balance of 0.

account.withdraw = function(amount) {
  let withdrawn = 0;

  if (this.balance - amount < 0) {
    withdrawn = this.balance;
    this.balance = 0;
  } else {
    this.balance -= amount;
    withdrawn = amount;
  }

  return withdrawn;
}

account.balance = 100;
console.log(account.balance); // 100
console.log(account.withdraw(19)); // 19
console.log(account.balance); // 81
console.log(account.withdraw(91)); // 81
console.log(account.balance); // 0

// (4)
// Each account should have a record of every deposit and withdrawal applied to
// it. To do this, add a property named transactions to account that contains an
// array of transactions, each of which is an object with type and amount
// properties.

// redefine full object since we have to modify methods:
account = {
  balance: 0,
  transactions: [],

  deposit(amount) {
    this.balance += amount;
    this.transactions.push({type: 'deposit', amount});
    return amount;
  },

  withdraw(amount) {
    if (amount > this.balance) {
      amount = this.balance;
    }

    this.balance -= amount;

    this.transactions.push({type: 'withdrawal', amount});

    return amount;
  },
};

console.log(account.deposit(23)); // 23
console.log(account.transactions); // [{...}]
console.log(account.transactions[0]); // {type: "deposit", amount: 23

// (5)
// We want to create more than one account. Move the account creation code to a
// function named makeAccount that returns a new account object.

function makeAccount() {
    return {
      balance: 0,
      transactions: [],

      deposit(amount) {
        this.balance += amount;
        this.transactions.push({type: 'deposit', amount});
        return amount;
      },

      withdraw(amount) {
        if (amount > this.balance) {
          amount = this.balance;
        }

        this.balance -= amount;

        this.transactions.push({type: 'withdrawal', amount});

        return amount;
      },
    };
}

account = makeAccount();
console.log(account.deposit(15)); // 15
console.log(account.balance); // 15
let otherAccount = makeAccount();
console.log(otherAccount.balance); // 0

// (6)
// We also need an object to manage accounts: a bank. Create a function that
// returns an object that represents a bank. The bank should have a property
// named accounts that represents a list of accounts.

function makeBank() {
  return {
    accounts: [],
  };
}


let bank = makeBank();
console.log(bank.accounts); // []

// (7)
// Add a new method named openAccount to the object returned by makeBank. It
// should create a new account, add it to the bank's accounts collection, and
// return the new account. Each new account should have a unique account number,
// starting at 101; each account number should be one greater than the previous
// account created.

// makeAccount redefined
function makeAccount(number) {
  return {
    number,
    balance: 0,
    transactions: [],

    deposit(amount) {
      this.balance += amount;
      this.transactions.push({type: 'deposit', amount});
      return amount;
    },

    withdraw(amount) {
      if (amount > this.balance) {
        amount = this.balance;
      }

      this.balance -= amount;

      this.transactions.push({type: 'withdrawal', amount});

      return amount;
    },
  };
}

// makeBank redefined
function makeBank() {
  let nextAccountNumber = 101;

  return {
    accounts: [],

    openAccount() {
      const newAccount = makeAccount(nextAccountNumber);

      this.accounts.push(newAccount);
      nextAccountNumber += 1;

      return newAccount;
    }
  };
}

bank = makeBank();
account = bank.openAccount();
console.log(account.number); // 101
console.log(bank.accounts); // [{...}]
console.log(bank.accounts[0]);
// {
//  number: 101,
//  balance: 0,
//  transactions: [],
//  deposit: [Function: deposit],
//  withdraw: [Function: withdraw]
// }
let secondAccount = bank.openAccount();
console.log(secondAccount.number); // 102

// (8)
// Add a new method to the bank object that transfers money from one account to
// another.

// makeBank redefined
function makeBank() {
  let nextAccountNumber = 101;

  return {
    accounts: [],

    openAccount() {
      const newAccount = makeAccount(nextAccountNumber);

      this.accounts.push(newAccount);
      nextAccountNumber += 1;

      return newAccount;
    },

    transfer(source, destination, amount) {
      if (source.balance >= amount) {
        source.withdraw(amount);
        destination.deposit(amount);
        return amount;
      }
    }
  };
}

bank = makeBank();
let source = bank.openAccount();
console.log(source.deposit(10)); // 10
let destination = bank.openAccount();
console.log(bank.transfer(source, destination, 7)); // 7
console.log(source.balance); // 3
console.log(destination.balance); // 7

// (9)
// Change the code so that users can access the account balance, account number,
// and transactions list by calling methods, but not by directly accessing those
// properties.

// makeAccount redefined
function makeAccount(number) {
  let _balance = 0;
  let _number = number;
  const _transactions = [];

  return {
    deposit(amount) {
      _balance += amount;
      _transactions.push({type: 'deposit', amount});
      return amount;
    },

    withdraw(amount) {
      if (amount > _balance) {
        amount = _balance;
      }

      _balance -= amount;

      _transactions.push({type: 'withdrawal', amount});

      return amount;
    },

    number() {
      return _number;
    },

    balance() {
      return _balance;
    },

    transactions() {
      return _transactions;
    }

  };
}

bank = makeBank();
account = bank.openAccount();
console.log(account.balance()); // 0
console.log(account.deposit(17)); // 17
secondAccount = bank.openAccount();
console.log(secondAccount.number()); // 102
console.log(account.transactions()); // [{...}]

// makeBank redefined
function makeBank() {
  let nextAccountNumber = 101;

  return {
    accounts: [],

    openAccount() {
      const newAccount = makeAccount(nextAccountNumber);

      this.accounts.push(newAccount);
      nextAccountNumber += 1;

      return newAccount;
    }
  };
}

// (10)
// Change the code so that users can no longer access the list of accounts.

function makeBank() {
  let nextAccountNumber = 101;
  const accounts = [];

  return {
    openAccount() {
      const newAccount = makeAccount(nextAccountNumber);

      accounts.push(newAccount);
      nextAccountNumber += 1;

      return newAccount;
    }
  };
}

bank = makeBank();
console.log(bank.accounts); // undefined

// final code for functions
function makeAccount(number) {
  let _balance = 0;
  let _number = number;
  const _transactions = [];

  return {
    deposit(amount) {
      _balance += amount;
      _transactions.push({type: 'deposit', amount});
      return amount;
    },

    withdraw(amount) {
      if (amount > _balance) {
        amount = _balance;
      }

      _balance -= amount;

      _transactions.push({type: 'withdrawal', amount});

      return amount;
    },

    number() {
      return _number;
    },

    balance() {
      return _balance;
    },

    transactions() {
      return _transactions;
    }

  };
}

function makeBank() {
  let nextAccountNumber = 101;
  const accounts = [];

  return {
    openAccount() {
      const newAccount = makeAccount(nextAccountNumber);

      accounts.push(newAccount);
      nextAccountNumber += 1;

      return newAccount;
    },

    transfer(source, destination, amount) {
      if (source.balance >= amount) {
        source.withdraw(amount);
        destination.deposit(amount);
        return amount;
      }
    }
  };
}
