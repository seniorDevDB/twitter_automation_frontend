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
import Report from './pages/Report';
import Lead from './pages/Lead';
import Landing from './pages/Landing';
import Join from './pages/Join';
import TwitterAccount from './pages/TwitterAccount';

import {} from "./api/Socket"

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      {localStorage.token ? (
        <div className="App">
          <Navbar/>
          <Route exact path="/" component={Landing}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/join" component={Join}></Route>
          <Route exact path="/dashboard" component={Dashboard}></Route>
          <Route exact path="/message/:id/:num/:profile" component={Message}></Route>
          <Route exact path="/comment/:account/:username/:num/:profile" component={Comment}></Route>
          <Route exact path="/comment-inbox" component={CommentInbox}></Route>
          <Route exact path="/dm-inbox" component={DmInbox}></Route>
          <Route exact path="/report" component={Report}></Route>
          <Route exact path="/twitter_account" component={TwitterAccount}></Route>
          <Route exact path="/lead" component={Lead}></Route>
        </div>
      ) : (
        <div className="App" style={{backgroundColor:"#42389d"}}>
        <Navbar/>
        <Route exact path="/" component={Landing}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/join" component={Join}></Route>
        <Route exact path="/dashboard" component={Dashboard}></Route>
        <Route exact path="/message/:id/:num/:profile" component={Message}></Route>
        <Route exact path="/comment/:account/:username/:num/:profile" component={Comment}></Route>
        <Route exact path="/comment-inbox" component={CommentInbox}></Route>
        <Route exact path="/dm-inbox" component={DmInbox}></Route>
        <Route exact path="/report" component={Report}></Route>
        <Route exact path="/lead" component={Lead}></Route>
      </div>
      )}

    </Router>
  );
}

export default App;
