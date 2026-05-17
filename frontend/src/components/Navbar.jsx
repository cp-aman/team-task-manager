import { useContext } from "react";

import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

const Navbar = () => {

  const navigate = useNavigate();

  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {

    logout();

    navigate("/login");
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        padding: "20px",
        borderBottom: "1px solid black",
      }}
    >

      <Link to="/dashboard">
        Dashboard
      </Link>

      <Link to="/projects">
        Projects
      </Link>

      <span>
        {user?.name}
      </span>

      <button onClick={handleLogout}>
        Logout
      </button>

    </div>
  );
};

export default Navbar;