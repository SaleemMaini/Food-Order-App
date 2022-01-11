import Input from "../UI/Input";
import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  // FORM VALIDITY STATE
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true,
  });
  // INPUTS REFS
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  // VALIDATION INPUT HELPER FUNCTIONS
  const isEmpty = (value) => value.trim() === "";
  const isFiveChars = (value) => value.trim().length === 5;

  const submitHandler = (event) => {
    event.preventDefault();

    // GET CHECK OUT FORM VALUES
    const enteredName = nameInputRef.current.value();
    const enteredStreet = streetInputRef.current.value();
    const enteredPostal = postalInputRef.current.value();
    const enteredCity = cityInputRef.current.value();
    // VALIDATE CHECK OUT FORM VALUES
    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostal);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postalCode: enteredPostalCodeIsValid,
      city: enteredCityIsValid,
    });

    // CHECK IF FORM IS VALID THEN SUBMIT THE DATA
    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredPostalCodeIsValid &&
      enteredCityIsValid;
    // RETURN AN ERROR IF THE FORM IS NOT VALID
    if (!formIsValid) {
      return;
    }
    // SUBMIT THE CART DATA
    props.onConfirm({
      name : enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostal
    });
  };
  // Input Classes
  // name
  const nameInputClasses = formInputsValidity.name
    ? `${classes.control}`
    : `${classes.control} ${classes.invalid}`;
  // street
  const streetInputClasses = formInputsValidity.street
    ? `${classes.control}`
    : `${classes.control} ${classes.invalid}`;
  // postal
  const postalInputClasses = formInputsValidity.postalCode
    ? `${classes.control}`
    : `${classes.control} ${classes.invalid}`;
  // city
  const cityInputClasses = formInputsValidity.city
    ? `${classes.control}`
    : `${classes.control} ${classes.invalid}`;

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <Input
        className={nameInputClasses}
        input={{
          type: "text",
          id: "name",
        }}
        ref={nameInputRef}
        label="Name"
      />
      {!formInputsValidity.name && (
        <p className={classes.invalidInput}>Please enter a valid name.</p>
      )}
      <Input
        className={streetInputClasses}
        input={{
          type: "text",
          id: "street",
        }}
        ref={streetInputRef}
        label="Street"
      />
      {!formInputsValidity.street && (
        <p className={classes.invalidInput}>Please enter a valid street.</p>
      )}
      <Input
        className={postalInputClasses}
        input={{
          type: "text",
          id: "postal",
        }}
        ref={postalInputRef}
        label="Postal Code"
      />
      {!formInputsValidity.postalCode && (
        <p className={classes.invalidInput}>
          Please enter a valid postal code (5) numbers.
        </p>
      )}
      <Input
        className={cityInputClasses}
        input={{
          type: "text",
          id: "city",
        }}
        ref={cityInputRef}
        label="City"
      />
      {!formInputsValidity.city && (
        <p className={classes.invalidInput}>Please enter a valid City.</p>
      )}
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button type="submit" className={classes.submit}>
          Confirm
        </button>
      </div>
    </form>
  );
};
export default Checkout;
