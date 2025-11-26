import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import Loader from "../components/Loader/Loader";
import ItemList from "../components/ItemList/ItemList";

export default function Category() {
  const { id } = useParams(); // category id
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const col = collection(db, "products");
    const q = id ? query(col, where("category", "==", id)) : col;
    getDocs(q)
      .then((snap) => setItems(snap.docs.map(d => ({ id: d.id, ...d.data() }))))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (!items.length) return <p>No hay productos en esta categoría</p>;

  return <ItemList items={items} />;
}