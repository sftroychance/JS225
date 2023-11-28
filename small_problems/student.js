// Create an object factory for a student object. The student object should have
// the following methods and it should produce the expected results demonstrated
// in the sample code:

// info: Logs the name and year of the student.

// addCourse: Enrolls student in a course. A course is an object literal that
// has properties for its name and code.

// listCourses: Returns a list of the courses student has enrolled in.

// addNote: Adds a note property to a course. Takes a code and a note as an
// argument. If a note already exists, the note is appended to the existing one.

// updateNote: Updates a note for a course. Updating a note replaces the
// existing note with the new note.

// viewNotes: Logs the notes for all the courses. Courses without notes are not
// displayed.

function createStudent(name, year) {
  return {
    name,
    year,
    courses: [],

    _findCourse(targetCode) {
      return this.courses.filter(({code}) => code === targetCode)[0];
    },

    info() {
      console.log(`${this.name} is a ${this.year} year student.`);
    },

    addCourse(newCourse) {
      const {code} = newCourse;

      if (!this._findCourse(code)) {
        this.courses.push(newCourse);
      } else {
        console.log(`Course with code ${code} already exists.`);
      }
    },

    listCourses() {
      return this.courses;
    },

    addNote(targetCode, newNote) {
      const currentCourse = this._findCourse(targetCode);

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
      const currentCourse = this._findCourse(targetCode);

      if (!currentCourse) {
        console.log(`There is no course with code ${targetCode}!`);
        return;
      }

      currentCourse.note = newNote;
    },
  };
}

const foo = createStudent('Foo', '1st');
foo.info();
// "Foo is a 1st year student"
console.log(foo.listCourses());
// [];
foo.addCourse({name: 'Math', code: 101});
foo.addCourse({name: 'Advanced Math', code: 102});
console.log(foo.listCourses());
// [{ name: 'Math', code: 101 }, { name: 'Advanced Math', code: 102 }]
foo.addNote(101, 'Fun course');
foo.addNote(101, 'Remember to study for algebra');
foo.addNote(103, 'Will not add'); // error message
foo.viewNotes();
// "Math: Fun course; Remember to study for algebra"
foo.addNote(102, 'Difficult subject');
foo.viewNotes();
// "Math: Fun course; Remember to study for algebra"
// "Advance Math: Difficult subject"
foo.updateNote(101, 'Fun course');
foo.viewNotes();
// "Math: Fun course"
// "Advanced Math: Difficult subject"
foo.updateNote(103, 'Nonexistent course'); // error message
foo.addCourse({name: 'Algebra', code: 101});
