import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { cart, removeItem, clearCart, totalPrice } = useContext(CartContext);

  if (!cart.length) {
    return <div>
      <p>El carrito está vacío.</p>
      <Link to="/">Volver al inicio</Link>
    </div>;
  }

  return (
    <div>
      <h2>Carrito</h2>
      {cart.map(item => (
        <div key={item.id} style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
          <img src={item.img} alt={item.title} style={{ width: 80, height: 60, objectFit: "cover" }} />
          <div style={{ flex: 1 }}>
            <div>{item.title}</div>
            <div>{item.quantity} x ${item.price}</div>
          </div>
          <div>
            <button onClick={() => removeItem(item.id)}>Eliminar</button>
          </div>
        </div>
      ))}

      <h3>Total: ${totalPrice}</h3>

      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={clearCart}>Vaciar carrito</button>
        <Link to="/checkout"><button>Ir a pagar</button></Link>
      </div>
    </div>
  );
}