const fs = require("fs");
const NoteService = require("../noteService");
const path = require("path");
const { TestScheduler } = require("jest");
const file = __dirname + path.sep + "test.json";

//Before Each
describe("Note Service should handle files properly", () => {
  beforeEach((done) => {
    fs.unlink(file, (err) => {
      if (err) {
        console.log(err);
        this.noteService = new NoteService(file);
      }
      this.noteService = new NoteService(file);
      done();
    });
  });

  test("At first the note should be empty", () => {
    return this.noteService.list().then((notes) => expect(notes).toEqual({}));
  });

  test("At first the note should be empty", () => {
    return this.noteService.list().then((notes) => expect(notes).toEqual({}));
  });
});
