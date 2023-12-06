import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/Navbar.css";
import logo from "../Images/logo1.png";
import { jwtDecode } from "jwt-decode";

function Navbar() {
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserRole = localStorage.getItem("token");
    console.log("Stored Token:", storedUserRole);

    if (storedUserRole) {
      try {
        const decoded = jwtDecode(storedUserRole);
        console.log("Decoded Token:", decoded);

        setUserRole(decoded.role);
        console.log("User Role:", decoded.role);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserRole("");
    navigate("/login");
    console.log("Logout clicked");
  };

  return (
    <div className="container-navbar">
      <div className="Navbar">
        <Link to={userRole === "admin" ? "/home" : null} className="logo-link">
          <img className="logo" src={logo} alt="Logo" />
        </Link>
        <div className="button-navbar">
          {userRole === "admin" ? (
            <>
              <Link to="/users" className="btn btn-light button">
                Edit User
              </Link>
              <button
                type="button"
                className="btn btn-light button"
                onClick={handleLogout}
              >
                Log Out
              </button>
            </>
          ) : userRole === "user" ? (
            <button
              type="button"
              className="btn btn-light button"
              onClick={handleLogout}
            >
              Log Out
            </button>
          ) : (
            <>
              {window.location.pathname === "/login" ? (
                <Link to="/register" className="btn btn-light button">
                  Register
                </Link>
              ) : (
                <Link to="/login" className="btn btn-light button">
                  Login
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
