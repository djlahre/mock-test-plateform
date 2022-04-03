import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import studentService from "../../services/student";

export default function AssessmentList({ spinner }) {
  const { type } = useParams();
  const [assessmentList, setAssessmentList] = useState([]);
  useEffect(() => {
    (async () => {
      spinner.setLoading(true);
      const data = await studentService.getAssessments(type);
      if (data) setAssessmentList(data);
      spinner.setLoading(false);
    })();
  }, []);

  return (
    <>
      {assessmentList.length ? (
        <>
          <div className="card mb-2">
            <h4 className="card-header">Available {type}s</h4>
            {assessmentList.map((assessment, index) => {
              const { id, name, totalQuestions, time } = assessment;
              return (
                <div className="card-body border-top" key={index}>
                  <div className="row g-2 align-items-center">
                    <div className="col-md-3 text-uppercase">
                      <strong>{type} : </strong> {name}
                    </div>
                    <div className="col-md-3">
                      <strong>Time : </strong> {time} minutes
                    </div>
                    <div className="col-md-3">
                      <strong>No. of questions : </strong> {totalQuestions}
                    </div>
                    <div className="col-md-3">
                      <Link
                        to={`/attempting/${type}/${id}`}
                        className="btn btn-success"
                      >
                        Attempt
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : spinner.isLoading ? null : (
        <div className="card">
          <h6 className="card-body">
            Currently no assessment available, please try after some time.
          </h6>
        </div>
      )}
    </>
  );
}
