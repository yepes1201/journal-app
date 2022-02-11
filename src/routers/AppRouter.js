import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Redirect, Switch } from "react-router-dom";

import { firebase } from "../firebase/firebase-config";
import { JournalScreen } from "../components/journal/JournalScreen";
import { AuthRouter } from "./AuthRouter";
import { login } from "../actions/auth";
import { LoadingWheel } from "../components/loading/LoadingWheel";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { startLoadingNotes } from "../actions/notes";

export const AppRouter = () => {
  const dispatch = useDispatch();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);

        dispatch(startLoadingNotes(user.uid));
      } else {
        setIsLoggedIn(false);
      }

      setChecking(false);
    });
  }, [dispatch]);

  if (checking) {
    return <LoadingWheel />;
  } else
    return (
      <Router>
        <div>
          <Switch>
            <PublicRoute
              isAuthenticated={isLoggedIn}
              path="/auth"
              component={AuthRouter}
            />
            <PrivateRoute
              exact
              isAuthenticated={isLoggedIn}
              path="/"
              component={JournalScreen}
            />

            <Redirect to="/auth/login" />
          </Switch>
        </div>
      </Router>
    );
};
