import React, { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartContextProvider from "./store/CartContextProvider";
import Cart from "./components/Cart/Cart";

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [cartIsVisible, setCartIsVisible] = useState(false);

  const showCartHandler = () => {
    setCartIsVisible(true);
  };

  const closeCartHandler = () => {
    setCartIsVisible(false);
  };

  return (
    <React.Fragment>
        <CartContextProvider>
          {cartIsVisible && <Cart onClose={closeCartHandler}></Cart>}
          <Header onOpenCart={showCartHandler} />
          <main>
            <Meals />
          </main>
        </CartContextProvider>
    </React.Fragment>
  );
}

export default App;
