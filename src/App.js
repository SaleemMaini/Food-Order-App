import React, { useState } from "react";
import NavbarHeader from "./components/Layout/NavbarHeader";
import MealsList from "./components/Meals/MealsList";
import CartContextProvider from "./store/CartContextProvider";
import Cart from "./components/Cart/Cart";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [cartIsVisible, setCartIsVisible] = useState(false);

  const showCartHandler = () => {
    setCartIsVisible(true);
  };

  const closeCartHandler = () => {
    setCartIsVisible(false);
  };

  return (
    <CartContextProvider>
      {cartIsVisible && <Cart onClose={closeCartHandler}></Cart>}
      <NavbarHeader cartOnClick={showCartHandler} />
      <main>
        <MealsList />
      </main>
    </CartContextProvider>
  );
}

export default App;
