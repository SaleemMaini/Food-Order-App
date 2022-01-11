import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};
// The action is dispatched by you in your code
// the state is the last state snapshot of the state manged by the reducer
const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    // update cart items
    //  add our items as a new item in that array
    //group items for the same meal together and mange the amount on a per meal basis
    //concat adds new item to an array, unlike push it doesn't edit the existing array but return a new array
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    // get the existing cart item index
    // findIndex() is a method which finds the index of an item in an array, first arg is a func which should return true if that the item we're looking for, and false otherwise
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    // Get the existing cart Item
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;
    // here we just update the amount of existing item
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  // ****************** REMOVE ITEM ***************************
  if (action.type === "REMOVE_ITEM") {
    // get the existing cart item index
    // findIndex() is a method which finds the index of an item in an array, first arg is a func which should return true if that the item we're looking for, and false otherwise
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    // Get the existing cart Item
    const existingCartItem = state.items[existingCartItemIndex];

    // Updated Amount
    const updatedAmount = state.totalAmount - existingCartItem.price;

    let updatedItems;
    // Delete the item from the cart when the amount is = 0
    if (existingCartItem.amount === 1) {
      // filter give us a new array which don't contain item that have that id
      updatedItems = state.items.filter((item) => item.id !== action.id);
    }

    // here dont delete the item just update the total amount of it by -1
    else {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedAmount,
    };
  }
  if (action.type === 'CLEAR') {
    return defaultCartState;
  }
  return defaultCartState;
};

const CartContextProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD_ITEM", item: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE_ITEM", id: id });
  };
  const clearCartHandler = () => {
    dispatchCartAction({type: 'CLEAR'})
  }
  const cartCtx = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler
  };

  return (
    <CartContext.Provider value={cartCtx}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartContextProvider;
