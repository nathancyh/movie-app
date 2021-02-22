var express = require("express");

module.exports = class NoteRouter {
  constructor(noteService) {
    this.noteService = noteService;
  }

  router() {
    let router = express.Router();
    router.get("/", this.get.bind(this));
    router.post("/", this.post.bind(this));
    router.put("/:id", this.put.bind(this));
    router.delete("/:id", this.delete.bind(this));
    return router;
  }

  get(req, res) {
    console.log("GET ROUTE");
    return this.noteService
      .list(req.auth.user)
      .then((notes) => {
        console.log(notes);
        res.json(notes);
      })
      .catch((err) => res.status(500).json(err));
  }

  post(req, res) {
    console.log("POST ROUTE");
    return this.noteService
      .add(req.auth.user, req.body.note)
      .then(() => this.noteService.list(req.auth.user))
      .then((notes) => res.json(notes))
      .catch((err) => res.status(500).json(err));
  }

  put(req, res) {
    console.log("PUT ROUTE");
    return this.noteService
      .update(req.auth.user, req.param.id, req.body.note)
      .then(() => this.noteService.list(req.auth.user))
      .then((notes) => res.json(notes))
      .catch((err) => res.status(500).json(err));
  }

  delete(req, res) {
    console.log("DELETE ROUTE");
    return this.noteService
      .remove(req.auth.user, req.param.id)
      .then(() => this.noteService.list(req.auth.user))
      .then((notes) => res.json(notes))
      .catch((err) => res.status(500).json(err));
  }
};
