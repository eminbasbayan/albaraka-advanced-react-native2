import { createContext, useReducer } from 'react';
import {
  reducerFunction,
  initialState,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
} from '@/context/cartReducer';

export const CartContext = createContext();

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducerFunction, initialState);

  function addToCart(product) {
    dispatch({ type: ADD_TO_CART, product });
  }

  function deleteFromCart(cartItemId) {
    dispatch({ type: REMOVE_FROM_CART, cartItemId });
  }

  function clearCart() {
    dispatch({ type: CLEAR_CART });
  }

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        addToCart,
        deleteFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
