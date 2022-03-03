import React, { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [quantityIsValid, setQuantityIsValid] = useState(true);
  const quantityInputRef = useRef();

  const changeQuantityHandler = () => {
    const enteredQuantity = +quantityInputRef.current.value;
    if (enteredQuantity < 1 || enteredQuantity > 25) {
      setQuantityIsValid(false);
      return;
    } else {
      setQuantityIsValid(true);
    }
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
    const enteredQuantity = +quantityInputRef.current.value;
    if (enteredQuantity < 1 || enteredQuantity > 25) {
      setQuantityIsValid(false);
      return;
    }
    props.onAddToCart(enteredQuantity);
  };

  return (
    <form className={`${classes.form} mx-auto`} onSubmit={submitFormHandler}>
      <div className={classes.quantityControl}>
        <button
          onClick={(e) => {
            e.preventDefault();
            if (quantityInputRef.current.value < 25) {
              setQuantityIsValid(true);
              return quantityInputRef.current.value++;
            }
            return;
          }}
        >
          +
        </button>
        <Input
          input={{
            ref: quantityInputRef,
            id: "quantity_" + props.id,
            type: "number",
            min: 1,
            max: 25,
            defaultValue: 1,
            onChange: changeQuantityHandler,
          }}
          label={"Quantity"}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            if (quantityInputRef.current.value > 1) {
              if (quantityInputRef.current.value < 27) {
                setQuantityIsValid(true);
              }
              quantityInputRef.current.value--;
            }
            return;
          }}
        >
          -
        </button>
      </div>
      <button>+Add</button>
      {!quantityIsValid ? (
        <p style={{ color: "red" }}>
          quantity is not valid please enter a number between 1 and 25
        </p>
      ) : (
        ""
      )}
    </form>
  );
};
export default MealItemForm;
