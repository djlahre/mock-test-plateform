import React, { useState, useEffect, lazy, Suspense } from "react";
import {
  Switch,
  Route,
  withRouter,
  useHistory,
  Redirect,
} from "react-router-dom";

import tokenService from "./services/token";
import Spinner from "./components/Spinner";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import ForgotPassword from "./components/auth/ForgotPassword";
import PageNotFound from "./components/PageNotFound";

const Dashboard = lazy(() => import("./components/student/Dashboard"));
const AssessmentList = lazy(() =>
  import("./components/student/AssessmentList")
);
const Assessment = lazy(() => import("./components/student/Assessment"));
const ResultList = lazy(() => import("./components/student/ResultList"));
const Result = lazy(() => import("./components/student/Result"));

function App(props) {
  const initialUser = {
    isLoggedIn: false,
    setUserToken: (authToken) => {
      tokenService.set(authToken);
      setUser({ ...user, isLoggedIn: true });
    },
    logout: () => {
      tokenService.del();
      setUser({ ...user, isLoggedIn: false });
    },
  };

  const history = useHistory();
  const [user, setUser] = useState(initialUser);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (tokenService.get()) {
      setUser({ ...user, isLoggedIn: true });
    } else {
      setUser({ ...user, isLoggedIn: false });
    }
    setLoading(false);
  }, [user.isLoggedIn]);

  const pathname = props.location.pathname;
  return (
    <>
      {isLoading ? <Spinner /> : null}
      {!pathname.includes("/attempting") ? <Navbar user={user} /> : null}
      <div className="container-fluid py-2 main-content">
        <Switch>
          <Route exact path="/">
            <Home spinner={{ isLoading, setLoading }} />
          </Route>
          <Route path="/about">
            <About />
          </Route>

          <Route path="/signin">
            {user.isLoggedIn ? (
              <Redirect to="/dashboard" />
            ) : (
              <SignIn
                user={user}
                history={history}
                spinner={{ isLoading, setLoading }}
              />
            )}
          </Route>
          <Route path="/signup">
            {user.isLoggedIn ? (
              <Redirect to="/dashboard" />
            ) : (
              <SignUp history={history} spinner={{ isLoading, setLoading }} />
            )}
          </Route>
          <Route path="/forgot-password">
            {user.isLoggedIn ? (
              <Redirect to="/dashboard" />
            ) : (
              <ForgotPassword
                spinner={{ isLoading, setLoading }}
                history={history}
              />
            )}
          </Route>

          {user.isLoggedIn ? (
            <Suspense fallback={<span></span>}>
              <Route path="/dashboard">
                <Dashboard spinner={{ isLoading, setLoading }} />
              </Route>
              <Route path="/assessment-list/:type">
                <AssessmentList spinner={{ isLoading, setLoading }} />
              </Route>
              <Route path="/attempting/:type/:id">
                <Assessment
                  spinner={{ isLoading, setLoading }}
                  history={history}
                />
              </Route>
              <Route path="/result-list/:type">
                <ResultList spinner={{ isLoading, setLoading }} />
              </Route>
              <Route path="/result/:type/:id">
                <Result spinner={{ isLoading, setLoading }} />
              </Route>
            </Suspense>
          ) : isLoading ? null : (
            <Redirect to="/signin" />
          )}

          <Route>
            <PageNotFound />
          </Route>
        </Switch>
      </div>
      {!pathname.includes("/attempting") ? <Footer /> : null}
    </>
  );
}

export default withRouter(App);
