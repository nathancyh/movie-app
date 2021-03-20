const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("./bcrypt");

//Knex setup
const knexConfig = require("../knexfile").development;
const knex = require("knex")(knexConfig);

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  //Generate hased pw when user first signup
  passport.use(
    "local-signup",
    new LocalStrategy(async (username, password, done) => {
      try {
        let users = await knex("users").where({ name: username });
        if (users.length > 0) {
          return done(null, false, { message: "Username already taken" });
        }
        let hash = await bcrypt.hashPassword(password);
        const newUser = {
          name: username,
          password: hash,
        };
        let userId = await knex("users").insert(newUser).returning("id");
        newUser.id = userId[0];
        done(null, newUser);
      } catch (err) {
        done(err);
      }
    })
  );

  //Compare hased pw when user tries to login
  passport.use(
    "local-login",
    new LocalStrategy(async (username, password, done) => {
      try {
        let users = await knex("users").where({ name: username });
        if (users.length == 0) {
          return done(null, false, { message: "Incorrect credentials." });
        }
        let user = users[0];
        let result = await bcrypt.checkPassword(password, user.password);
        if (result) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect credentials." });
        }
      } catch (err) {
        return done(err);
      }
    })
  );

  //Store userinfo into a session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  //Set req.session.passport.user
  passport.deserializeUser(async (id, done) => {
    let users = await knex("users").where({ id: id });
    if (users.length == 0) {
      return done(new Error(`Wrong user id ${id}`));
    }
    let user = users[0];
    return done(null, user);
  });
};
