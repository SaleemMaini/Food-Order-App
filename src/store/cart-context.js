import React from "react";

// mange overall data through context because we will need it in different places of the application
// in the mealItem we need to update the cart
// in the cart component we need to output it and mange it

const CartContext = React.createContext({
    items : [],
    totalAmount : 0,
    addItem : (item) => {},
    removeItem : (id) => {},
    clearCart: () => {}
})

export default CartContext;