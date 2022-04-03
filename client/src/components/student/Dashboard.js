import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import externalLink from "../../services/externalLink";

export default function Dashboard({ spinner }) {
  const [studyMaterials, setStudyMaterials] = useState([]);

  useEffect(() => {
    (async () => {
      spinner.setLoading(true);
      const data = await externalLink.getLinks("study-material");
      if (data) setStudyMaterials(data);
      spinner.setLoading(false);
    })();
  }, []);

  return (
    <>
      <div className="row g-2">
        <div className="col-md-6">
          <div className="card">
            <h4 className="card-header">Exam assessments</h4>
            <div className="card-body">
              <p className="card-text">
                As you can see above, validation is left up to you. Feel free to
                write your own validators or use a 3rd party library. At The
                Palmer Group, we use Yup for object schema validation. As you
                can see above, validation is left up to you. Feel free to write.
              </p>
              <Link to="/assessment-list/exam" className="btn btn-primary">
                Take test
              </Link>
              <span className="m-1"></span>
              <Link to="/result-list/exam" className="btn btn-light">
                View results
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <h4 className="card-header">Subject assessments</h4>
            <div className="card-body">
              <p className="card-text">
                As you can see above, validation is left up to you. Feel free to
                write your own validators or use a 3rd party library. At The
                Palmer Group, we use Yup for object schema validation. As you
                can see above, validation is left up to you. Feel free to write.
              </p>
              <Link to="/assessment-list/subject" className="btn btn-primary">
                Take test
              </Link>
              <span className="m-1"></span>
              <Link to="/result-list/subject" className="btn btn-light">
                View results
              </Link>
            </div>
          </div>
        </div>
      </div>

      {studyMaterials.length ? (
        <div className="card mt-2">
          <h4 className="card-header">Study materials</h4>
          <div className="card-body">
            <div className="row g-2">
              <StudyCard data={studyMaterials} />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function StudyCard({ data }) {
  return (
    <>
      {data.map((dt, index) => {
        return (
          <div className="col-md-3" key={index}>
            <div className="card text-center border border-secondary">
              <div className="card-body">
                <h6 className="text-uppercase">{dt.title}</h6>
                <Link
                  to={{ pathname: dt.link }}
                  target="_blank"
                  className="btn btn-sm btn-secondary"
                >
                  Read here
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
