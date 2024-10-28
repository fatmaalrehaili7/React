import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("isSignedIn"); 
    navigate("/login"); 
  };
  return (
    <header className="header">
      <h1>Property Management</h1>
      <nav class="navbar">
        <ul class="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/add-property">Add Property</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
         {localStorage.getItem("isSignedIn") === "true" && (
          <button onClick={handleLogout}>Logout</button> // Render the logout button if signed in
        )}
      </nav>
    </header>
  );
};





