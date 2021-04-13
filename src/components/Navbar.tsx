import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <NavLink exact activeClassName="active" to="/">Landing</NavLink>
      <NavLink activeClassName="active" to="/dashboard">Dashboard</NavLink>
    </div>
  );
};

export default Navbar;