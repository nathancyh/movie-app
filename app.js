require("dotenv").config();

// Knex Setup
// const knexConfig = require("./knexfile").development;
// const knex = require("knex")(knexConfig);

const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const session = require("express-session");
const setupPassport = require("./passport-js/passport");
// const stripePublicKey = process.env.stripePublicKey;
// const stripeSecretKey = process.env.stripeSecretKey;
// const stripe = require("stripe")(stripeSecretKey);
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
const loginRouter = require("./routers/loginRouter")(express);
const indexRouter = require("./routers/indexRouter")(express);
const searchRouter = require("./routers/searchRouter")(express);
const profileRouter = require("./routers/profileRouter")(express);
const watchlistRouter = require("./routers/watchlistRouter")(express);
const shoppingRouter = require("./routers/shoppingRouter")(express);

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    helpers: require("./config/handlebars-helpers"),
  })
);
app.set("view engine", "handlebars");

app.use(express.static("public"));
app.use(express.static("uploads"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Passport.js setup & init
setupPassport(app);
app.use("/", loginRouter); //Passport.js route

//Routers
app.use("/", indexRouter);
app.use("/movie", movieRouter);
app.use("/profile", profileRouter);
app.use("/search", searchRouter);
app.use("/watchlist", watchlistRouter);
app.use("/shopping", shoppingRouter);

app.listen(port, () => {
  console.log(`App is listening to port ${port}`);
});

module.exports.app = app;
