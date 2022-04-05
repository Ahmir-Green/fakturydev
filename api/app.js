const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
var morgan = require('morgan')
const bodyParser = require('body-parser');
require('dotenv').config();
var cors = require('cors')


// importing routes
const ProductRoute = require('./routes/product.routes')
const OrderRoute = require('./routes/order.routes')
const UserRoute = require('./routes/user.routes')
const CheckoutRoute = require('./routes/checkout.routes')
const BidRoute = require('./routes/bids.routes')
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

app.use(cors())
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({limit: '100mb', extended: false, parameterLimit:100000}));
app.use(bodyParser.json({limit: '100mb'}));
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
// auctions routes
app.use('/api/auctions', AuctionsRoute)
// bids routes
app.use('/api/bids', BidRoute)

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "angular", "index.html"));
});

module.exports = app;