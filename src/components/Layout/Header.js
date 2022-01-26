import React from "react";
import { Fragment } from "react/cjs/react.production.min";
import NavbarHeader from "./NavbarHeader";
const Header = (props) => {
  return (
    <Fragment>
      <NavbarHeader cartOnClick={props.onOpenCart}/>
    </Fragment>
  );
};
export default Header;
