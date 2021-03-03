module.exports = class NoteService {
  constructor(knex) {
    this.knex = knex;
  }

  list(userid) {
    return (
      this.knex
        .select(
          "notetable.user_id",
          "usertable.username",
          "notetable.id",
          "notetable.noterow"
        )
        .from("notetable")
        .innerJoin("usertable", "notetable.user_id", "usertable.id")
        // .where("usertable.username", user)
        .where("usertable.id", userid)
        .orderBy("notetable.id")
        .then((joineddata) => {
          return joineddata;
        })
    );
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

  //SQL add
  add(userid, note) {
    if (userid) {
      return this.knex("notetable").insert([
        { user_id: userid, noterow: note },
      ]);
    } else {
      throw new Error("Cannot add note from non-existent user");
    }
    // });
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
