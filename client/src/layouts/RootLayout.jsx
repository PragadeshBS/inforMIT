import { Outlet, NavLink, ScrollRestoration } from "react-router-dom";
import styles from "../styles/layoutStyles/rootLayout.module.css";

const RootLayout = () => {
  return (
    <div className="root-layout">
      <ScrollRestoration />
      <header>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              InforMIT
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link" aria-current="page" to="/">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Auth
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink className="dropdown-item" to="/auth/login/staff">
                        Staff
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="dropdown-item"
                        to="/auth/login/student"
                      >
                        Student
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="/auth/logout">
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <div className="container row">
          <div className="col-6 text-light">
            <div className="display-6">InforMIT</div>
            <div className="lead">MIT's own information exchange portal</div>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default RootLayout;
