import React, { useState, useEffect, useCallback } from "react";
import "./all_meals.css";
import ShowMeals from "./showmeals";

const AllMeals = () => {
  const [meals, setMeals] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const GetMeals = useCallback(() => {
    let apiUrl = "/api/meals";
    console.log(apiUrl);
    fetch(apiUrl)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        if (result) {
          const items = result.map((item) => item);
          setMeals((prev) => {
            setIsLoading(false);
            return prev.concat(items);
          });
        }
      });
  }, []);

  useEffect(() => {
    GetMeals();
  }, [GetMeals]);

  return (
    <div>
      <div style={{ display: isLoading ? "inline-block" : "none" }}>
        ...loading
      </div>

      <div className="container-1">
        <div className="contact-box-1">
          <div className="left-1"></div>
          <div className="right-1">
            <hr></hr>
            <h2>Delicious Cuisines</h2>
            {meals.map((meal) => {
              return (
                <div>
                  <div className="meal-list">
                    <ShowMeals
                      title={meal.title}
                      price={meal.price}
                      description={meal.description}
                      setMeals={setMeals}
                    />
                  </div>
                  <hr></hr>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllMeals;
