const { AssessmentResult, Question } = require("../../models");

const uuidRegEx =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const get = async (req, res) => {
  const { id } = req.params;
  if (!uuidRegEx.test(id))
    return res.status(404).json({ msg: "Invalid result ID." });

  const assessmentResult = await AssessmentResult.findOne({
    where: { id, UserId: req.user.id },
  });
  if (!assessmentResult)
    return res.status(404).json({ msg: "Result not found." });

  const questions = [];
  const questionIds = Object.keys(JSON.parse(assessmentResult.correctAnswers));
  for (let i = 0; i < questionIds.length; i++) {
    const qn = await Question.findOne({ where: { id: questionIds[i] } });
    questions.push(qn);
  }
  return res.json({ questions, result: assessmentResult });
};

const getExams = async (req, res) => {
  const results = await AssessmentResult.findAll({
    where: { assessmentType: "exam", UserId: req.user.id },
    order: [["createdAt", "DESC"]],
  });
  if (results.length > 0) return res.json(results);
  return res.status(404).json({ msg: "Results not found." });
};

const getSubjects = async (req, res) => {
  const results = await AssessmentResult.findAll({
    where: { assessmentType: "subject", UserId: req.user.id },
    order: [["createdAt", "DESC"]],
  });
  if (results.length > 0) return res.json(results);
  return res.status(404).json({ msg: "Results not found." });
};

const create = async (req, res) => {
  const result = await AssessmentResult.validate(req.body);
  const createdResult = await AssessmentResult.create(result);
  if (createdResult) return res.json(createdResult);
  res.status(500).json({ msg: "Server error!!!" });
};

module.exports = {
  get,
  getExams,
  getSubjects,
  create,
};
