import React, { useEffect, useContext, useRef } from "react";
import classes from "./CartItem.module.css";
import CartContext from "../../store/cart-context";

const CartItem = (props) => {
  const cartCtx = useContext(CartContext);
  const cartList = cartCtx.items;
  const addBtnRef = useRef();
  const existingCartItemIndex = cartList.findIndex(
    (item) => item.id === props.id
  );

  const existingItem = cartList[existingCartItemIndex];

  useEffect(() => {
    if (existingItem) {
      if (existingItem.quantity === 25) {
        addBtnRef.current.className = `${classes.disableBtn}`;
      } else {
        addBtnRef.current.className = "";
      }
    }
  }, [existingItem]);

  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{`$${props.price}`}</span>
          <span className={classes.quantity}>{`X ${props.quantity}`}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onRemove}>-</button>
        <button onClick={props.onAdd} ref={addBtnRef}>+</button>
      </div>
    </li>
  );
};
export default CartItem;
