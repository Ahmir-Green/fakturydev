const stripe = require("stripe")("sk_test_51KbR9HKtlpexRaBxrFowAi5oKQd7leOYgaXdlR2LymSeMHamiX7MMFuAKAPLETnSgJrMY2CxVzuCEifnswZIPaXi00bprPh0y7");

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
            receipt_email: req.body.data.email,
            metadata: {
              'firstName': req.body.data.firstName,
              'lastName': req.body.data.lastName, 
              'xrplAddress': req.body.data.xrplAddress, 
              'billingAddress': req.body.data.billingAddress,
              'shippingAddress': req.body.data.shippingAddress
            }
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