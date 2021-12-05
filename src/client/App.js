import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AllMeals from "./all_meals";
import MealsWithId from "./meal_with_id";
import MealLinks from "./meallinks";


    {/* <Router>
      <Route exact path="http://localhost:3000/">
        <p>test</p>
      </Route>
      <Route exact path="/lol">
        <p>lol</p>
      </Route>
      <Route exact path="/test-component">
        <TestComponent></TestComponent>
      </Route>
    
    </Router>   */}



    

function App() {

 
  return (
    <body className="body">
      <main className="main">
        {/* first section of grid model */}
       
         
        <div className="div1">
          <h1>eattoghethereveryday!!</h1>
        
        </div>

        {/* second section of grid model */}
        <div className="div2">
          <header className="nav">
            <nav>
              <ul>
                <li>
                  <a href="#home">home</a>
                </li>
                <li>
                  <a href="#about">about</a>
                </li>
                <li>
                  <a href="#our services">our services</a>
                </li>
                <li>
                  <a href="#our office">our office</a>
                </li>
              </ul>
            </nav>
          </header>
        </div>

        {/* third section of grid model */}
         <div className="div3">
          <img
            src="https://www.wininganddining.dk/application/files/1414/7816/7416/wininganddining-top-01.jpg"
            alt="showing a restaurant"
          /> 
          
          <div className="center">
            <h1>Unforgettable culinary experiences</h1>
          </div>
        </div>

        
        <div className="meal-list">
          <h4>delicious cuisines</h4>
          <section>
          
          <Router>
            <Route exact path="/">
              <AllMeals/>
            </Route>
            <Route exact path="/meals/:id" component={(props) => (
                <MealsWithId id={props.match.params.id} />
              )} />
          </Router>  
          <Route exact path="/meals">
              <MealLinks/>
            </Route>
          

           
          </section>
        </div>

        {/* eighth section of grid model */}
        <div class="div8">
          <footer>
            {/* first section of flexbox */}
            <div class="flexone">
              <h3>FIND US</h3>
              <address></address>
              <p id="contact">
                Hack Your Future
                <br />
                Copenhagen
                <br />
                M-Th:7am-4pm
                <br />
                fri-Sat:9am-8pm
              </p>
            </div>
            {/*second section of flexbox */}
            <div class="flextwo">
              <h3>About this page</h3>
              <p>
                This is a footer
                <br />
                of the page for
                <br />
                mealsharing app
              </p>
            </div>
            {/* third section of flexbox */}
            <div class="flexthree">
              <h3>Archives</h3>
              <ul>
                <li>
                  <a href="a">March 2016</a>
                </li>
                <li>
                  <a href="b"> Feb 2016</a>
                </li>
                <li>
                  <a href="c"> Jan 2016</a>
                </li>
              </ul>
            </div>
            {/* fourth section of flexbox */}
            <div class="flexfour">
              <h3>Navigation</h3>
              <ul>
                <li>
                  <a href="#nav">Home</a>
                </li>
                <li>
                  <a href="#nav">About</a>
                </li>
                <li>
                  <a href="#nav">History</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
                <li>
                  <a href="#nav">Blog</a>
                </li>
              </ul>
            </div>
          </footer>
        </div>
       
        
      </main>
    </body>
  );
}






export default App;
