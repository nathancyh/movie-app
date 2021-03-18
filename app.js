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

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Temp. root route
app.get("/", (req, res) => {
  console.log("get '/'");
  res.send("kim is tired!");
});

//Passport.js setup & init
setupPassport(app);
// app.use("/", viewRouter); //Passport.js route

//Review route
app.use("/movie", movieRouter);

app.listen(port, () => {
  console.log(`App is listening to port ${port}`);
});

module.exports.app = app;
