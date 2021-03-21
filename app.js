require("dotenv").config();

// Knex Setup
// const knexConfig = require("./knexfile").development;
// const knex = require("knex")(knexConfig);

const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const session = require("express-session");
const setupPassport = require("./passport-js/passport");
const port = process.env.PORT || 8080;

const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

const movieRouter = require("./routers/movieRouter")(express);
const viewRouter = require("./routers/viewRouter")(express);
const searchRouter = require("./routers/searchRouter")(express);

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    helpers: require("./config/handlebars-helpers"),
  })
);
app.set("view engine", "handlebars");

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Passport.js setup & init
setupPassport(app);
app.use("/", viewRouter); //Passport.js route

//Serve Main Page
app.get("/", function (req, res) {
  // router.get("/", isLoggedIn, function (req, res) {
  console.log("GET MAIN");
  // getUserName(req.session.passport.user)
  //   .then(() => noteService.list(req.session.passport.user))
  // .then((noteArr) => {
  console.log(req.path);
  res.render("index");
  // {
  //     currentuser: "Julie",
  //     array: noteArr,
  //   });
  // })
  // .catch((err) => res.status(500).json(err));
});

//Routers
// app.use("/", indexRoute); //TODO:
app.use("/search", searchRouter);
app.use("/movie", movieRouter);

//Check if the user is authenticated
// function isLoggedIn(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect("/login");
// }

//Temp. root route
// app.get("/", (req, res) => {
//   res.send("kim is smart!");
// });

app.listen(port, () => {
  console.log(`App is listening to port ${port}`);
});

module.exports.app = app;
