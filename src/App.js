import React, { Suspense, useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartContextProvider from "./store/CartContextProvider";
// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';


const Cart = React.lazy(() => import("./components/Cart/Cart"));

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
      <Suspense
        fallback={
          <div className="centered">
            <p>Loading...</p>
          </div>
        }
      >
        <CartContextProvider>
          {cartIsVisible && <Cart onClose={closeCartHandler}></Cart>}
          <Header onOpenCart={showCartHandler} />
          <main>
            <Meals />
          </main>
        </CartContextProvider>
      </Suspense>
    </React.Fragment>
  );
}

export default App;
