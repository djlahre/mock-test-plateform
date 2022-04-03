import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Formik, Form } from "formik";
import studentService from "../../services/student";
import Timer from "../common/Timer";
import Question from "../common/Question";

export default function Assessment({ history, spinner }) {
  const { type, id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [assessment, setAssessment] = useState(null);
  useEffect(() => {
    (async () => {
      alert("Don't refresh page while attempting test.");
      spinner.setLoading(true);
      const assessmentInfo = await studentService.getAssessmentInfo(type, id);
      if (assessmentInfo) setAssessment(assessmentInfo);
      const assessmentQuestions = await studentService.attemptAssessment(
        type,
        assessmentInfo.id
      );
      if (assessmentQuestions) setQuestions(assessmentQuestions);
      spinner.setLoading(false);
    })();
  }, []);

  const handleSubmit = async (selectedAnswers, actions) => {
    spinner.setLoading(true);
    const { id, name, totalQuestions, markForCorrectAnswer, negativeMark } =
      assessment;

    const correctAnswers = {};
    questions.map((qn) => (correctAnswers[qn.id] = qn.answer));
    const result = {
      paper: name,
      totalQuestions,
      correct: 0,
      wrong: 0,
      obtainedMarks: 0,
      attempted: Object.keys(selectedAnswers).length,
      totalMarks: Number(totalQuestions) * Number(markForCorrectAnswer),
      correctAnswers: JSON.stringify(correctAnswers),
      selectedAnswers: JSON.stringify(selectedAnswers),
      assessmentType: type,
      assessmentId: id,
    };

    for (const qid in selectedAnswers) {
      if (
        correctAnswers[qid].toLowerCase() === selectedAnswers[qid].toLowerCase()
      ) {
        result.obtainedMarks += Number(markForCorrectAnswer);
        result.correct++;
      } else {
        result.obtainedMarks -= Number(negativeMark);
        result.wrong++;
      }
    }

    const res = await studentService.submitResult(result);
    spinner.setLoading(false);
    if (res) {
      actions.setSubmitting(false);
      alert("Submission successful.");
      history.replace(`/result/${type}/${res.id}`);
    } else {
      actions.setSubmitting(false);
      alert("Submission failed.");
      history.replace(`/dashboard`);
    }
  };

  return (
    <div>
      <Formik initialValues={{}} onSubmit={handleSubmit}>
        {({ isSubmitting, submitForm }) => (
          <div>
            {assessment ? (
              <>
                <Timer
                  timeInMinutes={assessment.time}
                  handleSubmit={submitForm}
                />
                <AssessmentDetail assessment={assessment} />
              </>
            ) : null}
            {questions.length ? (
              <Form>
                {questions.map((qn, idx) => {
                  return (
                    <Question
                      key={idx}
                      question={qn}
                      index={idx}
                      spinner={spinner}
                    />
                  );
                })}
                <button
                  type="submit"
                  className="btn btn-primary my-2"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              </Form>
            ) : null}
          </div>
        )}
      </Formik>
    </div>
  );
}

function AssessmentDetail({ assessment }) {
  const { name, time, totalQuestions, markForCorrectAnswer, negativeMark } =
    assessment;
  return (
    <div className="card">
      <div className="card-body">
        <div className="row g-2 align-items-center">
          <div className="col-md-2 text-uppercase">
            <strong>Paper :</strong> {name}
          </div>
          <div className="col-md-2">
            <strong>Time :</strong> {time} minutes
          </div>
          <div className="col-md-3">
            <strong>No. of questions :</strong> {totalQuestions}
          </div>
          <div className="col-md-3">
            <strong>Mark for correct :</strong> {markForCorrectAnswer}
          </div>
          <div className="col-md-2">
            <strong>Negative mark :</strong> {negativeMark}
          </div>
        </div>
      </div>
    </div>
  );
}
