const fs = require("fs");
const NoteService = require("../noteService");
// const path = require("path");
// const file = __dirname + path.sep + "test.json";

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

  test("Can initialize new note", () => {
    return this.noteService.list().then((notes) => expect(notes).toEqual({}));
  });

  test("Can initialize new user", () => {
    return this.noteService.list("Nathan").then((notes) => {
      expect(notes).toEqual([]);
    });
  });

  test("Add note functionality", () => {
    return this.noteService
      .add("Nathan", "note 1")
      .then(() => this.noteService.read())
      .then((notes) => {
        expect(notes).toEqual({ Nathan: ["note 1"] });
      });
  });

  test("Update note functionality", () => {
    return this.noteService
      .add("Nathan1", "note 1")
      .then(() => this.noteService.update("Nathan1", 0, "Updated Note"))
      .then(() => this.noteService.read())
      .then((notes) => {
        expect(notes).toEqual({ Nathan1: ["Updated Note"] });
      });
  });

  test("Delete note functionality", () => {
    return this.noteService
      .add("Nathan1", "note 1")
      .then(() => this.noteService.remove("Nathan1", 0))
      .then(() => this.noteService.read())
      .then((notes) => {
        expect(notes).toEqual({ Nathan1: [] });
      });
  });

  test("Throw error when trying to update non-existing user", () => {
    return this.noteService
      .add("Nathan1", "note 1")
      .then(() => this.noteService.update("NotNathan", 0, "Updated Note"))
      .catch((err) => {
        expect(err).toEqual(new Error("Unable to update, user not found"));
      });
  });

  test("Throw error when trying to remove note from non-existing user", () => {
    return this.noteService
      .add("Nathan1", "note 1")
      .then(() => this.noteService.remove("NotNathan", 0))
      .catch((err) => {
        expect(err).toEqual(new Error("Unable to remove, user not found"));
      });
  });

  test("Throw error when trying to update non-existing note", () => {
    return this.noteService
      .add("Nathan1", "note 1")
      .then(() => this.noteService.update("Nathan1", 9, "No"))
      .catch((err) => {
        expect(err).toEqual(new Error("Can't update non-existent note"));
      });
  });
});

describe("Note Service without a proper file", () => {
  beforeEach(() => {
    this.noteService = new NoteService("");
  });

  test("Throw error on read", (done) => {
    return this.noteService.list().catch((err) => {
      expect(err.message).toEqual(`ENOENT: no such file or directory, open ''`);
      done();
    });
  });

  test("Without proper file, throw error on adding", (done) => {
    return this.noteService.add("Nathan", "Note 1").catch((err) => {
      expect(err.message).toEqual(`ENOENT: no such file or directory, open ''`);
      done();
    });
  });

  test("Without proper file, throw error on updating", (done) => {
    return this.noteService.update("Nathan", 0, "Note 1").catch((err) => {
      expect(err.message).toEqual(`ENOENT: no such file or directory, open ''`);
      done();
    });
  });

  test("Without proper file, throw error on removing", (done) => {
    return this.noteService.update("Nathan", 0).catch((err) => {
      expect(err.message).toEqual(`ENOENT: no such file or directory, open ''`);
      done();
    });
  });
});
