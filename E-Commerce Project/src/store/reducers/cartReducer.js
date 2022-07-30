const initialState = {
  cart: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CART":
      return {
        ...state,
        cart: [action.payload, ...state.cart],
      };
    default:
      return state;
  }
};

export default cartReducer;
