const JWT = require("jsonwebtoken");

module.exports = function ({ username, role, uuid }) {
  return JWT.sign({ username, role, uuid }, process.env.SECRET_KEY);
};
