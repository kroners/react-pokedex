import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import pokeballIcon from "../assets/pokeball.svg";

function Layout({ children, title = "Pokédex", hideHeader = false }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="app-root">
      {!hideHeader && (
        <header className="app-header">
          <div className="app-header-left">
            <img src={pokeballIcon} alt="" className="header-icon" />
            <h1 className="app-title">{title}</h1>
          </div>

          <button className="btn-secondary" onClick={handleLogout}>
            Logout
          </button>
        </header>
      )}

      <main className="app-main">{children}</main>
    </div>
  );
}

export default Layout;
