require("dotenv").config();

const knex = require("knex")({
  client: "postgresql",
  connection: {
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
});

module.exports = class NoteService {
  //SQL list
  listall() {
    return knex("notetable")
      .select("id", "user_id", "noterow")
      .orderBy("id")
      .then((data) => {
        return data;
      })
      .catch((err) => console.error(err));
  }

  listid(user) {
    return knex
      .select(
        "notetable.user_id",
        "usertable.username",
        "notetable.id",
        "notetable.noterow"
      )
      .from("notetable")
      .innerJoin("usertable", "notetable.user_id", "usertable.id")
      .where("usertable.username", user)
      .orderBy("notetable.id")
      .then((joineddata) => {
        return joineddata;
      });
  }

  //SQL add
  add(user, note) {
    return knex("usertable")
      .whereRaw("username = ?", [user])
      .select("id")
      .then((data) => {
        let userid = data[0].id;
        return knex("notetable")
          .insert([{ user_id: userid, noterow: note }])
          .catch((err) => console.error(err));
      });
  }

  //SQL update
  update(noteid, note) {
    return knex("notetable")
      .where({ id: noteid })
      .update({ noterow: note })
      .catch((err) => console.error(err));
  }

  //TODO:
  // "Unable to update, user not found"
  // "Can't update non-existent note"

  remove(noteid) {
    return knex("notetable")
      .where({ id: noteid })
      .del()
      .catch((err) => console.error(err));
  }

  // TODO:
  // "Unable to remove, user not found"
  // "Can't remove non-existent note"
};

//NOTES:
//fix band-aid delay in script.js & router timer
