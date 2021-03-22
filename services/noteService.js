module.exports = class NoteService {
  constructor(knex) {
    this.knex = knex;
  }

  list(userid) {
    return this.knex
      .select(
        "notetable.user_id",
        "users.username",
        "notetable.id",
        "notetable.noterow"
      )
      .from("notetable")
      .innerJoin("users", "notetable.user_id", "users.id")
      .where("users.id", userid)
      .orderBy("notetable.id")
      .then((joineddata) => {
        if (joineddata.length > 0) {
          return joineddata;
        } else {
          return false;
        }
      });
  }

  listall() {
    return this.knex("notetable")
      .select("id", "user_id", "noterow")
      .orderBy("id")
      .then((data) => {
        return data;
      })
      .catch((err) => console.error(err));
  }

  add(userid, note) {
    if (userid) {
      return this.knex("notetable").insert([
        { user_id: userid, noterow: note },
      ]);
    } else {
      throw new Error("Cannot add note from non-existent user");
    }
  }

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
