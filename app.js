//Setup node
const fs = require("fs");
const path = require("path");

// Class Import & Init
const NoteRouter = require("./noteRouter");
const NoteService = require("./noteService");
const noteService = new NoteService("./Database/notes.json");

//Setup Express
const express = require("express");
const app = express();
app.use(express.static("public"));

//Middlewares
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const basicAuth = require("express-basic-auth");
var exphbs = require("express-handlebars");

//Middleware: Auth
app.use(
  basicAuth({
    users: { Admin: "super", Nathan: "super" },
    challenge: true,
    realm: "foo",
  })
);

//Middleware: Router
app.use("/api/v1", new NoteRouter(noteService).router());

//express-handlebar
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Global Variables:
const port = 8080;

//Serve Main page
app.get("/", function (req, res) {
  // console.log(req.auth.user);
  // res.sendFile(__dirname + "/index.html"); //static page
  noteService.list("Admin").then((data) => {
    res.render("index", {
      currentuser: req.auth.user,
      array: data,
    });
  });
});
app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
