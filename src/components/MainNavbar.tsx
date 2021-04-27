import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

import "../styles/MainNavbar.css";

const MainNavbar = () => (
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="/">Lets Hangout!</Navbar.Brand>
    <Nav className="mr-auto">
      <NavLink to="/" className="navlink" exact activeClassName="active">
        Home
      </NavLink>
      <NavLink to="/dashboard" className="navlink" activeClassName="active">
        Dashboard
      </NavLink>
      <NavLink to="/profile" className="navlink" activeClassName="active">
        Profile
      </NavLink>
    </Nav>
    <Navbar.Collapse className="justify-content-end">
      <Navbar.Text>
        Signed in as: <NavLink to="/profile/logged-in-user-id">Test User</NavLink>
      </Navbar.Text>
    </Navbar.Collapse>
  </Navbar>
);

export default MainNavbar;
