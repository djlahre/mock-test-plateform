const express = require("express");
const router = express.Router();
const { auth, admin, faculty } = require("../middleware/authorization");

const {
  authentication,
  user,
  facultyCTRL,
  question,
  reportedQuestion,
  examAssessment,
  subjectAssessment,
  externalLink,
  assessment,
} = require("../controllers");

// global error handler HOF
const use = (controller) => (req, res, next) =>
  Promise.resolve(controller(req, res, next)).catch(next);

router.get("/", (req, res) => res.json({ msg: "API BASE URL" }));

router.post("/users/register", use(user.create));
router.post("/users/password-reset-otp", use(user.passwordResetOtp));
router.post("/users/password-reset", use(user.passwordReset));
router.post("/users/auth", use(authentication));

router.get("/users/verify/:token", use(user.verifyEmail));
router.put("/users/profile", auth, use(user.update));
router.get("/users/profile", auth, use(user.get));

router.get("/users/student", [auth, admin], use(user.getStudents));
router.get("/users/faculty", [auth, admin], use(user.getFaculties));

router.post("/users/faculty/:userId", [auth, admin], use(facultyCTRL.create));
router.put("/users/faculty/:userId", [auth, admin], use(facultyCTRL.update));
router.delete(
  "/users/faculty/:userId",
  [auth, admin],
  use(facultyCTRL.deleteData)
);

router.get("/subject-assessments", auth, use(subjectAssessment.getAll));
router.get("/subject-assessments/:id", auth, use(subjectAssessment.get));
router.post(
  "/subject-assessments",
  [auth, admin],
  use(subjectAssessment.create)
);
router.put(
  "/subject-assessments/:id",
  [auth, admin],
  use(subjectAssessment.update)
);
router.delete(
  "/subject-assessments/:id",
  [auth, admin],
  use(subjectAssessment.deleteData)
);

router.get(
  "/questions/subject-assessments/:subId",
  [auth, faculty],
  use(question.getSubjectQuestions)
);
router.post("/questions", [auth, faculty], use(question.create));
router.get("/questions", [auth, faculty], use(question.getAll));
router.get("/questions/:id", [auth, faculty], use(question.get));
router.put("/questions/:id", [auth, faculty], use(question.update));
router.delete("/questions/:id", [auth, faculty], use(question.deleteData));

router.post("/reported-questions", auth, use(reportedQuestion.create));
router.get("/reported-questions", [auth, admin], use(reportedQuestion.getAll));
router.delete(
  "/reported-questions/:id",
  [auth, admin],
  use(reportedQuestion.deleteData)
);

router.get("/exam-assessments", auth, use(examAssessment.getAll));
router.get("/exam-assessments/:id", auth, use(examAssessment.get));
router.post("/exam-assessments", [auth, admin], use(examAssessment.create));
router.put("/exam-assessments/:id", [auth, admin], use(examAssessment.update));
router.delete(
  "/exam-assessments/:id",
  [auth, admin],
  use(examAssessment.deleteData)
);

// category => important, study-material, current-opening
router.get("/external-links/:category", use(externalLink.getAll));
router.post("/external-links", [auth, admin], use(externalLink.create));
router.put("/external-links/:id", [auth, admin], use(externalLink.update));
router.delete(
  "/external-links/:id",
  [auth, admin],
  use(externalLink.deleteData)
);

// for students
const { generate, result } = assessment;
router.get("/assessment/subject/:id", auth, use(generate.subject));
router.get("/assessment/exam/:id", auth, use(generate.exam));

router.post("/assessment/results", auth, use(result.create));
router.get("/assessment/results/exam", auth, use(result.getExams));
router.get("/assessment/results/subject", auth, use(result.getSubjects));
router.get("/assessment/results/:id", auth, use(result.get));

module.exports = router;
