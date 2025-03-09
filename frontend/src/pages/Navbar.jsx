import "../styles/navbar.css";
import SignUp from './SignUp';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    // Redirect to login page
    navigate('/Login');
  };

  return (
    <div className="container-nav">
      <div className="logo">
        <img src="../src/assets/crilogo.png" alt="logo image" />
      </div>
      <nav>
        <ul>
          <li>
            <a href="/home" className="link">
              Home
            </a>
            <a href="/players" className="link">
              Players
            </a>
            <a href="/select-team" className="link">
              Select Team
            </a>
            <a href="budget" className="link">
              Budget
            </a>
            <a href="/leaderboard" className="link">
              Leaderboard
            </a>
            <a href="#" className="link">
              Spiriter
            </a>
          </li>
        </ul>
      </nav>

      <div className="login-button">
        {isLoggedIn ? (
          <button className="btn-login" onClick={handleLogout}>
            <i className="fa-solid fa-right-from-bracket"></i>Logout
          </button>
        ) : (
          <a href="/SignUp">
            <button className="btn-login">
              <i className="fa-solid fa-user"></i>Login
            </button>
          </a>
        )}
      </div>
    </div>
  );
}

export default Navbar;