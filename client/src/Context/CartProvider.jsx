import { createContext, useState, useEffect } from "react";
import useUser from "../Hooks/useUser";

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [Cart, setCart] = useState([]);
  const { User, setUser } = useUser();
  useEffect(() => {
    if (Cart.length == 0) {
      return;
    }
    localStorage.setItem(User._id, JSON.stringify(Cart));
    console.log("localstorage cart", JSON.parse(localStorage.getItem(User._id)));
  }, [Cart]);
  useEffect(() => {
    if (User) {
      setCart(JSON.parse(localStorage.getItem(User._id)) || []);
    }
  }, [User]);
  useEffect(() => {
    console.log("just mounted", JSON.parse(localStorage.getItem(User._id)) || []);
    setCart(JSON.parse(localStorage.getItem(User._id)) || []);
  }, []);
  return <CartContext.Provider value={{ Cart, setCart }}>{children}</CartContext.Provider>;
};

export default CartContext;
