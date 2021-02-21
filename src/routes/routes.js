import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "../pages/loginPage/login";
import { Provider } from "react-redux";
import store from "../store";

const VideoPage = React.lazy(() => import("../pages/videoPage"));

function Routes() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/room" component={VideoPage} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default Routes;
