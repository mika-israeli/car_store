import { createContext, useState } from "react";

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [Cart, setCart] = useState([]);
  return <CartContext.Provider value={{ Cart, setCart }}>{children}</CartContext.Provider>;
};

export default CartContext;
