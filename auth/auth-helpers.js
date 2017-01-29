// set requirements

const bcrypt = require('bcryptjs');

const models = require('../db/models/index');

// set function to compare passwords via bcrypt
//
function comparePass(userPassword, datadbasePassword) {
  return bcrypt.compareSync(userPassword, datadbasePassword);
}
