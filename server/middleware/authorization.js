const { verifyAuthToken } = require("../controllers/token");

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).json({ msg: "Access denied. No token provided." });

  const payload = verifyAuthToken(token);
  if (payload) {
    req.user = payload;
    req.body.UserId = req.user.id;
    return next();
  }
  res.status(400).json({ msg: "Invalid token." });
};

const admin = (req, res, next) => {
  if (req.user.role === "admin") return next();
  return res.status(403).json({
    msg: "Access denied. You have not permission to access this resource.",
  });
};

const faculty = (req, res, next) => {
  if (req.user.role === "faculty") return next();
  admin(req, res, next);
};

const student = (req, res, next) => {
  if (req.user.role === "student") return next();
  return res.status(403).json({ msg: "Access denied." });
};

module.exports = { auth, admin, faculty, student };
