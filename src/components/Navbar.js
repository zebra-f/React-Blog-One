import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="Navbar">
      <Link to="/">React Blog One</Link>
      <div className="Navbar-2">
        <Link to="/login">Login</Link>
        <Link to="/register">Regsiter</Link>
        <Link to="/logout">Logout</Link>
        <Link to="/reacttest">React Test</Link>
      </div>
    </div>
  );
}

export default Navbar;
