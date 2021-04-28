import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { Friend } from '../models/friend.model';

import "../styles/MainNavbar.css";

interface MainNavbarProps {
  currentUser: Friend;
}

const MainNavbar = (props: MainNavbarProps) => {
  const { currentUser } = props;
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">Hangout</Navbar.Brand>
      <Nav className="mr-auto">
        <NavLink to="/dashboard" className="navlink" activeClassName="active">
          Dashboard
        </NavLink>
      </Nav>
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          Signed in as: <NavLink to="/profile/logged-in-user-id">{currentUser.username}</NavLink>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MainNavbar;
