import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("cart_v1");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart_v1", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item, quantity) => {
    setCart(prev => {
      const exists = prev.find(p => p.id === item.id);
      if (exists) {
        return prev.map(p => p.id === item.id ? { ...p, quantity: p.quantity + quantity } : p);
      }
      return [...prev, { ...item, quantity }];
    });
  };

  const removeItem = (id) => setCart(prev => prev.filter(p => p.id !== id));
  const clearCart = () => setCart([]);

  const totalQuantity = cart.reduce((s, p) => s + p.quantity, 0);
  const totalPrice = cart.reduce((s, p) => s + p.quantity * p.price, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeItem, clearCart, totalQuantity, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};