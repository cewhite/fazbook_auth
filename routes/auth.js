const express = require('express');
const router = express.Router( );
// set requirements
const authHelpers = require('../auth/auth-helpers');
const passport = require('../auth/local');
// .get method for request and response to register login
router.get('/register', authHelpers.loginRedirect, (req,res) => {
  res.render('auth/register');
});
// allows user to register/.catch errors
router.post('/register', (req, res, next) => {
  return authHelpers.createUser(req, res)
  .then((response) => {
    console.log('registration successful');
  })
  .catch((err) => { res.status(500).json({ status: 'error' });
  });
});
// .get to render login page
router.get('/login', authHelpers.loginRedirect, (req, res) => {
  res.render('auth/login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/user',
  failureRedirect: '/auth/login',
  failureFlash: true
})
);
