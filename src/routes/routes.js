import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "../pages/loginPage/login";

const VideoPage = React.lazy(() => import("../pages/videoPage"));

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/room" component={VideoPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
