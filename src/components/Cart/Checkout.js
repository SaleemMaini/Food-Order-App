import Input from "../UI/Input";
import classes from "./Checkout.module.css";
import useInput from "../../hooks/use-input";
import { useEffect, useState, useContext } from "react";
import CartContext from "../../store/cart-context";
const Checkout = (props) => {
  const [formInputsIsValid, setFormInputsIsValid] = useState(false);
  const cartCtx = useContext(CartContext);

  const isEmpty = (value) => value.trim() !== "";
  // NAME INPUT
  const {
    value: enteredName,
    hasError: enteredNameHasError,
    isValid: enteredNameIsValid,
    inputBlurHandler: enteredNameBlurHandler,
    inputChangeHandler: enteredNameChangeHandler,
  } = useInput(isEmpty);

  const nameInputClasses = enteredNameHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;

  // STREET INPUT
  const {
    value: enteredStreet,
    hasError: enteredStreetHasError,
    isValid: enteredStreetIsValid,
    inputBlurHandler: enteredStreetBlurHandler,
    inputChangeHandler: enteredStreetChangeHandler,
  } = useInput(isEmpty);

  const streetInputClasses = enteredStreetHasError
    ? `${classes.control}  ${classes.invalid}`
    : `${classes.control}`;

  // POSTAL INPUT
  const {
    value: enteredPostal,
    hasError: enteredPostalHasError,
    isValid: enteredPostalIsValid,
    inputBlurHandler: enteredPostalBlurHandler,
    inputChangeHandler: enteredPostalChangeHandler,
  } = useInput(isEmpty);

  const postalInputClasses = enteredPostalHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control} `;
  // CITY INPUT
  const {
    value: enteredCity,
    hasError: enteredCityHasError,
    isValid: enteredCityIsValid,
    inputChangeHandler: enteredCityChangeHandler,
    inputBlurHandler: enteredCityBlurHandler,
  } = useInput(isEmpty);

  const cityInputClasses = enteredCityHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;
  const cartItemsLength = cartCtx.items.length;
  useEffect(() => {
    if (
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredPostalIsValid &&
      enteredCityIsValid &&
      cartItemsLength > 0
    ) {
      setFormInputsIsValid(true);
    } else {
      setFormInputsIsValid(false);
    }
  }, [
    enteredNameIsValid,
    enteredStreetIsValid,
    enteredPostalIsValid,
    enteredCityIsValid,
    cartItemsLength,
  ]);

  const submitBtnClasses = !formInputsIsValid
    ? `${classes.submit} ${classes.invalidBtn}`
    : `${classes.submit}`;

  const submitHandler = (event) => {
    event.preventDefault();
    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostal,
      city: enteredCity,
    });
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.inputs}>
        <Input
          className={nameInputClasses}
          input={{
            type: "text",
            id: "name",
            onChange: enteredNameChangeHandler,
            onBlur: enteredNameBlurHandler,
          }}
          value={enteredName}
          label="Name"
        />
        <Input
          className={streetInputClasses}
          input={{
            type: "text",
            id: "street",
            onChange: enteredStreetChangeHandler,
            onBlur: enteredStreetBlurHandler,
          }}
          value={enteredStreet}
          label="Street"
        />
        <Input
          className={postalInputClasses}
          input={{
            type: "text",
            id: "postal",
            onChange: enteredPostalChangeHandler,
            onBlur: enteredPostalBlurHandler,
          }}
          value={enteredPostal}
          label="Postal Code"
        />
        <Input
          className={cityInputClasses}
          input={{
            type: "text",
            id: "city",
            onChange: enteredCityChangeHandler,
            onBlur: enteredCityBlurHandler,
          }}
          value={enteredCity}
          label="City"
        />
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>

        <button
          type="submit"
          className={submitBtnClasses}
          disabled={!formInputsIsValid}
        >
          Confirm
        </button>
      </div>
    </form>
  );
};
export default Checkout;
