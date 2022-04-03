const bcrypt = require("bcrypt");
const { User, Faculty, SubjectAssessment } = require("../models");
const { sendVerificationLink, sendOTP } = require("./email");
const { verifyAuthToken, generateAuthToken } = require("./token");

const create = async (req, res) => {
  if (req.body.role === "faculty") {
    if (req.body.facultySubjectAssessmentIds) {
      req.body.facultySubjectAssessmentIds = JSON.stringify(
        req.body.facultySubjectAssessmentIds
      );
    } else {
      return res
        .status(400)
        .json(['"facultySubjectAssessmentIds" required for faculty.']);
    }
  }
  const userData = await User.validate(req.body);
  delete userData.confirmPassword;
  userData.password = await bcrypt.hash(userData.password, 10);
  const [user, created] = await User.findOrCreate({
    where: { email: userData.email },
    defaults: userData,
  });

  if (created) {
    const { id, email, role, isEmailVerified } = user;
    const token = generateAuthToken({ id, email, role, isEmailVerified });
    const { accepted } = await sendVerificationLink(email, token);
    if (accepted.length > 0)
      return res.json({
        msg: "Sign up successful. Verification link sent to your email.",
      });
  } else {
    res.status(400).json({ msg: "Email already registered." });
  }
};

const update = async (req, res) => {
  delete req.body.UserId;
  const { id } = req.user;
  req.body.confirmPassword = req.body.password;
  const userData = await User.validate(req.body);
  const userDB = await User.findOne({ where: { id } });
  if (!userDB) return res.status(404).json({ msg: "Account not found." });

  const match = await bcrypt.compare(userData.password, userDB.password);
  if (match) {
    delete userData.email;
    delete userData.password;
    const [isUpdated] = await User.update(userData, { where: { id } });
    if (isUpdated) return res.json({ msg: "Account updated successfully." });
    return res.status(500).json({ msg: "Server error!!!" });
  }
  res.status(400).json({ msg: "Password incorrect, try again." });
};

const get = async (req, res) => {
  const { id } = req.user;
  const userDB = await User.findOne({ where: { id } });
  if (!userDB) return res.status(404).json({ msg: "Account not found." });
  const user = User.filterPassword(userDB);
  res.json(user);
};

const getStudents = async (req, res) => {
  const users = await User.findAll({
    where: { role: "student" },
    order: [["createdAt", "DESC"]],
  });
  const students = users.map((user) => User.filterPassword(user));
  if (students.length > 0) return res.json(students);
  res.status(404).json({ msg: "Students not found." });
};

const getFaculties = async (req, res) => {
  const users = await User.findAll({
    where: { role: "faculty" },
    include: Faculty,
    order: [["createdAt", "DESC"]],
  });

  for (let i = 0; i < users.length; i++) {
    const subAssessIds = users[i].dataValues.Faculties[0].subjectAssessmentIds;
    users[i].dataValues.SubjectAssessments = [];
    for (let j = 0; j < subAssessIds.length; j++) {
      let id = subAssessIds[j];
      id = id.replace('"', "");
      const subAssess = await SubjectAssessment.findOne({ where: { id } });
      if (subAssess) users[i].dataValues.SubjectAssessments.push(subAssess);
    }
    delete users[i].dataValues.Faculties;
  }

  const faculties = users.map((user) => User.filterPassword(user));
  if (faculties.length > 0) return res.json(faculties);
  res.status(404).json({ msg: "Faculties not found." });
};

const WEB_APP_BASE_URL = process.env.WEB_APP_BASE_URL;
const clientRes = (msg) => {
  return `<body><script>
      alert('${msg}');
      window.location.assign('${WEB_APP_BASE_URL}');
    </script></body>`;
};

const verifyEmail = async (req, res) => {
  const { token } = req.params;
  const payload = verifyAuthToken(token);
  if (!payload)
    return res.status(400).send(clientRes("Invalid verification link."));
  await User.update({ isEmailVerified: true }, { where: { id: payload.id } });
  res.send(clientRes("Email verified successfully, go to sign in."));
};

const passwordResetOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ msg: "Email required." });
  const userDB = await User.findOne({ where: { email } });
  if (!userDB) return res.status(404).json({ msg: "Account not found." });
  const randomOtp = Math.floor(Math.random() * (999999 - 111111)) + 111111;
  const { accepted } = await sendOTP(email, `${randomOtp}`);
  if (accepted.length > 0)
    return res.json({ otp: randomOtp, msg: "OTP sent to your email." });
};

const passwordReset = async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password))
    return res.status(400).json({ msg: "Email and password required." });

  const userDB = await User.findOne({ where: { email } });
  if (!userDB) return res.status(404).json({ msg: "Account not found." });

  const hashedPass = await bcrypt.hash(password, 10);
  const [isUpdated] = await User.update(
    { password: hashedPass },
    { where: { email } }
  );
  if (isUpdated) return res.json({ msg: "Password reset successfully." });
};

module.exports = {
  get,
  create,
  update,
  getStudents,
  getFaculties,
  verifyEmail,
  passwordResetOtp,
  passwordReset,
};
