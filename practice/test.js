let personPrototype = function() {
  let age;
  let getAge = function() {
    return age;
  };

  let incrementAge = function() {
    age += 1;
  };

  return {
    init(name, passedAge) {
      age = passedAge;
      this.name = name;
      return this;
    },

    haveBirthday() {
      console.log(`Happy Birthday, ${this.name}, you're ${getAge()}!`);
      incrementAge();
    },
  };
}();

let brandi = Object.create(personPrototype).init('Brandi', 28);
// console.log(brandi.getAge());
brandi.haveBirthday(); // Happy Birthday Brandi, you're 28!

let troy = Object.create(personPrototype).init('Troy', 55);
// console.log(brandi.getAge());
troy.haveBirthday(); // Happy Birthday Troy, you're 55!

brandi.haveBirthday(); // Happy Birthday Brandi, you're 28!
