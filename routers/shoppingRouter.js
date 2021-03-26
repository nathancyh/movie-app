module.exports = (express) => {
  const router = express.Router();

  router.route("/").get(shoppingPage);

  function shoppingPage(req, res) {
    res.render("storefront", { layout: "shopping" });
  }
  return router;
};
