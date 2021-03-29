const stripePublicKey = process.env.stripePublicKey;
const stripeSecretKey = process.env.stripeSecretKey;
const stripe = require("stripe")(stripeSecretKey);

module.exports = (express) => {
  const router = express.Router();

  //shopping page
  router.get("/", (req, res) => {
    // res.render("login");
    res.render("storefront", {
      layout: "shopping",
      stripePublicKey: stripePublicKey,
    });
  });

  //payment
  router.post("/purchase", (req, res) => {
    let total = req.body.total;
    stripe.charges
      .create({
        amount: (total * 100).toFixed(0),
        source: req.body.stripeTokenId,
        currency: "usd",
      })
      .then(() => {
        console.log("charge successful");
        res.send(`Payment of ${total} successful`);
      })
      .catch((err) => {
        console.log("charge fail", err);
        res.status(500).end();
      });
  });

  return router;
};
