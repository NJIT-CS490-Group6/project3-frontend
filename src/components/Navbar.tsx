import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <Link to="/">Landing</Link>
      <Link to="/dashboard">Dashboard</Link>
    </div>
  );
};

export default Navbar;