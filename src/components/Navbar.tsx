import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <h1>The Navbar Component
        <NavLink exact activeClassName="active" to="/">Landing</NavLink>
        <NavLink activeClassName="active" to="/dashboard">Dashboard</NavLink>
      </h1>
    </div>
  );
};

export default Navbar;