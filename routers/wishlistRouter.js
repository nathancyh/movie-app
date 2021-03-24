"use strict";

module.exports = (express) => {
  const router = express.Router();
  const axios = require("axios");

  // Knex Setup
  const knexConfig = require("../knexfile").development;
  const knex = require("knex")(knexConfig);

  const WishlistService = require("../services/wishlistService");
  const wishlistService = new WishlistService(knex);

  router.route("/:userid").get(getWishlist);

  function getWishlist(req, res) {
    // function wishUserQuery() {
    return wishlistService
      .wishlistUser(req.params.userid)
      .then((data) => {
        let wishArr = data.map((x) => (x = x.movie_id));
        // console.log("wishArr", wishArr);
        return wishlistService.wishlistMovie(wishArr);
      })
      .then((wishMovieArr) => {
        console.log(wishMovieArr);
        // res.send("this is /wishlist/1");
        // res.send(wishMovieArr);
        res.render("wishlist", {
          wishMovieArr: wishMovieArr,
        });
      })
      .catch((err) => res.status(500).json(err));
  }

  return router;
};
