import Swal from "sweetalert2";

import { types } from "../types/types";
import { firebase, googleAuthProvider } from "../firebase/firebase-config";
import { finishLoading, startLoading } from "./ui";
import { noteLogout } from "./notes";

export const startLogout = () => {
  return async (dispatch) => {
    dispatch(startLoading());

    await firebase.auth().signOut();
    dispatch(logout());
    dispatch(noteLogout());

    dispatch(finishLoading());
  };
};

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading());

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));

        dispatch(finishLoading());
      })
      .catch(({ message }) => {
        Swal.fire("Oops!", message, "error");

        dispatch(finishLoading());
      });
  };
};

export const startRegisterWithEmailPassword = (name, email, password) => {
  return (dispatch) => {
    dispatch(startLoading());

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await user.updateProfile({ displayName: name });
        dispatch(login(user.uid, user.displayName));

        dispatch(finishLoading());
      })
      .catch(({ message }) => {
        Swal.fire("Oops!", message, "error");

        dispatch(finishLoading());
      });
  };
};

export const startGoogleLogin = () => {
  return (dispatch) => {
    dispatch(startLoading());

    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));

        dispatch(finishLoading());
      })
      .catch((e) => {
        dispatch(finishLoading());
      });
  };
};

export const login = (uid, displayName) => {
  return {
    type: types.login,
    payload: {
      uid,
      name: displayName,
    },
  };
};

export const logout = () => {
  return {
    type: types.logout,
  };
};
