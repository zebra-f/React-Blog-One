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
      setUser({
        ...user,
        loggedIn: false,
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
