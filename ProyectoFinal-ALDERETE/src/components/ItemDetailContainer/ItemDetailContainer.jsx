import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import Loader from "../Loader/Loader";
import ItemDetail from "../ItemDetail/ItemDetail";

export default function ItemDetailContainer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const docRef = doc(db, "products", id);
    getDoc(docRef)
      .then((snap) => {
        if (!snap.exists()) {
          navigate("/404");
          return;
        }
        setProduct({ id: snap.id, ...snap.data() });
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (!product) return null;

  return <ItemDetail product={product} />;
}