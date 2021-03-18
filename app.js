require("dotenv").config();

// Knex Setup
const knexConfig = require("./knexfile").development;
const knex = require("knex")(knexConfig);

const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const session = require("express-session");
const setupPassport = require("./passport-js/passport");

const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// const MovieService = require('./services/movieService');
const MovieRouter = require("./routers/movieRouter")(express);
const viewRouter = require("./routers/viewRouter")(express);
app.use("/", viewRouter);

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

setupPassport(app);
app.use("/movie", MovieRouter);

// app.get("/", (req, res) => {
//   console.log("app.get");
//   res.send("kim is tired!");
// });

app.listen(8080, () => {
  console.log("App is listening to port 8080");
});

module.exports.app = app;
