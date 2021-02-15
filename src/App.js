import React, {useEffect} from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { createBrowserHistory } from "history";

import Dashboard from "./pages/Dashboard"
import Message from "./pages/Message"
import Comment from "./pages/Comment"

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <div className="App">
        <Route exact path="/" component={Dashboard}></Route>
        <Route exact path="/message/:id/:num/:profile" component={Message}></Route>
        <Route exact path="/comment/:account/:username/:num/:profile" component={Comment}></Route>
      </div>
    </Router>
  );
}

export default App;
