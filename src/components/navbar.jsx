import React from "react";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="navbar bg-light navbar-expand-md">
      <div className="container-fluid">
        <span className="navbar-brand" href="#">
          Movies
        </span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              Movies
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav flex-grow-1 pe-3">
              <li className="nav-item mx-2">
                <NavLink className="nav-link" to="/">
                  Movies
                </NavLink>
              </li>
              <li className="nav-item mx-2">
                <NavLink className="nav-link" to="/customers">
                  Customers
                </NavLink>
              </li>
              <li className="nav-item mx-2">
                <NavLink className="nav-link" to="/rental">
                  Rental
                </NavLink>
              </li>
            </ul>
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item mx-2">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
              <li className="nav-item mx-2">
                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
