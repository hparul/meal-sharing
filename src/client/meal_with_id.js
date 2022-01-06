import React, { useState, useEffect, useCallback } from "react";
import "./meal_with_id.css";
import ShowMeals from "./showmeals";

const MealsWithId = (props) => {
  const [name, setName] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [meals, setMeals] = useState([]);
const[isReservationAvailable,setIsReservationAvailable]=useState(false);
 

  const SearchMeal = useCallback(() => {
    console.log(props.id);
    let apiUrl = "http://localhost:3000/api/meals/" + props.id;
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
    console.log(meals);
  }, []);

  const findAvailableReservations = useCallback(() => {
    

    console.log("in findAvailableReservations");
    console.log(props.id);
    let apiUrl = "http://localhost:3000/api/meals/?availableReservations=true";
    console.log(apiUrl);
    fetch(apiUrl)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        if (result) {
          const items = result.filter((item) => (item.meal_idprops.id));

          console.log(items);
          if (items.length > 0) {
            setIsReservationAvailable(true);
            alert("this meal is still available for reservation");
          }

          console.log(isReservationAvailable);

          
        }
      });
    
  }, []);

  useEffect(() => {
    SearchMeal();
    findAvailableReservations();
  }, [SearchMeal]);

  const onChangeName = (e) => {
    setName(e.target.value);
    console.log("name", name);
  };
  const onChangeNumberOfGuests = (e) => {
    setNumberOfGuests(e.target.value);
    console.log("name", numberOfGuests);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    console.log("name", email);
  };
  const onChangeContact = (e) => {
    setContact(e.target.value);
    console.log("name", contact);
  };

  let count = 1;

  const SubmitForm = () => {
    count = count + 1;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contact_name: name,
        contact_phonenumber: contact,
        contact_email: email,
        meal_id: props.id,
        number_of_guests: numberOfGuests,
        created_date: new Date(),
        id: props.id + count,
      }),
    };
    fetch("http://localhost:3000/api/reservations", requestOptions)
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
    <br></br>
      {meals.map((meal) => {
        //console.log(meal);
        return (
          <div className="meal-with-id">
            <ShowMeals title={meal.title} price={meal.price} description={meal.description} setMeals={setMeals} />
          </div>
          );
        })}

<hr></hr>
    <br></br>
    <form style={{display:isReservationAvailable?"inline-block":"none"}}>
      <h2>Add Reservation for above cuisine</h2>
      
      
        <label>no of guests:</label>
        <input
          className="field"
          type="number"
          value={numberOfGuests} required
          onChange={onChangeNumberOfGuests}
        />
       
        <label>name:</label>
        <input
          className="field"
          type="text" 
          value={name} required
          onChange={onChangeName}
        />
        
        <label>phonenumber:</label>
        <input
          className="field"
          type="number"
          value={contact} required
          onChange={onChangeContact}
        />
       
        <label>email:</label>
        <input
          className="field"
          type="email"
          value={email} required
          onChange={onChangeEmail}
        />
       
        <button className="btn" onClick={SubmitForm}>Add Reservation</button>
      </form>
      </div>
      </div>
      
          
         
    </div>
    </div>
  );
};

export default MealsWithId;
