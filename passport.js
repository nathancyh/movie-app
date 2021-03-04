const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("./bcrypt");

//Knex setup
const knexConfig = require("./knexfile").development;
const knex = require("knex")(knexConfig);

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    "local-signup",
    new LocalStrategy(async (email, password, done) => {
      try {
        let users = await knex("usertable").where({ username: username });
        if (users.length > 0) {
          return done(null, false, { message: "User name already taken" });
        }
        let hash = await bcrypt.hashPassword(password);
        const newUser = {
          email: email,
          password: hash,
        };
        let userId = await knex("usertable").insert(newUser).returning("id");
        newUser.id = userId[0];
        done(null, newUser);
      } catch (err) {
        done(err);
      }
    })
  );

  passport.use(
    "local-login",
    new LocalStrategy(async (username, password, done) => {
      try {
        let users = await knex("usertable").where({ username: username });
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

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    let users = await knex("usertable").where({ id: id });
    if (users.length == 0) {
      return done(new Error(`Wrong user id ${id}`));
    }
    let user = users[0];
    return done(null, user);
  });
};
