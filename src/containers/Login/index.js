import React, { useState } from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { authUser, signUp } from "../../store/actions/authActions";
import Navbar from "../../components/Navbar";
import "./Login.css";

const Login = ({ authUser, authError, authId }) => {
  const [register, setRegister] = useState(false);

  const handleLogin = (values) => {
    console.log("login", values);
    authUser(values);
  };

  const handleRegister = (values) => {
    console.log("register", values);
    signUp(values);
  };

  if (authId) return <Redirect to="/" />;

  return (
    <div className="login">
      <Navbar />

      <div className="login-wrap">
        <div className="form-login">
          <Formik
            initialValues={{ email: "", password: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              return errors;
            }}
            onSubmit={register ? handleRegister : handleLogin}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit} className="formik">
                {register ? (
                  <h4 className="login-title">Please register.</h4>
                ) : (
                  <h4 className="login-title">Welcome back.</h4>
                )}
                {authError ? <p className="error">{authError}</p> : null}
                <input
                  type="email"
                  name="email"
                  placeholder="email@mail.com"
                  className="input-field"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {errors.email && touched.email && errors.email}
                <input
                  placeholder="password"
                  type="password"
                  name="password"
                  className="input-field"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {errors.password && touched.password && errors.password}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="input-btn"
                >
                  {register ? "register" : "login"}
                </button>
                <div className="login-register">
                  {register ? (
                    <p>
                      Already an user?{" "}
                      <a onClick={() => setRegister(false)}> LogIn.</a>{" "}
                    </p>
                  ) : (
                    <p>
                      Not an user?{" "}
                      <a onClick={() => setRegister(true)}> Register.</a>{" "}
                    </p>
                  )}
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  authUser: PropTypes.func.isRequired,
  authError: PropTypes.string,
};
const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    authId: state.firebase.auth.uid,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authUser: (user) => dispatch(authUser(user)),
    signUp: (user) => dispatch(signUp(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
