import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../firebase/config";

const ItemListContainer = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoryId } = useParams();

  useEffect(() => {
    const productsRef = collection(db, "products");

    const q = categoryId
      ? query(productsRef, where("category", "==", categoryId))
      : productsRef;

    getDocs(q).then((resp) => {
      const items = resp.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setItems(items);
      setLoading(false);
    });
  }, [categoryId]);

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
};

export default ItemListContainer;