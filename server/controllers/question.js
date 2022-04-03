const { Question, Faculty, SubjectAssessment } = require("../models");

const get = async (req, res) => {
  const question = await Question.findOne({ where: { id } });
  if (question) return res.json(question);
  res.status(404).json({ msg: "Question not found." });
};

const getSubjectQuestions = async (req, res) => {
  const { subId } = req.params;
  const questions = await Question.findAll({
    where: { SubjectAssessmentId: subId },
  });
  if (questions.length > 0) return res.json(questions);
  res.status(404).json({ msg: "Questions not found." });
};

const getAll = async (req, res) => {
  const { id, role } = req.user;
  if (role === "faculty") {
    const questions = await Question.findAll({
      where: { UserId: id },
      include: SubjectAssessment,
      order: [["createdAt", "DESC"]],
    });
    if (questions.length > 0) return res.json(questions);
  }

  const questions = await Question.findAll({
    include: SubjectAssessment,
    order: [["createdAt", "DESC"]],
  });
  if (questions.length > 0) return res.json(questions);

  res.status(404).json({ msg: "Questions not found." });
};

const create = async (req, res) => {
  const question = await Question.validate(req.body);
  const createdQuestion = await Question.create(question);
  if (createdQuestion) return res.json(createdQuestion);
  res.status(500).json({ msg: "Server error!!!" });
};

const update = async (req, res) => {
  const { id } = req.params;
  const question = await Question.validate(req.body);
  const [isUpdated] = await Question.update(question, {
    where: { id },
  });
  if (isUpdated) {
    const updatedQuestion = await Question.findOne({ where: { id } });
    return res.json(updatedQuestion);
  }
  res.status(404).json({ msg: "Question not found." });
};

const deleteData = async (req, res) => {
  const { id } = req.params;
  const isDeleted = await Question.destroy({ where: { id } });
  if (isDeleted) return res.json({ msg: "Question deleted successfully." });
  res.status(404).json({ msg: "Question not found." });
};

module.exports = {
  getSubjectQuestions,
  get,
  getAll,
  create,
  update,
  deleteData,
};
