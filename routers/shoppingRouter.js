const { app } = require("../app");

module.exports = (express) => {
  const router = express.Router();

  //shopping page
  router.get("/", (req, res) => {
    // res.render("login");
    res.render("storefront", { layout: "shopping" });
  });

  //payment
  router.post("/shopping", (req, res) => {
    let total = 0;
    let count = 0;
    console.log(req.body.items, "looks good");
    //   req.body.items.forEach((item) => {
    //     getItemPrice(item.item_id).then((data) => {
    //       total += data[0].item_price * item.quantity;
    //       count++;
    //       if (count === req.body.items.length) {
    //         console.log("charge below");
    //         stripe.charges
    //           .create({
    //             amount: total,
    //             source: req.body.stripeTokenId,
    //             currency: "usd",
    //           })
    //           .then(() => {
    //             console.log("charge successful");
    //           })
    //           .catch((err) => {
    //             console.log("charge fail", err);
    //             res.status(500).end();
    //           });
    //       }
    //     });
    //   });
  });

  return router;
};

// app.post('/shopping', aysnc (req, res) => {
//   const session = await stripe.checkout.sessions.create({
//     success_url: 'http://localhost:8080/success?id={checkout_session_id}',
//     payment_method_types: ['card'],
//     mode: 'payment',
//     line_items: [{ //products and prices into stripe

//     }]
//   })
//   res.json({})
