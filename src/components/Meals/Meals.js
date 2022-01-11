import React from "react";
import { Fragment } from "react/cjs/react.production.min";
import AvilableMeals from "./AvilableMeals";
import MealsSummary from "./MealsSummary";

const Meals = () => {
  return (
    <Fragment>
      <MealsSummary />
      <AvilableMeals />
    </Fragment>
  );
};
export default Meals;
