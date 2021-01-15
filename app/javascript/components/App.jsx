import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import TasksIndex from "./Tasks/Index";

const App = (props) => {
  console.log("props");
  console.log(props);
  return (
    <div>
      <Router>
        <Link to="/tasks">Tasks</Link>

        <Switch>
          <Route path="/tasks" component={TasksIndex} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
