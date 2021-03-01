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
  getUserID(user) {
    return knex("usertable")
      .whereRaw("username = ?", [user])
      .select("id")
      .then((data) => data[0].id);
  }

  //SQL list
  listnote(userid) {
    let outputArr = [];
    return knex("notetable")
      .whereRaw("user_id = ?", [userid])
      .select()
      .orderBy("id")
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          outputArr.push(data[i].noterow);
        }
        return outputArr;
      })
      .catch((err) => console.error(err));
  }

  listall() {
    return knex("notetable")
      .select("id", "user_id", "noterow")
      .orderBy("id")
      .then((data) => {
        return data;
      })
      .catch((err) => console.error(err));
  }

  listid(userid) {
    return knex("notetable")
      .whereRaw("user_id = ?", [userid])
      .select("id", "noterow")
      .orderBy("id")
      .then((data) => {
        return data;
      })
      .catch((err) => console.error(err));
  }

  //SQL add
  add(userid, note) {
    return knex("notetable")
      .insert([{ user_id: userid, noterow: note }])
      .catch((err) => console.error(err));
  }

  // TODO:
  //Delay response? FIXME:
  // reject empty notes

  //SQL update
  update(userid, index, note) {
    return this.listid(userid).then((data) => {
      return knex("notetable")
        .where({ id: data[index].id })
        .andWhere({ user_id: userid })
        .update({ noterow: note })
        .catch((err) => console.error(err));
    });
  }

  //TODO:
  // "Unable to update, user not found"
  // "Can't update non-existent note"

  remove(userid, index) {
    return this.listid(userid).then((data) => {
      return knex("notetable")
        .where({ id: data[index].id })
        .andWhere({ user_id: userid })
        .del()
        .catch((err) => console.error(err));
    });
  }

  // TODO:
  // "Unable to remove, user not found"
  // "Can't remove non-existent note"
};

//NOTES:
//fix band-aid delay in script.js & router timer
