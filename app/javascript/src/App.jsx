import React, { useEffect, useState } from "react";
import Dashboard from "components/Dashboard";
import CreateTask from "components/Tasks/CreateTask";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { registerIntercepts, setAuthHeaders } from "./apis/axios";
import { ToastContainer } from "react-toastify";

const App = () => {
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    // initializeLogger();
    registerIntercepts();
    setAuthHeaders(setLoading);
  }, []);

  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/tasks/create" component={CreateTask} />
      </Switch>
    </Router>
  );
};

export default App;
