import "../styles/navbar.css";
import SignUp from './SignUp';

function Navbar() {
  return (
    <div class="container-nav">
      <div class="logo">
        <img src="../src/assets/crilogo.png" alt="logo image" />
      </div>
      <nav>
        <ul>
          <li>
            <a href="/home" class="link">
              Home
            </a>
            <a href="/players" class="link">
              Players
            </a>
            <a href="/select-team" class="link">
              Select Team
            </a>
            <a href="budget" class="link">
              Budget
            </a>
            <a href="/leaderboard" class="link">
              Leaderboard
            </a>
            <a href="#" class="link">
              Spiriter
            </a>
          </li>
        </ul>
      </nav>

      <div class="login-button">
        <a href="/SignUp">
          <button class="btn-login">
            <i class="fa-solid fa-user"></i>Login
          </button>
        </a>
      </div>
    </div>
  );
}

export default Navbar;
