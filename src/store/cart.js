import { createStore } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web


const initialState = {
  cartList: [],
  total : 0
};

export const cartReducer = (state = initialState, action) => {
  if (action.type === "add") {
    return {
      cartList: [...state?.cartList, { ...action?.payload, amount: 1 }],
    };
  }

  if (action.type === "update") {
    let updatedCart = state?.cartList.map((cartItem) =>
      cartItem?.id === action?.payload?.id
        ? {
            ...cartItem,
            amount: cartItem?.amount + 1,
          }
        : cartItem
    );
    return {
        cartList : updatedCart
    };
  }

  if(action?.type === "remove") {

    let index = state?.cartList.indexOf(action?.payload);
    state?.cartList.splice(index,1);

    // important: direct slice will not work here, you have to map around array & then splice the array
    let updatedCart = state?.cartList.map((cartItem) =>
      cartItem?.id === action?.payload?.id
        ? state?.cartList.splice(state?.cartList.indexOf(action?.payload),1)
        : cartItem
    );

    return {
      cartList : updatedCart
    };
  }

  if (action.type === "increment") {
    let updatedCart = state?.cartList.map((cartItem) =>
      cartItem?.id === action?.payload?.id
        ? {
            ...cartItem,
            amount: cartItem?.amount + 1,
          }
        : cartItem
    );
    return {
        cartList : updatedCart
    };
  }

  if (action.type === "decrement") {
    let updatedCart = state?.cartList.map((cartItem) =>
      cartItem?.id === action?.payload?.id && cartItem.amount > 0
        ? {
            ...cartItem,
            amount: cartItem?.amount - 1,
          }
        : cartItem
    );
    return {
        cartList : updatedCart
    };
  }

  return state;
};

const cartConfig = {
    key : 'cart',
    storage // defaults to locastorage
}

const persistedCartReducer = persistReducer(cartConfig, cartReducer);

export const store = createStore(persistedCartReducer);
export const persistor = persistStore(store);