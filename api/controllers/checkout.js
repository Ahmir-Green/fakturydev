const stripe = require("stripe")("sk_test_tTrzkmwUUKzaOb1DBrnwIq6m");

exports.recive_payment = async(req, res) => {
    try {
      token = req.body.data.token
      const customer = stripe.customers
        .create({
          email: req.body.data.email,
          source: token.id
        })
        .then((customer) => {
          return stripe.charges.create({
            amount: req.body.data.amount * 100,
            description: req.body.data.title,
            currency: "USD",
            customer: customer.id,
          });
        })
        .then((charge) => {
            res.json({
              data:"success"
          })
        })
        .catch((err) => {
          console.log(err)
            res.json({
              data: "failure",
            });
        });
      return true;
    } catch (error) {
      return false;
    }
  }