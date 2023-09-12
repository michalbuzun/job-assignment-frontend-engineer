import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import Article from "./Article";
import ArticleList from "./ArticleList";
import Editor from "./Editor";
import LoginRegister from "./LoginRegister";
import Login from "./Login";
import Profile from "./Profile";
import Settings from "./Settings";

import UserProvider from "./context/UserContext";
import Layout from "components/Layout";

function App() {
  return (
    <UserProvider>
      <Layout>
        <Router>
          <Switch>
            <Route path="/editor" exact component={Editor} />
            <Route path="/editor/:slug" exact component={Editor} />
            <Route path="/login" exact component={Login} />
            <Route path="/profile/:username" exact component={Profile} />
            <Route path="/profile/:username/favorites" exact component={Profile} />
            <Route path="/register" exact component={LoginRegister} />
            <Route path="/settings" exact component={Settings} />
            <Route path="/:slug" exact component={Article} />
            <Route path="/" component={ArticleList} />
          </Switch>
        </Router>
      </Layout>
    </UserProvider>
  );
}

export default App;
