import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [checkoutIsVisible, setCheckoutIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);
  const cartList = cartCtx.items;
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartList.length > 0;

  const cartItemAddHandler = (item) => {
    // set amount value to 1 to make the button add just one item
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  // SUBMIT ORDER HANDLER
  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://react-http-3176c-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartList.map((item) => (
        <CartItem
          key={item.id}
          id={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );
  const orderHandler = () => {
    setCheckoutIsVisible(true);
  };

  const modalActions = !checkoutIsVisible && (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );
  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmittedModalContent = (
    <React.Fragment>
      <p>Successfully sent the oder.</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {checkoutIsVisible && cartCtx.items.length > 0 && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {modalActions}
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {/* #1 Cart Content */}
      {!isSubmitting && !didSubmit && cartModalContent}
      {/* #2 IS SUBMITTING */}
      {isSubmitting && !didSubmit && isSubmittingModalContent}
      {/* #3 DID SUBMIT */}
      {!isSubmitting && didSubmit && didSubmittedModalContent}
    </Modal>
  );
};

export default Cart;
