import { NavLink } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

export function Layout({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  // Load dark mode preference from localStorage on mount
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
  };

  return (
    <div className={`app-container ${darkMode ? 'dark' : ''}`}>
      {/* Header - Outside wrapper for consistent alignment */}
      <header className="header-container">
        <div className="header">
          <h1>
            ✦ Battle of the Cosmos ✦
          </h1>

          {/* Decorative Line */}
          <div className="decorative-line">
            <div className="decorative-line-part" />
            <span className="decorative-line-star">★</span>
            <div className="decorative-line-part" />
          </div>

          {/* Dark Mode Toggle */}
          <button className="dark-mode-toggle" onClick={toggleDarkMode}>
            {darkMode ? <Moon /> : <Sun />}
          </button>

          {/* Navigation Links */}
          <nav className="nav">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              {({ isActive }) =>
                isActive ? "[ Home ]" : "Home"
              }
            </NavLink>
            <NavLink
              to="/story"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              {({ isActive }) =>
                isActive ? "[ Story ]" : "Story"
              }
            </NavLink>
            <NavLink
              to="/save"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              {({ isActive }) =>
                isActive ? "[ Save ]" : "Save"
              }
            </NavLink>
            <NavLink
              to="/load"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              {({ isActive }) =>
                isActive ? "[ Load ]" : "Load"
              }
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              {({ isActive }) =>
                isActive ? "[ About ]" : "About"
              }
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              {({ isActive }) =>
                isActive ? "[ Contact ]" : "Contact"
              }
            </NavLink>
          </nav>
        </div>
      </header>
      
      <div className="app-wrapper">
        {/* Page Content */}
        <main>{children}</main>
        
        {/* Footer */}
        <footer className="footer">
          <p className="footer-text">© 2025 Michael Lugo. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}