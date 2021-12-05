import React, { useState, useEffect, useCallback } from "react";

import ShowUser from "./showmeals";

const MealLinks = () => {
  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [location, setLocation] = useState("");
  
  const [max_reservations, setMaxReservations] = useState("");
  const [price, setPrice] = useState("");
  const [meals, setMeals] = useState([]);

  const apiBaseUrl = "http://localhost:3000/api/meals";

  const SearchUser = useCallback((value) => {
    /* setUsers([]);
    setEmpty(true); */

    console.log("in search user");
    let apiUrl = "http://localhost:3000/api/meals";
    console.log(apiUrl);
    fetch(apiUrl)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        console.log(result);

        if (result) {
          const items = result
            .map((item) => item)
            // .filter((item) => item.startsWith(value));

          setMeals((prev) => {
            /* setIsLoading(false);
            setEmpty(false); */

            return prev.concat(items);
          });

          console.log(meals);
        }
      });
    
  }, []);

  useEffect(() => {
    SearchUser();
  }, [SearchUser]);

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
    console.log("title", title);
  
  };
  const onChangeDescription = (e) => {
    setDescription(e.target.value);
    console.log("description", description);
  
  };
  const onChangeLocation= (e) => {
    setLocation(e.target.value);
    console.log("location", location);
  
  };
  const onChangeMaxReservations = (e) => {
    setMaxReservations(e.target.value);
    console.log("max_res", max_reservations);
  
  };
  const onChangePrice = (e) => {
    setPrice(e.target.value);
    console.log("price", price);
  
  };


  let count = meals.length;

  const SubmitForm = () => {
    
    console.log('in submit form');
    count = count + 1;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title,
        description: description,
        location: location,
        max_reservations:max_reservations,
        price: price,
        when:new Date(),
        id:count 
       })
  };
  fetch('http://localhost:3000/api/meals', requestOptions)
      .then(response => response.json())
      .then((result=>{
        console.log(result)
      }));
    }
   
  
 

  

  return (
    <div>
<h2>Add a meal here</h2>
        <div className="form">
        <label>title:</label>
        <input className="App" type="text" value={title} onChange={onChangeTitle} />
        <br></br>
        <label for="">description:</label>
        <input className="App" type="text" value={description} onChange={onChangeDescription} />
        <br></br>
        <label for="">location:</label>
        <input className="App" type="text" value={location} onChange={onChangeLocation} />
        <br></br>
        
        <label for="">max_reservations:</label>
        <input className="App" type="number" value={max_reservations} onChange={onChangeMaxReservations} />
        <br></br>
        <label for="">price:</label>
        <input className="App" type="number" value={price} onChange={onChangePrice} />
        <br></br>
        <button onClick={SubmitForm}>Add Meal</button>
        
      </div>
      {/* <input className="App" type="text" value={name} onChange={onChangeName} /> */}
      <br></br>
      {/* <div style={{ display: isEmpty ? "inline-block" : "none" }}>
        No Result
      </div>

      <div style={{ display: isLoading ? "inline-block" : "none" }}>
        ...loading
      </div> */}

      {meals.map((user) => {
        let url = "/meals/"+user.id;
        return (
          <div>
            <a href={url}>{user.title}</a>
          </div>
        );
      })}
    </div>
  );
};

export default MealLinks;
