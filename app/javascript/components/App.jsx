import React from "react";
import Dashboard from "components/Dashboard";
import CreateTask from "components/Tasks/CreateTask";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/tasks/create" component={CreateTask} />
      </Switch>
    </Router>
  );
};

export default App;

// import React from "react";

// const App = () => {
//   return <h1>This is App.jsx</h1>;
// };

// export default App;

// import React, { useEffect } from "react";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// import TasksIndex from "./Tasks/Index";

// const App = (props) => {
//   console.log("props");
//   console.log(props);
//   return (
//     <div>
//       <Router>
//         <Link to="/tasks">Tasks</Link>

//         <Switch>
//           <Route path="/tasks" component={TasksIndex} />
//         </Switch>
//       </Router>
//     </div>
//   );
// };

// export default App;
