const jwt = require("jsonwebtoken");

const PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;

const generateAuthToken = (payload) => {
  return jwt.sign(payload, PRIVATE_KEY);
};

const verifyAuthToken = (token) => {
  try {
    const decoded = jwt.verify(token, PRIVATE_KEY);
    return decoded;
  } catch (err) {
    return null;
  }
};

module.exports = { generateAuthToken, verifyAuthToken };
