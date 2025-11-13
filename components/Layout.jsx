import { NavLink } from "react-router-dom";

export function Layout({ children }) {
  return (
    <div className="app-container">
      {/* Header - Outside wrapper for consistent alignment */}
      <div className="header-container">
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
      </div>
      
      <div className="app-wrapper">
        {/* Page Content */}
        <div>{children}</div>
        
        {/* Footer */}
        <footer className="footer">
          <p className="footer-text">© 2025 Michael Lugo. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}