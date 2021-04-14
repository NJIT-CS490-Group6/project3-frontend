import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { NavLink } from 'react-router-dom';

const MainNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">Lets Hangout!</Navbar.Brand>
      <Nav className="mr-auto">
        <NavLink to="/" activeClassName="active">Home</NavLink>
        <NavLink to="/dashboard" activeClassName="active">Dashboard</NavLink>
      </Nav>
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          Signed in as: <a href="/dashboard">Test User</a>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MainNavbar;