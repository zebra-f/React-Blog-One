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
    console.log(formData);

    axiosInstance
      .post(`user/register/`, {
        email: formData.email,
        user_name: formData.username,
        password: formData.password,
      })
      .then((response) => {
        console.log(response);
        console.log(response.data);
        navigate("/login");
      })
      .catch((error) => {
        setSubmitError(true);
        console.log(error);
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
          <label className="form__label">Username: </label>
          <input
            className="form__input"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            placeholder="Your Username"
          />
        </div>
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
