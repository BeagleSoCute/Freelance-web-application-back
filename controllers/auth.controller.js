const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const expireToken = config.get("tokenExpire");
const expireRefreshToken = config.get("refreshTokenExpire");
const expireRememberRefresh = config.get("rememberRefreshTokenExpire");
const tokenSecret = config.get("jwtSecret");
const register = async (req, res) => {
  const { email, first_name, last_name, phone_number, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ error: { msg: "This email is already exist!" } });
    }
    newUser = new User({
      email,
      first_name,
      last_name,
      phone_number,
      password,
    });
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);
    newUser.save();
    res.json({ message: "Register success" });
  } catch (err) {
    res.status(500).send("Server register is error ");
  }
};
const login = async (req, res) => {
  const { email, password, remember } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: { msg: "Invalid user" } });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: { msg: "Invalid password" } });
    }
    const payload = {
      user: {
        id: user.id,
      },
    };
    //Send token back via response
    const access_token = jwt.sign(payload, tokenSecret, {
      expiresIn: expireToken,
    });
    const refresh_token = jwt.sign(payload, config.get("jwtRefreshSecret"), {
      expiresIn: remember ? expireRememberRefresh : expireRefreshToken,
    });
    res.json({ access_token, refresh_token });
  } catch (err) {
    res.status(500).send("Server login is error ");
  }
};
const logout = (req, res) => {
  try {
    res.send("Cookies are removed");
  } catch (err) {
    res.status(500).send("Server login is error ");
  }
};
const extendAccessToken = (req, res) => {
  const { refresh_token } = req.body;
  console.log("refresh_token", refresh_token);
  let userId;
  try {
    const decoded = jwt.verify(refresh_token, config.get("jwtRefreshSecret"));
    userId = decoded.user.id;
  } catch (error) {
    res.status(403).json({ msg: "Refresh token is not valid" });
    return;
  }
  const payload = {
    user: {
      id: userId,
    },
  };
  try {
    const newToken = jwt.sign(payload, tokenSecret, {
      expiresIn: expireToken,
    });
    res.json({ access_token: newToken });
  } catch (error) {
    res.status(500).send("Server extend access token is error ");
  }
};

module.exports = {
  register,
  login,
  logout,
  extendAccessToken,
};
