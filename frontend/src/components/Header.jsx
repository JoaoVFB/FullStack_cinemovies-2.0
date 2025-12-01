import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import iconStar from "../assets/star.png";
import "./header.css";

import { useAuth } from "../contexts/AuthContext"; 

function Header() {
  const { user, logout } = useAuth(); 
  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="home-link">
          <img src={Logo} className="logo" alt="logo" />
          <h1>Cine Movies</h1>
        </Link>
      </div>

      <div className="header-right">
        {user ? (
          <>
            {/* Exibe Favoritos apenas se logado */}
            <Link to="/favoritos" className="favoritos-link">
              <img src={iconStar} alt="StarIcon" className="star-icon" />
              <h3 className="favoritos">Favoritos</h3>
            </Link>
            {/* Botão de Logout */}
            <button onClick={logout} className="logout-button">
              Logout ({user.name || user.email})
            </button>
          </>
        ) : (
          // Exibe Login se deslogado
          <Link to="/login" className="login-link">
            <h3>Login</h3>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
