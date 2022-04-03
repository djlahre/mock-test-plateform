const { SubjectAssessment, ExamAssessment, Question } = require("../../models");

//  question generator
const generateSubjectQuestions = async (sid, totalQuestions) => {
  const questions = await Question.findAll({
    where: { SubjectAssessmentId: sid },
  });
  if (questions.length === 0) return null;

  const uniqueQnIds = new Set();
  while (uniqueQnIds.size !== totalQuestions) {
    const randomId = Math.floor(Math.random() * questions.length);
    uniqueQnIds.add(randomId);
  }
  const finalQuestion = [];
  uniqueQnIds.forEach((id) => finalQuestion.push(questions[id]));
  if (finalQuestion.length > 0) return finalQuestion;
};

const subject = async (req, res) => {
  const { id } = req.params;
  const subjectAssessment = await SubjectAssessment.findOne({
    where: { id },
  });
  if (!subjectAssessment)
    return res.status(404).json({ msg: "Subject assessment not found." });

  const questions = await generateSubjectQuestions(
    id,
    subjectAssessment.totalQuestions
  );
  if (questions) return res.json(questions);
  res.status(400).json({ msg: "Not enough questions" });
};

const exam = async (req, res) => {
  const { id } = req.params;
  const examAssessment = await ExamAssessment.findOne({ where: { id } });
  if (!examAssessment)
    return res.status(404).json({ msg: "Exam assessment not found." });

  const sidsWithNumOfQns = JSON.parse(
    examAssessment.subjectAssessIdWithNumOfQns
  );
  const allQuestions = [];
  for (const key in sidsWithNumOfQns) {
    const questions = await generateSubjectQuestions(
      key,
      parseInt(sidsWithNumOfQns[key])
    );
    if (questions) allQuestions.push(...questions);
  }
  if (allQuestions.length > 0) return res.json(allQuestions);
  res.status(400).json({ msg: "Not enough questions" });
};

module.exports = {
  subject,
  exam,
};
