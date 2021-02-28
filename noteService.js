const fs = require("fs");

const knex = require("knex")({
  client: "postgresql",
  connection: {
    database: "noteapp",
    user: "postgres",
    password: "postgres",
  },
});

module.exports = class NoteService {
  //SQL list
  listnote(user) {
    let outputArr = [];
    return knex("notetable")
      .whereRaw("username = ?", [user])
      .select("noterow")
      .orderBy("id")
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          outputArr.push(data[i].noterow);
        }
        return outputArr;
      })
      .catch((err) => console.error(err));
  }

  listid(user) {
    return knex("notetable")
      .whereRaw("username = ?", [user])
      .select("id", "noterow")
      .orderBy("id")
      .then((data) => {
        return data;
      })
      .catch((err) => console.error(err));
  }

  //SQL add
  add(user, note) {
    return knex("notetable")
      .insert([{ username: user, noterow: note }])
      .catch((err) => console.error(err));
  }

  //SQL update
  update(user, index, note) {
    return this.listid(user).then((data) => {
      return knex("notetable")
        .where({ id: data[index].id })
        .andWhere({ username: user })
        .update({ noterow: note })
        .catch((err) => console.error(err));
    });
  }

  //TODO:
  // "Unable to update, user not found"
  // "Can't update non-existent note"

  remove(user, index) {
    return this.listid(user).then((data) => {
      return (
        knex("notetable")
          .where({ id: data[index].id })
          .andWhere({ username: user })
          .del()
          // .then((data) => console.log(data))
          .catch((err) => console.error(err))
      );
    });
  }

  // TODO:
  // "Unable to remove, user not found"
  // "Can't remove non-existent note"
};
