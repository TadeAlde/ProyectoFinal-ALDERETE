import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import Loader from "../components/Loader/Loader";

export default function OrderConfirmation() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ref = doc(db, "orders", orderId);
    getDoc(ref).then((snap) => {
      if (snap.exists()) setOrder({ id: snap.id, ...snap.data() });
    }).finally(() => setLoading(false));
  }, [orderId]);

  if (loading) return <Loader />;
  if (!order) return <div>Orden no encontrada</div>;

  return (
    <div>
      <h2>¡Compra confirmada!</h2>
      <p>ID de orden: <strong>{order.id}</strong></p>
      <p>Nombre: {order.buyer.name}</p>
      <p>Email: {order.buyer.email}</p>
      <p>Total: ${order.total}</p>
      <Link to="/">Volver al inicio</Link>
    </div>
  );
}