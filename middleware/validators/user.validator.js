const { check } = require("express-validator");

const validateRegister = [
  check("email", "invalid email address").isEmail(),
  check(
    "password",
    "Please enter a password with 6 or more characters and not greater than 60 characters"
  ).isLength({
    min: 6,
    max: 60,
  }),
  check(
    "name",
    "Please enter more than 3 characters of your name and not more than 60 character"
  ).isLength({
    min: 3,
    max: 60,
  }),
];

module.exports = { validateRegister };