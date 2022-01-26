import React, { Fragment, useContext } from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);

  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <Fragment>
      <Col>
        <Card className={`${classes.mealCard} text-center`}>
          <Card.Body>
            <div className={`${classes.mealPhoto} mx-auto d-flex align-items-center`}>
              <Card.Img
                className=""
                variant="top"
                src={`${props.src}`}
                alt="Image Photo"
              />
            </div>
            <Card.Title>{props.name}</Card.Title>
            <Card.Text>{props.description}</Card.Text>
            <Card.Text>{price}</Card.Text>
            <Card.Footer>
              <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
            </Card.Footer>{" "}
          </Card.Body>
        </Card>
      </Col>
    </Fragment>
  );
};

export default MealItem;
