import { NavLink } from "react-router-dom";
import CartWidget from "../CartWidget/CartWidget";

function NavBar() {
  return (
    <nav style={{ display: "flex", gap: "20px", padding: "20px" }}>
      <NavLink to="/">Inicio</NavLink>
      <NavLink to="/category/zapatillas">Zapatillas</NavLink>
      <NavLink to="/category/buzos">Buzos</NavLink>
      <NavLink to="/cart">
        <CartWidget />
      </NavLink>
    </nav>
  );
}

export default NavBar;