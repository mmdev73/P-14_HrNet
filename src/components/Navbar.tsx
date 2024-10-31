import { NavLink } from "react-router-dom";
import '../sass/components/Navbar.scss'

const Navbar = () => {
  return (
    <header className="header">
      <nav className="header__navbar">
        <h1 className="header__navbar__title"><img src="./logo.jpeg" alt="logo" />HRNet</h1>
        <menu className="header__navbar__menu">
          <NavLink className="header__navbar__menu__link" to="/">
            Create Employee
          </NavLink>
          <NavLink className="header__navbar__menu__link" to="/view">
            View Employees
          </NavLink>
        </menu>
      </nav>
    </header>

  );
};

export default Navbar