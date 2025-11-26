import { Link } from "react-router-dom";

export default function Item({ product }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8 }}>
      <Link to={`/item/${product.id}`}>
        <img src={product.img} alt={product.title} style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 6 }} />
      </Link>
      <h3 style={{ margin: "8px 0" }}>{product.title}</h3>
      <p style={{ margin: 0 }}>${product.price}</p>
      <p style={{ color: "#666", fontSize: 13 }}>{product.category}</p>
      <Link to={`/item/${product.id}`} style={{ marginTop: 8, display: "inline-block" }}>Ver detalle</Link>
    </div>
  );
}