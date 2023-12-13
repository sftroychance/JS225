// Create a school object. The school object uses the same kind of student
// object as the previous exercise. It has methods that use and update
// information about the student. Be sure to check out the previous exercise for
// the other arguments that might be needed by the school object. Implement the
// following methods for the school object:

// addStudent: Adds a student by creating a new student and adding the student
// to a collection of students. The method adds a constraint that the year can
// only be any of the following values: '1st', '2nd', '3rd', '4th', or '5th'.
// Returns a student object if year is valid otherwise it logs "Invalid Year".

// enrollStudent: Enrolls a student in a course.
// note: this should call the student addCourse() method

// addGrade: Adds the grade of a student for a course.
// note: addGrade should call a student addGrade() method

// getReportCard: Logs the grades of a student for all courses. If the course
// has no grade, it uses "In progress" as the grade.
// note: getReportCard should call a student getReportCard() method

// courseReport: Logs the grades of all students for a given course name. Only
// student with grades are part of the course report.

function createStudent(name, year) {
  return {
    name,
    year,
    courses: [],

    _findCourseByCode(targetCode) {
      return this.courses.filter(({code}) => code === targetCode)[0];
    },

    findCourseByName(targetName) {
      return this.courses.filter(({name}) => name === targetName)[0];
    },

    info() {
      console.log(`${this.name} is a ${this.year} year student.`);
    },

    addCourse(newCourse) {
      const {code} = newCourse;

      if (!this._findCourseByCode(code)) {
        this.courses.push(newCourse);
      } else {
        console.log(`Course with code ${code} already exists.`);
      }
    },

    listCourses() {
      return this.courses;
    },

    addNote(targetCode, newNote) {
      const currentCourse = this._findCourseByCode(targetCode);

      if (!currentCourse) {
        console.log(`There is no course with code ${targetCode}`);
        return;
      }

      if ('note' in currentCourse) {
        currentCourse.note += `; ${newNote}`;
      } else {
        currentCourse.note = newNote;
      }
    },

    viewNotes() {
      this.courses.forEach(({name, note}) => {
        if (note) console.log(`${name}: ${note}`);
      });
    },

    updateNote(targetCode, newNote) {
      const currentCourse = this._findCourseByCode(targetCode);

      if (!currentCourse) {
        console.log(`There is no course with code ${targetCode}!`);
        return;
      }

      currentCourse.note = newNote;
    },

    addGrade(courseName, grade) {
      const currentCourse = this.findCourseByName(courseName);

      if (!currentCourse) {
        console.log(`There is no course with name ${courseName}`);
        return;
      }

      currentCourse.grade = grade;
    },

    getCourseGrade(courseName) {
      return this.findCourseByName(courseName)?.grade;
    },

    logReportCard() {
      this.courses.forEach(({name, grade}) => {
        console.log(`${name}: ${grade ?? 'In Progress'}`);
      });
    },
  };
}

const school = {
  valid_years: ['1st', '2nd', '3rd', '4th', '5th'],
  students: [],

  addStudent(name, year) {
    if (this.valid_years.includes(year)) {
      const newStudent = createStudent(name, year);
      this.students.push(newStudent);
      return newStudent;
    } else {
      console.log('Invalid year');
    }
  },

  enrollStudent(student, course) {
    student.addCourse(course);
  },

  addGrade(student, courseName, grade) {
    student.addGrade(courseName, grade);
  },

  getReportCard(student) {
    student.logReportCard();
  },

  courseReport(courseName) {
    const courseStudents = this.students
        .reduce((arr, student) => {
          const grade = student.getCourseGrade(courseName);

          if (grade) arr.push({name: student.name, grade});
          return arr;
        }, []);

    if (courseStudents.length > 0) {
      const avg = courseStudents
          .map(({grade}) => grade)
          .reduce((sum, val) => sum + val, 0) / courseStudents.length;

      console.log(`=${courseName} Grades=`);
      courseStudents.forEach(({name, grade}) => {
        console.log(`${name}: ${grade}`);
      });
      console.log('---');
      console.log(`Course average: ${Math.round(avg)}\n`);
    }
  },
};

const foo = school.addStudent('foo', '3rd');
school.enrollStudent(foo, {name: 'Math', code: 101});
school.enrollStudent(foo, {name: 'Advanced Math', code: 102});
school.enrollStudent(foo, {name: 'Physics', code: 202});
school.addGrade(foo, 'Math', 95);
school.addGrade(foo, 'Advanced Math', 90);

const bar = school.addStudent('bar', '1st');
school.enrollStudent(bar, {name: 'Math', code: 101});
school.addGrade(bar, 'Math', 91);
school.addGrade(bar, 'Chemistry', 100);
// 'There is no course with the name Chemistry'

const qux = school.addStudent('qux', '2nd');
school.enrollStudent(qux, {name: 'Math', code: 101});
school.enrollStudent(qux, {name: 'Advanced Math', code: 102});
school.addGrade(qux, 'Math', 93);
school.addGrade(qux, 'Advanced Math', 90);

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
