// In an earlier exercise, we created a school object. It works, however, it can
// still be improved. The following are improvements for you to implement in the
// solution provided:

// Make the list students private. Right now, anyone can gain access to it and
// manipulate it.

// Make the constraint for allowed values for years a private variable. As a
// private variable it avoids an unnecessary statement in the addStudent method
// and at the same time makes the code more declarative.

// Make the getCourse function accessible in the addGrade method also. As it is,
// only the courseReport method has access.

// Note: My implementation for 'school' was slightly different, so the revisions
// don't all make sense for it; here, modifying the official solution for the
// original school problem

function createStudent(name, year) {
  return {
    name,
    year,
    courses: [],
    info() {
      console.log(`${this.name} is a ${this.year} year student`);
    },

    listCourses() {
      return this.courses;
    },

    addCourse(course) {
      this.courses.push(course);
    },

    addNote(courseCode, note) {
      const course = this.courses.filter(({code}) => code === courseCode)[0];

      if (course) {
        if (course.note) {
          course.note += `; ${note}`;
        } else {
          course.note = note;
        }
      }

    },

    viewNotes() {
      this.courses.forEach(course => {
        if (course.note) {
          console.log(`${course.name}: ${course.note}`);
        }
      });
    },

    updateNote(courseCode, note) {
      const course = this.courses.filter(({code}) => code === courseCode)[0];

      if (course) {
        course.note = note;
      }
    },
  };
}

const school = function() {
  const students = [];
  const validYears = ['1st', '2nd', '3rd', '4th', '5th'];

  function _getCourse(student, courseName) {
    return student.listCourses().filter(({name}) => name === courseName)[0];
  }

  function _validYear(year) {
    return validYears.includes(year);
  }

  return {
    addStudent(name, year) {
      if (_validYear(year)) {
        const student = createStudent(name, year);
        students.push(student);
        return student;
      } else {
        console.log('Invalid Year');
      }
    },

    enrollStudent(student, courseName, courseCode) {
      student.addCourse({name: courseName, code: courseCode});
    },

    addGrade(student, courseName, grade) {
      const course = _getCourse(student, courseName);

      if (course) {
        course.grade = grade;
      }
    },

    getReportCard(student) {
      student.listCourses().forEach(({grade, name}) => {
        if (grade) {
          console.log(`${name}: ${String(grade)}`);
        } else {
          console.log(`${name}: In progress`);
        }
      });
    },

    courseReport(courseName) {
      const courseStudents = students.map(student => {
        const course = _getCourse(student, courseName) || {grade: undefined};
        return {name: student.name, grade: course.grade};
      }).filter(({grade}) => grade);

      if (courseStudents.length > 0) {
        console.log(`=${courseName} Grades=`);

        const average = courseStudents.reduce((total, {name, grade}) => {
          console.log(`${name}: ${String(grade)}`);
          return total + grade;
        }, 0) / courseStudents.length;

        console.log('---');
        console.log(`Course Average: ${String(average)}`);
      }
    },
  }
}();

const foo = school.addStudent('foo', '3rd');
school.enrollStudent(foo, 'Math', 101);
school.enrollStudent(foo, 'Advanced Math', 102);
school.enrollStudent(foo, 'Physics', 202);
school.addGrade(foo, 'Math', 95);
school.addGrade(foo, 'Advanced Math', 90);

const bar = school.addStudent('bar', '1st');
school.enrollStudent(bar, 'Math', 101);
school.addGrade(bar, 'Math', 91);
school.addGrade(bar, 'Chemistry', 100);
// 'There is no course with the name Chemistry'

const qux = school.addStudent('qux', '2nd');
school.enrollStudent(qux, 'Math', 101);
school.enrollStudent(qux, 'Advanced Math', 102);
school.addGrade(qux, 'Math', 93);
school.addGrade(qux, 'Advanced Math', 90);

school.addStudent('qux', '9th'); // Invalid Year

school.getReportCard(foo);
// = Math: 95
// = Advanced Math: 90
// = Physics: In progress

school.courseReport('Math');
// = =Math Grades=
// = foo: 95
// = bar: 91
// = qux: 93
// = ---
// = Course Average: 93

school.courseReport('Advanced Math');
// = =Advanced Math Grades=
// = foo: 90
// = qux: 90
// = ---
// = Course Average: 90

school.courseReport('Physics');
// = undefined
