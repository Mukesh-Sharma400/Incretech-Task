import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actionType from "../constants/actionTypes";

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    navigate("/login");
    setUser(null);
  };

  return (
    <div className="bg-primary">
      <header className="container d-flex justify-content-between py-3 mb-4">
        <Link to="/" className="mb-3 mb-md-0 me-md-auto text-decoration-none">
          <span className="fs-4 text-white">MERN Task</span>
        </Link>
        <div>
          {user ? (
            <div className="d-flex align-items-center">
              <span className="fs-4 text-white">{user.result.name}</span>
              <button
                type="button"
                className="btn btn-light ms-2"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          ) : (
            <div>
              <Link to="/login">
                <button type="button" className="btn btn-light">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button type="button" className="btn btn-light ms-2">
                  Register
                </button>
              </Link>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default Navbar;
