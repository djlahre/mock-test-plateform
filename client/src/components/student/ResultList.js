import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import studentService from "../../services/student";
import utils from "../../utils";

export default function ResultList({ spinner }) {
  const { type } = useParams();
  const [results, setResults] = useState([]);
  useEffect(() => {
    (async () => {
      spinner.setLoading(true);
      const data = await studentService.getResults(type);
      if (data) setResults(data);
      spinner.setLoading(false);
    })();
  }, []);

  return (
    <>
      {results.length ? (
        <>
          <div className="card mb-2">
            <h4 className="card-header">Results</h4>
            {results.map((result, index) => {
              const { id, paper, totalMarks, obtainedMarks, createdAt } =
                result;
              return (
                <div className="card-body border-top" key={index}>
                  <div className="row g-2 align-items-center">
                    <div className="col-md-2 text-uppercase">
                      <strong>{type} : </strong>
                      {paper}
                    </div>
                    <div className="col-md-2">
                      <strong>Total marks : </strong> {totalMarks}
                    </div>
                    <div className="col-md-3">
                      <strong>Obtained marks : </strong> {obtainedMarks}
                    </div>
                    <div className="col-md-3">
                      <strong>Attempted date : </strong>
                      {utils.getFullDate(createdAt)}
                    </div>
                    <div className="col-md-2">
                      <Link
                        to={`/result/${type}/${id}`}
                        className="btn btn-secondary"
                      >
                        View answers
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
            Currently no result available, please attempt some assessment.
          </h6>
        </div>
      )}
    </>
  );
}
