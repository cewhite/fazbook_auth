// serialize and deserialize

const passport = require('passport');
const models = require('../db/models/index');
// not sure exactly, i think this is saying module.exports refers to passport requirement to bind with  and define serializeUser
// when done give user id?
module.exports = ( ) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  // use passport to take the serialized user id found in models
  // then ? or catch the error
  passport.deserializationUser((id, done) => {
    models.User.findById(id)
     .then((user) => { done(null, user);  })
     .catch((err) => { done(err, null);  });
  });
};

