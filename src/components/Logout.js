import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import axiosInstance from "../api/axios";
import { UserContext } from "../UserContext";

function Logout() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  axiosInstance
    .post("/user/logout/blacklist/", {
      refresh: localStorage.getItem("refresh_token"),
    })
    .then((response) => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      axiosInstance.defaults.headers["Authorization"] = null;

      localStorage.removeItem("logged_in");
      localStorage.removeItem("email");
      setUser({
        ...user,
        loggedIn: null,
        email: null,
      });
      navigate("/");
    });

  return (
    <div className="Logout">
      <h2>Wait for a logout...</h2>
    </div>
  );
}

export default Logout;
