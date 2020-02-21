import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import { UserPage, PostPage, AnotherPage } from "./pages";
import "./app.css";

export default function App() {
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route exact={true} path="/">
            <UserPage />
          </Route>
          <Route exact={true} path="/post">
            <PostPage />
          </Route>
          <Route exact={true} path="/another">
            <AnotherPage />
          </Route>
        </Switch>
      </HashRouter>
    </div>
  );
}
