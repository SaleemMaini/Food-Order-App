import useHttp from "../../hooks/use-http";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  // ***************Fetch the data from the firebase ***************
  // meals state is the list of data that we got from firebase api as json data then we convert it to js data
  const [meals, setMeals] = useState([]);
  // use http the custom hook used to handle with api
  const { isLoading, error, sendRequest: fetchMeals } = useHttp();
  // get data and handle it
  useEffect(() => {
    // get the data as JSON and convert it to js then save it in the meals state array
    const transformMeals = (mealObj) => {
      const loadedMeals = [];
      for (const mealKey in mealObj) {
        loadedMeals.push({
          id: mealKey,
          name: mealObj[mealKey].name,
          description: mealObj[mealKey].description,
          price: mealObj[mealKey].price,
        });
      }
      setMeals(loadedMeals);
    };
    fetchMeals(
      {
        url: "https://react-http-3176c-default-rtdb.firebaseio.com/meals.json",
      },
      transformMeals
    );
  }, [fetchMeals]);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  // *************** End fetch the data ***************

  return (
    <section className={classes.meals}>
      <Card>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error} (Please turn on the VPN if firebase don't work in your country)</p>}
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};
export default AvailableMeals;
