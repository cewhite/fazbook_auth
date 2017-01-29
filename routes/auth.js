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
// .post to authenticate(not clear to me what's going on here)
router.post('/login', passport.authenticate('local', {
  successRedirect: '/user',
  failureRedirect: '/auth/login',
  failureFlash: true
})
);
 // allows logout
 router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
 });

 module.exports = router;
