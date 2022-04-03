import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import externalLinkService from "../services/externalLink";

export default function Home({ spinner }) {
  const [importantLinks, setImportantLinks] = useState([]);
  const [currentOpenings, setCurrentOpenings] = useState([]);
  useEffect(() => {
    (async () => {
      spinner.setLoading(true);
      const links = await externalLinkService.getLinks("important");
      if (links) setImportantLinks(links);
      const openings = await externalLinkService.getLinks("current-opening");
      if (openings) setCurrentOpenings(openings);
      spinner.setLoading(false);
    })();
  }, []);

  return (
    <>
      <div className="card mb-2">
        <div className="card-body text-center">
          <h3 className="text-uppercase">Mock test plateform</h3>
        </div>
      </div>

      {importantLinks.length ? (
        <ExternalLink heading="Important links" data={importantLinks} />
      ) : null}
      {currentOpenings.length ? (
        <ExternalLink heading="Current openings" data={currentOpenings} />
      ) : null}
    </>
  );
}

function ExternalLink({ heading, data }) {
  return (
    <div className="card mb-2">
      <h4 className="card-header">{heading}</h4>
      {data.map((dt, index) => {
        return (
          <div key={index} className="card-body py-2 border-top">
            <div className="row align-items-center">
              <div className="col-7 fw-bold text-uppercase">{dt.title}</div>
              <div className="col-5 text-end">
                <Link
                  to={{ pathname: dt.link }}
                  target="_blank"
                  className="btn btn-outline-light text-primary"
                >
                  Click here
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
