import useHttp from "../../hooks/use-http";
import classes from "./MealsList.module.css";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
const MealsList = () => {
  // **** Fetch the data from the firebase ****
  const [meals, setMeals] = useState([]);
  const { isLoading, error, sendRequest: fetchMeals } = useHttp();
  useEffect(() => {
    const transformMeals = (mealObj) => {
      const loadedMeals = [];
      for (const mealKey in mealObj) {
        loadedMeals.push({
          id: mealKey,
          name: mealObj[mealKey].name,
          description: mealObj[mealKey].description,
          price: mealObj[mealKey].price,
          photo: mealObj[mealKey].photo,
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
      src={meal.photo}
    />
  ));

  return (
    <Container className={classes.mealsList}>
      <header>Meals List</header>
      {/* Error Handling */}
      {isLoading && <p className={classes.errorHandle}>Loading...</p>}
      {error && (
        <p className={classes.errorHandle}>
          {error} ( Please turn on the VPN if firebase doesn't work in your
          country ).
        </p>
      )}
      <Row>
        {mealsList}
      </Row>
    </Container>
  );
};
export default MealsList;
