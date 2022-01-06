import React, { useState, useEffect, useCallback } from "react";

const MealLinks = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [max_reservations, setMaxReservations] = useState("");
  const [price, setPrice] = useState("");
  const [meals, setMeals] = useState([]);
  const[showForm,setShowForm]=useState(false);

  const GetMeals = useCallback(() => {
    let apiUrl = "http://localhost:3000/api/meals";
    console.log(apiUrl);
    fetch(apiUrl)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        if (result) {
          const items = result.map((item) => item);

          setMeals((prev) => {
            return prev.concat(items);
          });

          console.log(meals);
        }
      });
  }, []);

  useEffect(() => {
    GetMeals();
  }, [GetMeals]);

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
    console.log("title", title);
  };
  const onChangeDescription = (e) => {
    setDescription(e.target.value);
    console.log("description", description);
  };
  const onChangeLocation = (e) => {
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

  const ToShowForm=()=>{
    setShowForm(true);
  }

  let count = meals.length;

  const SubmitForm = () => {
    console.log("in submit form");
    count = count + 1;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        description: description,
        location: location,
        max_reservations: max_reservations,
        price: price,
        when: new Date(),
        id: count,
      }),
    };
    fetch("http://localhost:3000/api/meals", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      });
  };

  return (
    <div>
      
      <div className="container">
        <div className="contact-box">
          <div className="left"></div>
            <div className="right">

            <hr></hr>
            <h2>Cuisines</h2>
            {meals.map((user) => {
              let url = "/meals/" + user.id;
              return (
                <div>
                  <div className="meal-links" >
                    <a href={url}>{user.title}</a>
                  </div>
                  <hr></hr>
                </div>
              );
            })}
            <button className="btn" onClick={ToShowForm}>Add more meals</button>
          
            <form style={{display: showForm ? "inline-block" : "none"}}> 
            <h2>Add a meal here</h2>
           
              <label>title:</label>
              <input
                className="field"
                type="text"
                value={title} required
                onChange={onChangeTitle}
              />
              
              <label>description:</label>
              <input
                className="field"
                type="text"
                value={description} required
                onChange={onChangeDescription}
              />
             
              <label>location:</label>
              <input
                className="field"
                type="text"
                value={location} required
                onChange={onChangeLocation}
              />
              
              
            
              <label>max_reservations:</label>
              <input
                className="field"
                type="number"
                value={max_reservations} required
                onChange={onChangeMaxReservations}
              />
              
              <label>price:</label>
              <input
                className="field"
                type="number"
                value={price} required
                onChange={onChangePrice}
              />
              
              <button onClick={SubmitForm}>Add Meal</button>
              </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealLinks;
