const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user');

// HELPER FUNCTIONS
const { isLoggedIn, isNotLoggedIn, validationLoggin } = require('../helpers/middlewares');


//  GET    '/me'
router.get('/me', isLoggedIn(), (req, res, next) => {
  res.json(req.session.currentUser);
});


//  POST    '/login'
router.post('/login', isNotLoggedIn(), validationLoggin(), (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({
      email
    })
    .then((user) => {
      if (!user) {
        const err = new Error('Not Found');
        err.status = 404;
        err.statusMessage = 'Not Found';
        next(err)
      }
      if (bcrypt.compareSync(password, user.password)) {
        req.session.currentUser = user;
        return res.status(200).json(user);
      } else {
        const err = new Error('Unauthorized');
        err.status = 401;
        err.statusMessage = 'Unauthorized';
        next(err);
      }
    })
    .catch(next);
});


//  POST    '/signup'
router.post('/signup', isNotLoggedIn(), validationLoggin(), (req, res, next) => {
  const { username, password, firstName, lastName, email, photoUrl } = req.body;

  User.findOne({
    email
    }, 'email')
    .then((userExists) => {
      if (userExists) {
        const err = new Error('Unprocessable Entity');
        err.status = 422;
        err.statusMessage = 'email-not-unique';
        next(err);
      }

      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);

      const newUser = new User({
        username,
        firstName,
        lastName,
        email,
        photoUrl,
        password: hashPass,
      });

      return newUser.save().then(() => {
        // TODO delete password 
        req.session.currentUser = newUser;
        res.status(200).json(newUser);
      });
    })
    .catch(next);
});


//  POST    '/logout'
router.post('/logout', isLoggedIn(), (req, res, next) => {
  req.session.destroy();
  return res.status(204).send();
});

//  GET    '/private'   --> Only for testing - Same as /me but it returns a message instead
router.get('/private', isLoggedIn(), (req, res, next) => {
  res.status(200).json({
    message: 'This is a private message'
  });
});

module.exports = router;
