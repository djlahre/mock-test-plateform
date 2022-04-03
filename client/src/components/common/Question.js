import React from "react";
import { Field } from "formik";
import studentService from "../../services/student";

export default function Question({ question, index, spinner }) {
  const { id, body } = question;
  const qBody = `Q ${index + 1}. ${body}`;
  const values = ["a", "b", "c", "d"];
  return (
    <div className="card mt-2 border">
      <div className="card-header">{qBody}</div>
      {values.map((value, index) => {
        return (
          <div key={index}>
            <Field
              className="btn-check"
              type="radio"
              name={id}
              value={value}
              id={id + value}
              autoComplete="off"
            />
            <label
              className="btn btn-outline-dark border-light w-100 text-start"
              htmlFor={id + value}
            >
              {`${value}. ${question[`option${value.toUpperCase()}`]}`}
            </label>
          </div>
        );
      })}
      <ReportButton qid={id} spinner={spinner} />
    </div>
  );
}

function ReportButton({ qid, spinner }) {
  const handleReportSubmit = async (msg) => {
    spinner.setLoading(true);
    const data = {
      reportMessage: msg,
      QuestionId: qid,
    };
    const res = await studentService.reportQuestion(data);
    if (res) alert("Question report accepted.");
    spinner.setLoading(false);
  };
  return (
    <div className="dropdown my-1 ms-auto">
      <button
        className="btn btn-outline-light btn-sm dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-mdb-toggle="dropdown"
        aria-expanded="false"
      >
        <i className="fas fa-flag text-danger"></i>
      </button>
      <ul className="dropdown-menu">
        <li>
          <button
            type="button"
            className="dropdown-item"
            onClick={() => handleReportSubmit("wrong answer")}
          >
            Wrong answer
          </button>
        </li>
        <li>
          <button
            type="button"
            className="dropdown-item"
            onClick={() => handleReportSubmit("formatting issue")}
          >
            Formatting issue
          </button>
        </li>
      </ul>
    </div>
  );
}
