import { useState, useContext } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/config";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useContext(CartContext);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Nombre requerido";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Email inválido";
    if (!/^\d{7,15}$/.test(form.phone)) e.phone = "Teléfono inválido";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    const order = {
      buyer: form,
      items: cart,
      total: totalPrice,
      createdAt: new Date()
    };

    try {
      const ordersRef = collection(db, "orders");
      const docRef = await addDoc(ordersRef, order);
      clearCart();
      navigate(`/order-confirmation/${docRef.id}`);
    } catch (err) {
      console.error(err);
      alert("Error generando la orden");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 8, maxWidth: 420 }}>
        <input placeholder="Nombre" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        {errors.name && <small style={{ color: "red" }}>{errors.name}</small>}
        <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        {errors.email && <small style={{ color: "red" }}>{errors.email}</small>}
        <input placeholder="Teléfono" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        {errors.phone && <small style={{ color: "red" }}>{errors.phone}</small>}
        <div> Total a pagar: <strong>${totalPrice}</strong></div>
        <button type="submit" disabled={loading}>{loading ? "Procesando..." : "Confirmar compra"}</button>
      </form>
    </div>
  );
}