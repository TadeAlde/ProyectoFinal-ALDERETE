import { useState, useContext } from "react";
import ItemCount from "../ItemCount/ItemCount";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";

export default function ItemDetail({ product }) {
  const { addToCart } = useContext(CartContext);
  const [added, setAdded] = useState(false);

  const handleAdd = (qty) => {
    addToCart(product, qty);
    setAdded(true);
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }}>
      <div>
        <img src={product.img} alt={product.title} style={{ width: "100%", borderRadius: 8 }} />
      </div>

      <div>
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p><strong>Precio:</strong> ${product.price}</p>
        <p><strong>Stock:</strong> {product.stock}</p>

        {!added ? (
          <ItemCount stock={product.stock} onAdd={handleAdd} />
        ) : (
          <div style={{ marginTop: 12 }}>
            <Link to="/cart"><button style={{ marginRight: 8 }}>Ir al carrito</button></Link>
            <Link to="/"><button>Seguir comprando</button></Link>
          </div>
        )}
      </div>
    </div>
  );
}