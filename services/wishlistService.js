module.exports = class MovieService {
  constructor(knex) {
    this.knex = knex;
  }

  addWishlist(userid, wishlistMovie) {}
  removeWishlist(userid, wishlistMovie) {}
};
