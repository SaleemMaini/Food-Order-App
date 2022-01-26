import React, { useContext, useEffect, useState } from "react";
import CartIcon from "../../assets/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const [btnIsHighLighted, setBtnIsHighLighted] = useState(false);
  const cartCtx = useContext(CartContext);

  const { items } = cartCtx;
  // reduce is a method which allow us to transform an array of data into a single value  (here the value is number)
  const numberOfCartItems = items.reduce((acc, curr) => {
    return acc + curr.amount;
  }, 0);

  const btnClasses = `${classes.button} ${
    btnIsHighLighted ? classes.bump : ""
  }`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighLighted(true);
    // set timer to remove the bump class after adding it
    // 300 is the duration of bump animation
    const timer = setTimeout(() => setBtnIsHighLighted(false), 300);
    //   clean up function
    // we do need this here because, of this timer can be set again befor it expired if we add multiple items rapidly after each other we wanna clear the old timer and make sure that a new timer is set and the old timer is cleared
    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};
export default HeaderCartButton;
