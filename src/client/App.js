import React, { useState } from "react";
 //import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AllMeals from "./all_meals";
import MealsWithId from "./meal_with_id";
import MealLinks from "./meal_links";
import NavBar from "./navbar";
import Footer from "./footer";
import Error from "./error";

function App() {
  return (
    <>
      <NavBar/>
      <Switch>
        <Route exact path="/" component={AllMeals}/>
        <Route exact path="/meals/:id" component={(props) => <MealsWithId id={props.match.params.id} />}/>
        <Route exact path="/meals" component={MealLinks}/>
        <Route component={Error}/>
      </Switch>
      <Footer/>
    </>
  );
}

export default App;
