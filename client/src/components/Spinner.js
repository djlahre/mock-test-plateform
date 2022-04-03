import React from "react";

export default function Spinner() {
  return (
    <div className="position-fixed vw-100 vh-100 d-flex justify-content-center align-items-center spinner-container">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
