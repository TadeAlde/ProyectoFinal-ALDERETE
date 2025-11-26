import Item from "../Item/Item";

export default function ItemList({ items = [] }) {
  return (
    <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
      {items.map((p) => <Item key={p.id} product={p} />)}
    </div>
  );
}