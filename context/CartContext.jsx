import { createContext, useState } from 'react';

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  function addToCart(product) {
    setCartItems([product, ...cartItems]);
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
        deleteFromCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
