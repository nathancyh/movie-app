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
const axios = require("axios");

const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

const movieRouter = require("./routers/movieRouter")(express);
const viewRouter = require("./routers/loginRouter")(express);
const indexRouter = require("./routers/indexRouter")(express);
const searchRouter = require("./routers/searchRouter")(express);
const profileRouter = require("./routers/profileRouter")(express);
const wishlistRouter = require("./routers/wishlistRouter")(express);

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

//testing
app.get("/", (req, res) => {
  console.log("homepage");
  return indexRouter.indexCarousel();
});

//Passport.js setup & init
setupPassport(app);
// app.use("/", viewRouter); //Passport.js route

//Routers
app.use("/", indexRoute); //TODO:
app.use("/home", indexRouter);
app.use("/movie", movieRouter);
app.use("/profile", profileRouter);
app.use("/search", searchRouter);
app.use("/wishlist", wishlistRouter);

//Check if the user is authenticated
// function isLoggedIn(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect("/login");
// }

//Temp. root route
// app.get("/", (req, res) => {
//   res.send("Hello from the index page");
// });

app.listen(port, () => {
  console.log(`App is listening to port ${port}`);
});

module.exports.app = app;
