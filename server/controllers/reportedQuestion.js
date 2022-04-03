const { ReportedQuestion, Question } = require("../models");

const getAll = async (req, res) => {
  const reportedQuestions = await ReportedQuestion.findAll({
    include: Question,
    order: [["createdAt", "DESC"]],
  });
  if (reportedQuestions.length > 0) return res.json(reportedQuestions);
  res.status(404).json({ msg: "Reported questions not found." });
};

const create = async (req, res) => {
  const report = await ReportedQuestion.validate(req.body);
  const createdReport = await ReportedQuestion.create(report);
  if (createdReport) return res.json(createdReport);
  res.status(500).json({ msg: "Server error!!!" });
};

const deleteData = async (req, res) => {
  const { id } = req.params;
  const isDeleted = await ReportedQuestion.destroy({ where: { id } });
  if (isDeleted) return res.json({ msg: "Report deleted successfully." });
  res.status(404).json({ msg: "Report not found." });
};

module.exports = {
  getAll,
  create,
  deleteData,
};
