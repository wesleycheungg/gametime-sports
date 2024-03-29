const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const keys = require("../../config/keys");
const jwt = require("jsonwebtoken");

// validate
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// testing
// router.get("/test", (req,res) => {
//     res.json({msg: "This is the user route"});
// });

// fetch individual user
router.get('/show/:userId', (req, res) => {
  if (req.params.userId === 'undefined'){
    return res.status(422).json({"msg": "userId is undefined"})
  }
  User.findById(req.params.userId)
  .then( user => {
    if (!!user){
      return res.json(user)
    } else {
      return res.status(404).json({"msg": "User not found"})
    }
  })
}) 

// sign up
router.post('/register', (req,res) => {
    const { errors, isValid } = validateRegisterInput(req.body)

    if(!isValid){
        return res.status(400).json(errors)
    }

    User.findOne({ email: req.body.email })
    .then(user => {
        if (user) {
            return res.status(400).json({email: "A user is already registered with that email."})
        } else {
            const newUser = new User({
                handle: req.body.handle,
                email: req.body.email,
                password: req.body.password,
                currency: 1000
            })
            
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
                })
            })
        }
    })
})

// login
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body)

  if(!isValid){
    return res.status(400).json(errors)
  }
  
  User.findOne({email: req.body.email}).then(
    user => {
      if(!user){
        return res.status(404).json({email: "This user does not exist"})
      }

      bcrypt.compare(req.body.password, user.password).then(isMatch => {
        if (!!isMatch){
          const payload = {
            id: user.id, //mongo db object id
            handle: user.handle,
            email: user.email,
            currency: user.currency
          }

          jwt.sign(
            payload,
            keys.secretOrKey,
            { 
              expiresIn: 3600
            },
            (err, token) => {
              res.json({
                sucess: true, 
                token: "Bearer" + token 
              })
            }
          )
        } else {
          return res.status(400).json({password: "Incorrect password"})
        }
      })
    }
  )
})

module.exports = router;