import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <h1>Property Management</h1>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/add-property">Add Property</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;




