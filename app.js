require("dotenv").config();

// Knex Setup
const knexConfig = require("./knexfile").development;
const knex = require("knex")(knexConfig);

// Class Import & Init
const NoteRouter = require("./noteRouter");
const NoteService = require("./noteService");
const noteService = new NoteService(knex);

// Setup Express
const express = require("express");
const app = express();
app.use(express.static("public"));

// Middlewares
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const basicAuth = require("express-basic-auth");
var exphbs = require("express-handlebars");

// Middleware: Auth
app.use(
  basicAuth({
    users: { Admin: "super", Nathan: "super" },
    challenge: true,
    realm: "foo",
  })
);

// Middleware: Router
app.use("/api/v1", new NoteRouter(noteService).router());

// express-handlebar
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//SQL Serve Main page
app.get("/", function (req, res) {
  console.log("GET MAIN");
  noteService
    .listid(req.auth.user)
    .then((noteArr) => {
      res.render("login", {});
      // res.render("index", {
      //   currentuser: req.auth.user,
      //   array: noteArr,
      // });
    })
    .catch((err) => res.status(500).json(err));
});

//Listen
const port = 8080;
app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});

///////SQL Test Function
app.get("/sql", function (req, res) {
  return (
    knex("notetable")
      // .whereRaw("username = ?", [user])
      .select("id", "user_id", "noterow")
      .orderBy("id")
      .then((data) => {
        console.log(data);
        res.json(data);
      })
      .catch((err) => console.error(err))
  );
});
