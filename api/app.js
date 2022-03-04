const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
var morgan = require('morgan')
const bodyParser = require('body-parser');
require('dotenv').config();

// importing routes
const ProductRoute = require('./routes/product.routes')

mongoose
  .connect(process.env.MONGO)
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
// app.use("/images", express.static(path.join("public/images")));

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
app.use('/products', ProductRoute)

// app.post("/add", upload.single('image'), (req, res, next) => {
//     console.log(req.body)
//   // console.log(req.file);
//   var product = new Product({
//     _id: new mongoose.Types.ObjectId(),
//     title: req.body.title,
//     description: req.body.description,
//     price: req.body.price,
//     quantity: req.body.quantity,
//     image: "images/" + req.file.filename

//   }); product
//     .save()
//     .then(createdProduct => {
//     //   console.log(createdProduct.image)
//       res.status(201).json({
//         message: "Product added successfully",
//         createdProduct: createdProduct
//       });
//     })
//     .catch(error => {
//       res.status(500).json({
//         message: "Creating a product failed!",
//         errorMsg: error
//       });
//     });
// });

app.use((req, res, next) => {
  var error = new Error('The page u request is not found');
  error.status = 404;
  next(error);
});

module.exports = app;