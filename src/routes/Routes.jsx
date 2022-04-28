import React from "react";

import { Route, Switch } from "react-router-dom";

import Public from "../pages/Public";
import Private from "../pages/Private";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Public} />
      <Route path="/Login" component={Login} />

      <Route path="/SignUp" component={SignUp} />
      <Route path="/Private" component={Private} />
    </Switch>
  );
};

export default Routes;
