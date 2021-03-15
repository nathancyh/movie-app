require("dotenv").config();

// Knex Setup
const knexConfig = require("./knexfile").development;
const knex = require("knex")(knexConfig);

// Class Import & Init
const NoteRouter = require("./routers/noteRouter");
const NoteService = require("./services/noteService");
const noteService = new NoteService(knex);

// Setup Express & Passport.js
const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const setupPassport = require("./passport-js/passport");
const viewRouter = require("./routers/viewRouter")(express);
app.use(express.static("public"));
const port = process.env.PORT || 8080;

app.use(cors());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Middlewares
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var exphbs = require("express-handlebars");

// Passport Init and View router
setupPassport(app);
app.use("/", viewRouter);

// Note Router
app.use("/api/v1", new NoteRouter(noteService).router());

// express-handlebar
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Listen
app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
