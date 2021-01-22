import React, { useEffect, useState } from "react";
import Dashboard from "components/Dashboard";
import CreateTask from "components/Tasks/CreateTask";
import ShowTask from "components/Tasks/ShowTask";
import EditTask from "components/Tasks/EditTask";
import Signup from "components/Authentication/Signup";
import Login from "components/Authentication/Login";
import PrivateRoute from "components/Common/PrivateRoute";
import PageLoader from "components/PageLoader";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { registerIntercepts, setAuthHeaders } from "./apis/axios";
import { ToastContainer } from "react-toastify";
import { either, isEmpty, isNil } from "ramda";
import { getFromLocalStorage } from "helpers/storage";

const App = () => {
  let [loading, setLoading] = useState(true);
  const authToken = getFromLocalStorage("authToken");
  // console.log(authToken);
  const isLoggedIn = !either(isNil, isEmpty)(authToken) && authToken != "null";
  // let [isLoggedIn, setIsLoggedIn] = useState(
  //   !either(isNil, isEmpty)(authToken) && authToken != "null"
  // );
  // console.log(isLoggedIn);

  useEffect(() => {
    // initializeLogger();
    registerIntercepts();
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Router>
      <ToastContainer />
      <Switch>
        {/* <Route exact path="/" component={Dashboard} /> */}
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/tasks/create" component={CreateTask} />
        <Route exact path="/tasks/:id/show" component={ShowTask} />
        <Route exact path="/tasks/:id/edit" component={EditTask} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        {/* <Route exact path="/login">
          <Login setIsLoggedIn={setIsLoggedIn} />
        </Route> */}
        <PrivateRoute
          path="/"
          redirectRoute="/login"
          condition={isLoggedIn}
          component={Dashboard}
        />
      </Switch>
    </Router>
  );
};

export default App;
