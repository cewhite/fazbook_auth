// set requirements

const bcrypt = require('bcryptjs');

const models = require('../db/models/index');

// set function to compare passwords via bcrypt
//
function comparePass(userPassword, datadbasePassword) {
  return bcrypt.compareSync(userPassword, datadbasePassword);
}
// function to call req, res and move to next
// if 401 status return 'You...in' then return next
function loginRedirect(req, res, next) {
  if (req.user) return res.status(401).json(
    { status: 'You are already logged in'}
    );
    return next();
}
// creates user and ecrypts password
function createUser(req, res) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
// redirects to /
  return models.User.create({
    username: req.body.username,
    password: hash,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    dob: req.body.dob
  }).then(() => {
    res.redirect('/');
  });
}
// function returns next calls module.exports
function loginRequired(req, res, next) {
  if(!req.user) return res.status(401).json({ status: 'Please log in'});

  return next();
}
  module.exports = {
    comparePass,
    loginRedirect,
    loginRequired,
    createUser
  }

