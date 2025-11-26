import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import ItemList from "../ItemList/ItemList";
import Loader from "../Loader/Loader";

export default function ItemListContainer() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const productsRef = collection(db, "products");

    getDocs(productsRef)
      .then((res) => {
        setItems(res.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return <ItemList items={items} />;
}