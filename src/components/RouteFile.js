import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import SignUp from '../pages/SignUp';
import UserPage from '../pages/users/UserPage';

export default function RouteFile() {
  return (
    <>
      <Switch>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/users/:userId">
          <UserPage />
        </Route>
        <Route path="/">
          <Home />
        </Route>

      </Switch>
    </>
  );
}
