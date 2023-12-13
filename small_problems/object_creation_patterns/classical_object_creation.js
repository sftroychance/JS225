// Given a diagram, implement in pseudoclassical pattern

// pseudoclassical: Constructor pattern plus prototypal pattern

function Person(first, last, age, gender) {
  this.firstName = first;
  this.lastName = last;
  this.age = age;
  this.gender = gender;
}

Person.prototype.fullName = function fullName() {
  return `${this.firstName} ${this.lastName}`;
};

Person.prototype.communicate = function communicate() {
  console.log('I am communcating!');
};

Person.prototype.eat = function eat() {
  console.log('I am eating!');
};

Person.prototype.sleep = function sleep() {
  console.log('I am sleeping');
};

function Doctor(first, last, age, gender, specialization) {
  Person.call(this, first, last, age, gender);
  this.specialization = specialization;
}

Doctor.prototype = Object.create(Person.prototype);
Doctor.prototype.constructor = Doctor;

Doctor.prototype.diagnose = function diagnose() {
  console.log('You just have a cold!');
};

function Professor(first, last, age, gender, subject) {
  Person.call(this, first, last, age, gender);
  this.subject = subject;
}

Professor.prototype = Object.create(Person.prototype);
Professor.prototype.constructor = Professor;

Professor.prototype.teach = function teach() {
  console.log('I am teaching you something!');
};

function Student(first, last, age, gender, degree) {
  Person.call(this, first, last, age, gender);
  this.degree = degree;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

Student.prototype.study = function study() {
  console.log('I am studying!');
};

function GraduateStudent(first, last, age, gender, degree, graduateDegree) {
  Student.call(this, first, last, age, gender, degree);
  this.graduateDegree = graduateDegree;
}

GraduateStudent.prototype = Object.create(Student.prototype);
GraduateStudent.prototype.constructor = GraduateStudent;

GraduateStudent.prototype.research = function research() {
  console.log('I am researching!');
};

const person = new Person('foo', 'bar', 21, 'gender');
console.log(person instanceof Person); // logs true
person.eat(); // logs 'Eating'
person.communicate(); // logs 'Communicating'
person.sleep(); // logs 'Sleeping'
console.log(person.fullName()); // logs 'foo bar'

const doctor = new Doctor('foo', 'bar', 21, 'gender', 'Pediatrics');
console.log(doctor instanceof Person); // logs true
console.log(doctor instanceof Doctor); // logs true
doctor.eat(); // logs 'Eating'
doctor.communicate(); // logs 'Communicating'
doctor.sleep(); // logs 'Sleeping'
console.log(doctor.fullName()); // logs 'foo bar'
doctor.diagnose(); // logs 'Diagnosing'

const graduateStudent = new GraduateStudent('foo', 'bar', 21, 'gender',
    'BS Industrial Engineering', 'MS Industrial Engineering');
// logs true for next three statements
console.log(graduateStudent instanceof Person);
console.log(graduateStudent instanceof Student);
console.log(graduateStudent instanceof GraduateStudent);
graduateStudent.eat(); // logs 'Eating'
graduateStudent.communicate(); // logs 'Communicating'
graduateStudent.sleep(); // logs 'Sleeping'
console.log(graduateStudent.fullName()); // logs 'foo bar'
graduateStudent.study(); // logs 'Studying'
graduateStudent.research(); // logs 'Researching'
