const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
var morgan = require('morgan')
const bodyParser = require('body-parser');
require('dotenv').config();


// importing routes
const ProductRoute = require('./routes/product.routes')
const OrderRoute = require('./routes/order.routes')
const UserRoute = require('./routes/user.routes')
const CheckoutRoute = require('./routes/checkout.routes')

const AuctionsRoute = require('./routes/auction.routes')
mongoose
  .connect(process.env.MONGO_CONNECTION)
  .then(() => {
    console.log("Connected to Faktury Db!");
  })
  .catch((e) => {
    console.log(e)
    console.log("Connection failed!");
  });


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use("/images", express.static(path.join(__dirname, 'public/images')));
app.use("/", express.static(path.join(__dirname, "angular")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});


// products routes
app.use('/api/products', ProductRoute)
// orders routes
app.use('/api/orders', OrderRoute)
// users routes
app.use('/api/users', UserRoute);
// stripe routes
app.use('/api/checkout', CheckoutRoute)

app.use('/api/auctions', AuctionsRoute)

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "angular", "index.html"));
});

module.exports = app;