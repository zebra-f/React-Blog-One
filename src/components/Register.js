import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axiosInstance from "../api/axios.js";

function Register() {
  const navigate = useNavigate();

  const initialFormData = Object.freeze({
    email: "",
    username: "",
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

    axiosInstance
      .post(`user/register/`, {
        email: formData.email,
        user_name: formData.username,
        password: formData.password,
      })
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        setSubmitError(true);
      });
  };

  return (
    <div className="Register">
      {/* Registration Form */}
      <br />
      {submitError && (
        <h2>Something went wrong, make sure to provide a correct form data.</h2>
      )}
      <form className="registration-form" action="">
        <div className="username">
          <label className="form__label">
            Username:
            <input
              className="form__input"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="Your Username"
            />
          </label>
        </div>
        <div className="email">
          <label className="form__label">
            Email:
            <input
              className="form__input"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
            />
          </label>
        </div>
        <div className="password">
          <label className="form__label">
            Password:
            <input
              className="form__input"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Your Password"
            />
          </label>
        </div>
        <div className="registraton-submit-button">
          <button onClick={handleSubmit} type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
