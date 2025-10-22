import { createContext, useReducer, useState } from 'react';

export const CartContext = createContext();

const initialState = {
  cartItems: [],
  totalPrice: 0,
};

function reducerFunction(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      const findCartItem = state.cartItems.find(
        (item) => item.id === action.product.id
      );

      if (findCartItem) {
        const newCartItems = state.cartItems.map((item) => {
          if (item.id === findCartItem.id) {
            return {
              ...item,
              quantity: item.quantity + action.product.quantity,
            };
          }

          return item;
        });

        return {
          ...state,
          cartItems: newCartItems,
        };
      } else {
        return {
          ...state,
          cartItems: [{ ...action.product, quantity: 1 }, ...state.cartItems],
        };
      }
    case 'REMOVE_FROM_CART':
      const filteredCartItems = state.cartItems.filter(
        (item) => item.id !== action.cartItemId
      );

      return {
        ...state,
        cartItems: filteredCartItems,
      };

    case 'CLEAR_CART':
      return initialState;
    default:
      return state;
  }
}

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducerFunction, initialState);

  function addToCart(product) {
    dispatch({ type: 'ADD_TO_CART', product });
  }

  function deleteFromCart(cartItemId) {
    dispatch({ type: 'REMOVE_FROM_CART', cartItemId });
  }

  function clearCart() {
    dispatch({ type: 'CLEAR_CART' });
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
