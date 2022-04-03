const authentication = require("./authentication");
const user = require("./user");
const facultyCTRL = require("./faculty");
const question = require("./question");
const reportedQuestion = require("./reportedQuestion");
const examAssessment = require("./examAssessment");
const subjectAssessment = require("./subjectAssessment");
const externalLink = require("./externalLink");
const generate = require("./assessment/generate");
const result = require("./assessment/result");

module.exports = {
  authentication,
  user,
  facultyCTRL,
  question,
  reportedQuestion,
  examAssessment,
  subjectAssessment,
  externalLink,
  assessment: {
    generate,
    result,
  },
};
