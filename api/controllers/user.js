var User = require('../schemas/users.schema');
var mongoose = require('mongoose');
var bcryptjs = require('bcryptjs');
var jwt = require('jsonwebtoken');

exports.user_signup = (req, res, next) => {
  User.find({email: req.body.email})
  .exec()
  .then(user => {
    if(user.length >= 1) {
       res.status(409).json({
        Message: 'Mail exist.'
      });
    } else {
      bcryptjs.hash(req.body.password, 10, (err, hash) => {
        if (err) {
        return  res.status(500).json({
            error: err
          });
        } else {
          var user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hash
          });
          user.save()
          .then(result => {
            console.log(result);
            res.status(201).json({
              Message: 'User successfully added.'
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            })
          });
        }
      });
    }
  });
}


exports.user_login = (req, res, next) => {
  User.find({email: req.body.email})
  .exec()
  .then(user => {
    if (user.length < 1){
      return res.status(401).json({
        Error: 'Auth Failed.'
      });
    }
    bcryptjs.compare(req.body.password, user[0].password, (err, result) => {
      if (err){
        return res.status(401).json({
          Error: 'Auth Failed.'
        });
      }
      if (result) {
        var JWT_KEY = 'secret';
        var token = jwt.sign({
          email: user[0].email,
          userId: user[0]._id
        },
        JWT_KEY,
        {
          expiresIn: '1h'
        }
      );
        return res.status(200).json({
          Message: 'Auth Successful.',
          token: token
        });
      }
      res.status(401).json({
        Error: 'Auth Failed.'
      });
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  })
}


exports.user_delete = (req, res, next) => {
  var id = req.params.userId;
  User.remove({
      _id: id
    })
    .exec()
    .then(doc => {
      res.status(200).json({
        Message: 'User successfully Removed'
      });
    }).catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}

exports.user_get = (req, res, next) => {
    User.findOne({email: req.params.email}).select('_id email role')
    .exec().then(doc => {
      if (doc) {
        res.status(200).json({
          User: doc
        });
      } else {
        res.status(404).json({
          error: 'No Records found for that Email'
        })
      }
    }).catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
  }
  
