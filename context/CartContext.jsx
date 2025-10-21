import { createContext, useState } from 'react';

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  function addToCart(product) {
    const findCartItem = cartItems.find((item) => item.id === product.id);

    if (findCartItem) {
      const newCartItems = cartItems.map((item) => {
        if (item.id === findCartItem.id) {
          return { ...item, quantity: item.quantity + 1 };
        }

        return item;
      });

      setCartItems(newCartItems);
    } else {
      setCartItems([{ ...product, quantity: 1 }, ...cartItems]);
    }
  }

  function deleteFromCart(cartItemId) {
    const filteredCartItems = cartItems.filter(
      (item) => item.id !== cartItemId
    );
    setCartItems(filteredCartItems);
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        deleteFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
