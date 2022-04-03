const bcrypt = require("bcrypt");
const { User } = require("../models");
const { generateAuthToken } = require("./token");

module.exports = async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password))
    return res.status(400).json({ msg: "Email and password required." });

  const userDB = await User.findOne({ where: { email } });
  if (!userDB) return res.status(400).json({ msg: "Email is not registered." });

  const isCorrect = await bcrypt.compare(password, userDB.password);
  if (!isCorrect)
    return res.status(400).json({ msg: "Password is incorrect, try again." });

  if (!userDB.isEmailVerified)
    return res.status(400).json({
      msg: "Email is not verified, link has been sent to your email.",
    });

  const { id, email: userEmail, role, isEmailVerified } = userDB;
  const token = generateAuthToken({ id, userEmail, role, isEmailVerified });
  const userData = User.filterPassword(userDB);
  return res
    .header("x-auth-token", token)
    .json({ user: userData, msg: "Authenticated successfully." });
};
