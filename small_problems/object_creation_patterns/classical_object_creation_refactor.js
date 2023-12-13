// refactor of pseudoclassical pattern to class pattern

class Person {
  constructor(first, last, age, gender) {
    this.firstName = first;
    this.lastName = last;
    this.age = age;
    this.gender = gender;
  }

  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  communicate() {
    console.log('I am communcating!');
  }

  eat() {
    console.log('I am eating!');
  }

  sleep() {
    console.log('I am sleeping');
  }
}

class Doctor extends Person {
  constructor(first, last, age, gender, specialization) {
    super(first, last, age, gender);
    this.specialization = specialization;
  }

  diagnose() {
    console.log('You just have a cold!');
  }
}

class Professor extends Person {
  constructor(first, last, age, gender, subject) {
    super(first, last, age, gender);
    this.subject = subject;
  }

  teach() {
    console.log('I am teaching you something!');
  }
}

class Student extends Person {
  constructor(first, last, age, gender, degree) {
    super(first, last, age, gender);
    this.degree = degree;
  }

  study() {
    console.log('I am studying!');
  }
}

class GraduateStudent extends Student {
  constructor(first, last, age, gender, degree, graduateDegree) {
    super(first, last, age, gender, degree);
    this.graduateDegree = graduateDegree;
  }

  research() {
    console.log('I am researching!');
  }
}

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
