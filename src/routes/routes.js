import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "../pages/loginPage/login";
import VideoLayout from "../pages/VideoLayout";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/room" component={VideoLayout} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
