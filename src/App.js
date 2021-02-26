import React, {useEffect} from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { createBrowserHistory } from "history";

import Dashboard from "./pages/Dashboard"
import Message from "./pages/Message"
import Comment from "./pages/Comment"
import Navbar from "./pages/Navbar";
import Login from "./pages/Login";
import CommentInbox from './pages/CommentInbox';
import DmInbox from './pages/DmInbox';

import {} from "./api/Socket"

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <div className="App">
        <Navbar hasHamburger={false} open={false} />
        <Route exact path="/" component={Dashboard}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/message/:id/:num/:profile" component={Message}></Route>
        <Route exact path="/comment/:account/:username/:num/:profile" component={Comment}></Route>
        <Route exact path="/comment-inbox" component={CommentInbox}></Route>
        <Route exact path="/dm-inbox" component={DmInbox}></Route>
      </div>
    </Router>
  );
}

export default App;
