import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{ padding: 40 }}>
      <h2>Página no encontrada</h2>
      <p>La ruta a la que querés ingresar no existe.</p>
      <Link to="/">Volver al inicio</Link>
    </div>
  );
}