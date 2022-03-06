import React, { useContext, useEffect, useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";
import CartContext from "../../../store/cart-context";
const MealItemForm = (props) => {
  const [quantityIsValid, setQuantityIsValid] = useState(true);
  const quantityCountInit = () => {
    return 1;
  };
  const [enteredQuantityState, setEnteredQuantityState] = useState(() =>
    quantityCountInit()
  );
  const quantityInputRef = useRef();
  const addBtnRef = useRef();
  const cartCtx = useContext(CartContext);
  const cartList = cartCtx.items;

  const changeQuantityHandler = () => {
    const enteredQuantity = +quantityInputRef.current.value;
    setEnteredQuantityState(enteredQuantity);
    if (enteredQuantity > 25 || enteredQuantity === 0) {
      setQuantityIsValid(false);
      addBtnRef.current.className = `${classes.disableBtn}`;
    } else {
      setQuantityIsValid(true);
      addBtnRef.current.className = ``;
    }
  };

  const increaseQuantityBtnHandler = (e) => {
    if (enteredQuantityState < 25) {
      setEnteredQuantityState((pervQuantity) => pervQuantity + 1);
    } else {
      return;
    }
  };

  const decreaseQuantityHandler = (e) => {
    if (enteredQuantityState > 1) {
      setEnteredQuantityState((pervQuantity) => pervQuantity - 1);
    } else {
      return;
    }
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
    props.onAddToCart(enteredQuantityState);
  };

  const existingCartItemIndex = cartList.findIndex(
    (item) => item.id === props.id
  );

  const existingItem = cartList[existingCartItemIndex];

  useEffect(() => {
    if (existingItem) {
      const totalQuantity = existingItem.quantity + +enteredQuantityState;
      if (totalQuantity > 25 || enteredQuantityState === 0) {
        addBtnRef.current.className = `${classes.disableBtn}`;
        setQuantityIsValid(false);
      } else {
        addBtnRef.current.className = "";
        setQuantityIsValid(true);
      }
    }
  }, [existingItem, setQuantityIsValid, enteredQuantityState]);

  return (
    <form className={`${classes.form} mx-auto`} onSubmit={submitFormHandler}>
      <div className={classes.quantityControl}>
        <button type="button" onClick={increaseQuantityBtnHandler}>
          +
        </button>
        <Input
          input={{
            ref: quantityInputRef,
            id: "quantity_" + props.id,
            type: "number",
            min: 1,
            max: 25,
            step: 1,
            onChange: changeQuantityHandler,
            value: enteredQuantityState,
          }}
          label={"Quantity"}
        />
        <button type="button" onClick={decreaseQuantityHandler}>
          -
        </button>
      </div>
      <button ref={addBtnRef}> +Add </button>
      <p style={{ color: "red" }}>
        {!quantityIsValid ? "Max quantity is: 25" : ""}
      </p>
    </form>
  );
};
export default MealItemForm;
