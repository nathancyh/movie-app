require("dotenv").config();

// Knex Setup
const knexConfig = require("../knexfile").development;
const knex = require("knex")(knexConfig);
const NoteService = require("../noteService");

//Before Each
describe("Note Service should handle files properly", () => {
  beforeEach((done) => {
    this.noteService = new NoteService(knex);
    knex("notetable")
      .del()
      .then(() => {
        done();
      });
  });

  test("Add note functionality", () => {
    return this.noteService
      .add(1, "jest note1")
      .then(() => this.noteService.list(1))
      .then((notes) => {
        expect(notes[0].user_id).toEqual(1);
        expect(notes[0].username).toEqual("Admin");
        expect(notes[0].noterow).toEqual("jest note1");
      });
  });

  test("Update note functionality", () => {
    return this.noteService
      .add(1, "jest note1")
      .then(() => this.noteService.list(1))
      .then((data) => this.noteService.update(data[0].id, "jest updatenote"))
      .then(() => this.noteService.list(1))
      .then((notes) => {
        expect(notes[0].user_id).toEqual(1);
        expect(notes[0].username).toEqual("Admin");
        expect(notes[0].noterow).toEqual("jest updatenote");
      });
  });

  test("Delete note functionality", () => {
    return this.noteService
      .add(1, "jest note1")
      .then(() => this.noteService.add(1, "jest note2"))
      .then(() => this.noteService.list(1))
      .then((data) => this.noteService.remove(data[0].id))
      .then(() => this.noteService.list(1))
      .then((notes) => {
        expect(notes[0].user_id).toEqual(1);
        expect(notes[0].username).toEqual("Admin");
        expect(notes[0].noterow).toEqual("jest note2");
      });
  });
});

afterAll(() => {
  return knex.destroy();
});
