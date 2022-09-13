import { Link } from "react-router-dom";
import { useContext } from "react";

import { UserContext } from "../UserContext";

function Navbar() {
  const { user, setUser } = useContext(UserContext);

  return (
    <div className="Navbar">
      <Link to="/">React Blog One</Link>
      <div className="Navbar-2">
        {user.loggedIn ? (
          <Link to="/logout">Logout {user.email}</Link>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Regsiter</Link>
          </>
        )}

        <Link to="/reacttest">React Test</Link>
      </div>
    </div>
  );
}

export default Navbar;
