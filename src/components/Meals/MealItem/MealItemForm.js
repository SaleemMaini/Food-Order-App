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
    // convert enterd value from  string to number
    const enteredAmountNumber = +enteredAmount;
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }
    // call a function which expect to get on props and forward entered amount number. because the cart item needs more data than just the entered amount, here we only have the amount thts why we need to calling the context method in the meal item component
    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {/* extract entered amount, use ref for that */}
      <Input
        input={{
          ref: amountInputRef,
          id: "amount_" + props.id,
          type: "number",
          max: 5,
          min: 1,
          step: 1,
          defaultValue: 1,
        }}
        label={"Amount"}
      />
      <button>+Add</button>
      {!amountIsValid && <p>amount is not valid</p>}
    </form>
  );
};
export default MealItemForm;
