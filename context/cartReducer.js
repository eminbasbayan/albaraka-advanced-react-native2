export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CLEAR_CART = 'CLEAR_CART';

const initialState = {
  cartItems: [],
  totalPrice: 0,
};

function reducerFunction(state, action) {
  switch (action.type) {
    case ADD_TO_CART:
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
    case REMOVE_FROM_CART:
      const filteredCartItems = state.cartItems.filter(
        (item) => item.id !== action.cartItemId
      );

      return {
        ...state,
        cartItems: filteredCartItems,
      };

    case CLEAR_CART:
      return initialState;
    default:
      return state;
  }
}

export { initialState, reducerFunction };
