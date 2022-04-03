const { ExamAssessment, Question } = require("../models");

const get = async (req, res) => {
  const { id } = req.params;
  const examAssessment = await ExamAssessment.findOne({
    where: { id },
  });
  if (examAssessment) return res.json(examAssessment);
  res.status(404).json({ msg: "Exam assessment not found." });
};

const getAll = async (req, res) => {
  const examAssessments = await ExamAssessment.findAll({
    order: [["createdAt", "DESC"]],
  });

  if (req.user.role === "student") {
    for (let i = 0; i < examAssessments.length; i++) {
      const { subjectAssessIdWithNumOfQns, totalQuestions } =
        examAssessments[i];

      const subIdsWithNumOfQns = JSON.parse(subjectAssessIdWithNumOfQns);
      let totalQnCount = 0;
      for (const key in subIdsWithNumOfQns) {
        const qnCount = parseInt(subIdsWithNumOfQns[key]);
        totalQnCount += qnCount;

        const qnCountDB = await Question.count({
          where: { SubjectAssessmentId: key },
        });
        if (qnCount <= qnCountDB && totalQnCount <= totalQuestions) continue;
        else delete examAssessments[i];
      }
    }
    const assessments = examAssessments.filter((el) => el !== null);
    if (assessments.length > 0) return res.json(assessments);
  }

  const assessments = examAssessments.filter((el) => el !== null);
  if (assessments.length > 0) return res.json(assessments);
  res.status(404).json({ msg: "Exam assessments not found." });
};

const create = async (req, res) => {
  req.body.subjectAssessIdWithNumOfQns = JSON.stringify(
    req.body.subjectAssessIdWithNumOfQns
  );
  const examAssessment = await ExamAssessment.validate(req.body);
  const createdExamAssessment = await ExamAssessment.create(examAssessment);
  if (createdExamAssessment) return res.json(createdExamAssessment);
  res.status(500).json({ msg: "Server error!!!" });
};

const update = async (req, res) => {
  const { id } = req.params;
  const examAssessment = await ExamAssessment.validate(req.body);
  const [isUpdated] = await ExamAssessment.update(examAssessment, {
    where: { id },
  });
  if (isUpdated)
    return res.json({ msg: "Exam assessment successfully updated." });

  res.status(404).json({ msg: "Exam assessment not found." });
};

const deleteData = async (req, res) => {
  const { id } = req.params;
  const isDeleted = await ExamAssessment.destroy({ where: { id } });
  if (isDeleted)
    return res.json({ msg: "Exam assessment deleted successfully." });
  res.status(404).json({ msg: "Exam assessment not found." });
};

module.exports = {
  get,
  getAll,
  create,
  update,
  deleteData,
};
