require("dotenv").config();

module.exports = class NoteService {
  constructor(knex) {
    this.knex = knex;
  }
  //SQL list
  listall() {
    return this.knex("notetable")
      .select("id", "user_id", "noterow")
      .orderBy("id")
      .then((data) => {
        return data;
      })
      .catch((err) => console.error(err));
  }

  listid(user) {
    return this.knex
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
    return this.knex("usertable")
      .whereRaw("username = ?", [user])
      .select("id")
      .then((data) => {
        let userid = data[0].id;
        if (userid) {
          return this.knex("notetable").insert([
            { user_id: userid, noterow: note },
          ]);
        } else {
          throw new Error("Cannot add note from non-existent user");
        }
      });
  }

  //SQL update
  update(noteid, note) {
    return this.knex("notetable")
      .where({ id: noteid })
      .update({ noterow: note })
      .catch((err) => console.error(err));
  }

  remove(noteid) {
    return this.knex("notetable")
      .where({ id: noteid })
      .del()
      .catch((err) => console.error(err));
  }
};
