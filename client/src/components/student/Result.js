import React, { useEffect, useState } from "react";
import studentService from "../../services/student";
import { useParams } from "react-router";

export default function Result({ spinner }) {
  const [questions, setQuestions] = useState([]);
  const [assessmentResult, setAssessmentResult] = useState(null);
  const { type, id } = useParams();
  useEffect(() => {
    (async () => {
      spinner.setLoading(true);
      const { questions, result } = await studentService.getResult(id);
      setQuestions(questions);

      result.selectedAnswers = JSON.parse(result.selectedAnswers);
      setAssessmentResult(result);
      spinner.setLoading(false);
    })();
  }, []);

  return (
    <div>
      {assessmentResult ? (
        <>
          <ResultDetail resultDetail={assessmentResult} type={type} />
          {questions.length
            ? questions.map((qn, idx) => {
                return (
                  <QuestionView
                    key={idx}
                    question={qn}
                    index={idx}
                    selectedAnswer={assessmentResult.selectedAnswers[qn.id]}
                  />
                );
              })
            : null}
        </>
      ) : null}
    </div>
  );
}

function ResultDetail({ resultDetail, type }) {
  const {
    paper,
    totalMarks,
    obtainedMarks,
    totalQuestions,
    attempted,
    correct,
    wrong,
  } = resultDetail;
  return (
    <div className="card">
      <div className="card-body">
        <div className="row g-2 align-items-center">
          <div className="col-md-2 text-uppercase">
            <strong>{type} : </strong> {paper}
          </div>
          <div className="col-md-2">
            <strong>Total marks : </strong> {totalMarks}
          </div>
          <div className="col-md-2">
            <strong>Obtained marks : </strong> {obtainedMarks}
          </div>
          <div className="col-md-2">
            <strong>No. of questions : </strong> {totalQuestions}
          </div>
          <div className="col-md-2">
            <strong>Attempted : </strong> {attempted}
          </div>
          <div className="col-md-1">
            <strong>Correct : </strong> {correct}
          </div>
          <div className="col-md-1">
            <strong>Wrong : </strong> {wrong}
          </div>
        </div>
      </div>
    </div>
  );
}

function QuestionView({ question, index, selectedAnswer }) {
  const { id, body, answer } = question;
  const qBody = `Q ${index + 1}. ${body}`;
  const values = ["a", "b", "c", "d"];
  return (
    <div className="card mt-2 border">
      <div className="card-header">{qBody}</div>
      {values.map((value, index) => {
        return (
          <div
            key={index}
            className="btn btn-outline-dark border-light text-start"
          >
            <input
              className="btn-check"
              type="radio"
              name={id}
              value={value}
              id={id + value}
              autoComplete="off"
              disabled
            />
            <label htmlFor={id + value}>
              {`${value}. ${question[`option${value.toUpperCase()}`]}`}
            </label>
          </div>
        );
      })}
      <div>
        <div className="col w-50 btn btn-outline-dark border-light text-success">
          Correct answer : {answer}
        </div>
        <div className="col w-50 btn btn-outline-dark border-light text-secondary">
          Selected : {selectedAnswer ? selectedAnswer : "None"}
        </div>
      </div>
    </div>
  );
}
