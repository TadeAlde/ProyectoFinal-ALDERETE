import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

function CartWidget() {
  const { totalQuantity } = useContext(CartContext);

  return (
    <div>
      🛒 {totalQuantity > 0 && <span>({totalQuantity})</span>}
    </div>
  );
}

export default CartWidget;