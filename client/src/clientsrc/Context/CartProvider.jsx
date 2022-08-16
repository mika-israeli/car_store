import { createContext, useState, useEffect } from 'react';
import useUser from '../Hooks/useUser';

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [Cart, setCart] = useState([]);
  const { User } = useUser();
  useEffect(() => {
    const lscart = JSON.parse(localStorage.getItem(User._id));
    if (lscart) {
      setCart(JSON.parse(localStorage.getItem(User._id)));
    }
  }, []);
  useEffect(() => {
    if (User) {
      setCart(JSON.parse(localStorage.getItem(User._id)) || []);
    }
  }, [User]);
  useEffect(() => {
    localStorage.setItem(User._id, JSON.stringify(Cart));
  }, [Cart]);
  const handleSetCart = (cart) => {
    setCart(cart);
  };
  const addToCart = (product) => {
    const cart = [...Cart, product];
    handleSetCart(cart);
  };

  return (
    <CartContext.Provider
      value={{ Cart, setCart: (cart) => handleSetCart(cart), addToCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
