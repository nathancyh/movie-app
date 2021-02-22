const fs = require("fs");

module.exports = class NoteService {
  constructor(file) {
    this.file = file;
    this.initPromise = null;
    this.init();
  }

  init() {
    if (this.initPromise === null) {
      this.initPromise = new Promise((resolve, reject) => {
        this.read()
          .then(() => {
            resolve();
          })
          .catch(() => {
            this.notes = {};
            this.write().then(resolve).catch(reject);
          });
      });
    }
    return this.initPromise;
  }

  read() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.file, "utf-8", (err, data) => {
        if (err) {
          reject(err);
        }
        try {
          this.notes = JSON.parse(data);
        } catch (e) {
          return reject(e);
        }
        return resolve(this.notes);
      });
    });
  }

  write() {
    return new Promise((resolve, reject) => {
      fs.writeFile(this.file, JSON.stringify(this.notes), (err) => {
        if (err) {
          return reject(err);
        }
        return resolve(this.notes);
      });
    });
  }

  list(user) {
    if (typeof user !== "undefined") {
      return this.init()
        .then(() => {
          return this.read();
        })
        .then(() => {
          if ((typeof this, this.notes[user] === "undefined")) {
            return [];
          } else {
            return this.notes[user];
          }
        });
    } else {
      return this.init().then(() => {
        return this.read();
      });
    }
  }

  add(user, note) {
    return this.init().then(() => {
      if (typeof this.notes[user] === "undefined") {
        this.notes[user] = [];
      }
      this.notes[user].push(note);
      return this.write();
    });
  }

  update(user, index, note) {
    //'note' = imcoming data
    return this.init().then(() => {
      if (typeof this.notes[user] === "undefined") {
        throw new Error("Can't update, user not found");
      }
      if (this.notes[user].length <= index) {
        throw new Error("Can't update non-existent note");
      }
      this.notes[user][index] = note;
      return this.write();
    });
  }

  remove(user, index) {
    return this.init().then(() => {
      if (typeof this.notes[user] === "undefined") {
        throw new Error("Can't remove, user not found");
      }
      if (this.notes[user].length <= index) {
        throw new Error("Can't remove non-existent note");
      }
      return this.read().then(() => {
        this.notes[user].splice(index, 1);
        return this.write();
      });
    });
  }
};
