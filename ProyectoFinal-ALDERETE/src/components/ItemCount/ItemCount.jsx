import { useState } from "react";

export default function ItemCount({ stock = 10, initial = 1, onAdd }) {
  const [qty, setQty] = useState(initial);

  const inc = () => setQty((q) => Math.min(stock, q + 1));
  const dec = () => setQty((q) => Math.max(1, q - 1));

  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 8 }}>
      <button onClick={dec}>-</button>
      <div style={{ minWidth: 28, textAlign: "center" }}>{qty}</div>
      <button onClick={inc}>+</button>
      <button onClick={() => onAdd(qty)} disabled={stock === 0} style={{ marginLeft: 8 }}>
        Agregar
      </button>
    </div>
  );
}