import React from "react";
import validator from "validator";

import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";

import { Link } from "react-router-dom";
import { removeError, setError } from "../../actions/ui";
import { startRegisterWithEmailPassword } from "../../actions/auth";

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.ui);
  const { loading } = state;

  const { form: formValues, handleInputChange } = useForm({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formValues;

  const handleRegister = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      dispatch(startRegisterWithEmailPassword(name, email, password));
    }
  };

  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(setError("Missing name"));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError("Wrong email"));
      return false;
    } else if (password !== password2) {
      dispatch(setError("Password doesnt match"));
      return false;
    } else if (!validator.isStrongPassword(password)) {
      dispatch(setError("Weak password"));
      return false;
    }

    dispatch(removeError());
    return true;
  };

  return (
    <div>
      <h3 className="auth__title">Register</h3>

      <form
        onSubmit={handleRegister}
        className="animate__animated animate__fadeIn"
      >
        {state.msgError && (
          <div className="auth__alert-error">{state.msgError}</div>
        )}

        <input
          type="text"
          placeholder="Name"
          name="name"
          className="auth__input"
          autoComplete="off"
          value={name}
          onChange={handleInputChange}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          className="auth__input"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="auth__input"
          value={password}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="Confirm password"
          name="password2"
          className="auth__input"
          value={password2}
          onChange={handleInputChange}
        />

        <button
          type="submit"
          className="btn btn-primary btn-block mb-5"
          disabled={loading}
        >
          Register
        </button>

        <Link className="link" to="/auth/login">
          Already have an account?
        </Link>
      </form>
    </div>
  );
};
