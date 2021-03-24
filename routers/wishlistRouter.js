"use strict";

module.exports = (express) => {
  const router = express.Router();
  const axios = require("axios");

  // Knex Setup
  const knexConfig = require("../knexfile").development;
  const knex = require("knex")(knexConfig);

  const WishlistService = require("../services/wishlistService");
  const wishlistService = new WishlistService(knex);

  router.route("/").get(getWishlist);

  function getWishlist(req, res) {
    console.log("getWishlist");
    // res.send("getWishlist");
    res.render("wishlist", { wishlistArr: [1, 2, 3] });
  }
  return router;
};
