import React, { useRef } from "react";
import { NavLink, Link } from "react-router-dom";

export default function Navbar({ user }) {
  const toggleRef = useRef(null);
  const handleNavbar = () => {
    if (window.innerWidth <= 990) {
      toggleRef.current.click();
    }
  };
  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <NavLink className="navbar-brand brand-name fw-bold" to="/">
          MTP
        </NavLink>
        <button
          ref={toggleRef}
          className="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>
        <div
          className="navbar-collapse collapse"
          id="navbarNav"
          onClick={handleNavbar}
        >
          <div className="navbar-nav">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
            <NavLink className="nav-link" to="/about">
              About Us
            </NavLink>
          </div>
          <div className="navbar-nav ms-auto">
            {user.isLoggedIn ? (
              <>
                <Link className="btn btn-light" to="/dashboard">
                  Dashboard
                </Link>
                <span className="m-1"></span>
                <Link to="/" className="btn btn-danger" onClick={user.logout}>
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link to="/signin" className="btn btn-outline-light">
                  Sign in
                </Link>
                <span className="m-1"></span>
                <Link to="/signup" className="btn btn-light">
                  Create an account
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
