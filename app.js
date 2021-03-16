require("dotenv").config();

// Knex Setup
const knexConfig = require("./knexfile").development;
const knex = require("knex")(knexConfig);

const express = require('express');
const hb = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();

const pg = require('pg');



// const MovieService = require('./services/movieService');
const MovieRouter = require('./routers/movieRouter')(express);
// const movieService = new MovieService(knex);

app.engine("handlebars", hb({ defaultLayout: "main" }));
app.set("view engine", "handlebars");



app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/movie", MovieRouter);

app.get("/", (req, res) => {
    console.log("app.get")
    res.send("kim is smart")
})

app.listen(8080, () => {
    console.log("App is listening to port 8080");
});

module.exports.app = app;