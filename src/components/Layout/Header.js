import React from "react";
import classes from "./Header.module.css";
import HeaderBg from "../../assets/meals.jpg";
import { Fragment } from "react/cjs/react.production.min";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h2>Food order app</h2>
        <HeaderCartButton onClick={props.onOpenCart} />
      </header>

      <div className={classes["main-image"]}>
        <img src={HeaderBg} alt="food table" />
      </div>
    </Fragment>
  );
};
export default Header;
