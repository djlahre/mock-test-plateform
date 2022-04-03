const { Faculty, User } = require("../models");

const create = async (req, res) => {
  req.body.UserId = req.params.userId;
  const userData = await Faculty.validate(req.body);
  const [faculty, created] = await Faculty.findOrCreate({
    where: { UserId: userData.UserId },
    defaults: userData,
  });
  if (created) {
    await User.update({ role: "faculty" }, { where: { id: userData.UserId } });
    return res.json(faculty);
  } else {
    return res.status(400).json({ msg: "User already assigned faculty role." });
  }
};

const update = async (req, res) => {
  req.body.UserId = req.params.userId;
  const faculty = await Faculty.validate(req.body);
  const [isUpdated] = await Faculty.update(faculty, {
    where: { UserId: faculty.UserId },
  });
  if (isUpdated) return res.json(isUpdated);
  res.status(500).json({ msg: "Server error!!!" });
};

const deleteData = async (req, res) => {
  const { userId } = req.params;
  const isDeleted = await Faculty.destroy({ where: { UserId: userId } });
  if (isDeleted) {
    await User.update({ role: "student" }, { where: { id: userId } });
    return res.json({ msg: "Faculty deleted successfully." });
  }
  res.status(404).json({ msg: "Faculty not found." });
};

module.exports = {
  create,
  update,
  deleteData,
};
