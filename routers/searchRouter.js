"use strict";
module.exports = (express) => {
  const router = express.Router();
  const axios = require("axios");

  router.route("/").get(getSearch);

  function getSearch(req, res) {
    console.log(req);
    res.render("movieArr", {});
  }

  return router;
};
