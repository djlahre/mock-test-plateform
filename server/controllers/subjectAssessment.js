const { SubjectAssessment, Question, Faculty } = require("../models");

const get = async (req, res) => {
  const subjectAssessments = await SubjectAssessment.findOne({
    where: { id: req.params.id },
  });
  if (subjectAssessments) return res.json(subjectAssessments);
  res.status(404).json({ msg: "Subject assessment not found." });
};

const getAll = async (req, res) => {
  const { id, role } = req.user;
  const subjectAssessments = await SubjectAssessment.findAll({
    order: [["createdAt", "DESC"]],
  });

  if (role === "student") {
    for (let i = 0; i < subjectAssessments.length; i++) {
      const subAssess = subjectAssessments[i];
      const qnCountDB = await Question.count({
        where: { SubjectAssessmentId: subAssess.id },
      });
      if (subAssess.totalQuestions > qnCountDB) {
        delete subjectAssessments[i];
      }
    }
    const assessments = subjectAssessments.filter((el) => el != null);
    if (assessments) return res.json(assessments);
  } else if (role === "faculty") {
    const facultyDB = await Faculty.findOne({ where: { UserId: id } });
    const assessments = [];
    for (let i = 0; i < facultyDB.subjectAssessmentIds.length; i++) {
      let sid = facultyDB.subjectAssessmentIds[i];
      sid = sid.replace('"', "");
      const subAssess = await SubjectAssessment.findOne({ where: { id: sid } });
      assessments.push(subAssess);
    }
    if (assessments.length > 0) return res.json(assessments);
  } else {
    if (subjectAssessments.length > 0) return res.json(subjectAssessments);
    res.status(404).json({ msg: "Subject assessments not found." });
  }
};

const create = async (req, res) => {
  const subjectAssessment = await SubjectAssessment.validate(req.body);
  const createdSubjectAssessment = await SubjectAssessment.create(
    subjectAssessment
  );
  if (createdSubjectAssessment) return res.json(createdSubjectAssessment);
  res.status(500).json({ msg: "Server error!!!" });
};

const update = async (req, res) => {
  const { id } = req.params;
  const subjectAssessment = await SubjectAssessment.validate(req.body);
  const [isUpdated] = await SubjectAssessment.update(subjectAssessment, {
    where: { id },
  });
  if (isUpdated) {
    const updatedSubjectAssessment = await SubjectAssessment.findOne({
      where: { id },
    });
    return res.json(updatedSubjectAssessment);
  }
  res.status(404).json({ msg: "Subject assessment not found." });
};

const deleteData = async (req, res) => {
  const { id } = req.params;
  const isDeleted = await SubjectAssessment.destroy({ where: { id } });
  if (isDeleted)
    return res.json({ msg: "Subject assessment deleted successfully." });
  res.status(404).json({ msg: "Subject assessment not found." });
};

module.exports = {
  get,
  getAll,
  create,
  update,
  deleteData,
};
