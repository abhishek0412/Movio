import { NavLink } from "react-router-dom";
import { NAV_LINKS } from "../../constants";

export const Nav = () => {
  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary"
      aria-label="Main navigation"
    >
      <div className="container">
        <NavLink className="navbar-brand fw-bold" to="/">
          Movio
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#main-nav"
          aria-controls="main-nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="main-nav">
          <ul className="navbar-nav ms-auto">
            {NAV_LINKS.map((link) => (
              <li className="nav-item" key={link.to}>
                <NavLink
                  className={({ isActive }) =>
                    `nav-link${isActive ? " active" : ""}`
                  }
                  to={link.to}
                  aria-current={undefined}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};
