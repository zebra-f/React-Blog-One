import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import axiosInstance from "../api/axios.js";
import { UserContext } from "../UserContext.js";

function Login() {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);

  const initialFormData = Object.freeze({
    email: "",
    password: "",
  });

  const [formData, setFormData] = useState(initialFormData);
  const [submitError, setSubmitError] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    axiosInstance
      .post(`token/`, {
        email: formData.email,
        password: formData.password,
      })
      .then((response) => {
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
        axiosInstance.defaults.headers["Authorization"] =
          "JWT " + localStorage.getItem("access_token");

        localStorage.setItem("logged_in", true);
        localStorage.setItem("email", formData.email);
        setUser({
          ...user,
          loggedIn: true,
          email: formData.email,
        });
        navigate("/");
      })
      .catch((error) => {
        setSubmitError(true);
        console.log(error);
      });
  };

  return (
    <div className="Login">
      {/* Login Form */}
      <br />
      {submitError && <h2>Wrong credentials, try again.</h2>}
      <form className="login-form" action="">
        <div className="email">
          <label className="form__label">Email: </label>
          <input
            className="form__input"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
          />
        </div>
        <div className="password">
          <label className="form__label">Password: </label>
          <input
            className="form__input"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Your Password"
          />
        </div>
        <div className="login-submit-button">
          <button onClick={handleSubmit} type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
