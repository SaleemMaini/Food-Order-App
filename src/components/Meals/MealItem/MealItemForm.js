import React, { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();
  const submitFormHandler = (event) => {
    event.preventDefault();
    // get the entered amount from the input using ref
    const enteredAmount = amountInputRef.current.value;
    // convert entered value from  string to number
    const enteredAmountNumber = +enteredAmount;
    if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1) {
      setAmountIsValid(false);
      return;
    }
    // call a function which expect to get on props and forward entered amount number. because the cart item needs more data than just the entered amount, here we only have the amount thts why we need to calling the context method in the meal item component
    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form className={`${classes.form} mx-auto`} onSubmit={submitFormHandler}>
      {/* extract entered amount, use ref for that */}
      <div className={classes.quantityControl}>
        <button
          onClick={(e) => {
            e.preventDefault();
            return amountInputRef.current.value++;
          }}
        >
          +
        </button>
        <Input
          input={{
            ref: amountInputRef,
            id: "quantity_" + props.id,
            type: "number",
            min: 1,
            defaultValue: 1,
          }}
          label={"Quantity"}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            if (amountInputRef.current.value > 0) {
              return amountInputRef.current.value--;
            }
            return;
          }}
        >
          -
        </button>
      </div>
      <button>+Add</button>
      {!amountIsValid && <p>amount is not valid</p>}
    </form>
  );
};
export default MealItemForm;
