import React, { useState, useEffect, useCallback } from "react";

import ShowMeals from "./showmeals";

const MealsWithId = (props) => {
  const [name, setName] = useState("");

  const [numberOfGuests, setNumberOfGuests] = useState("");

  const [email, setEmail] = useState("");
  
  const [contact, setContact] = useState("");

  const [meals, setMeals] = useState([]);
  

  let isReservationAvailable = false;


  const apiBaseUrl = "http://localhost:3000/api/meals";

  const SearchUser = useCallback((value) => {
    // setMeals([]);
    // setEmpty(true);

    console.log("in search user");
    console.log(props.id);
    let apiUrl = "http://localhost:3000/api/meals/"+props.id;
    console.log(apiUrl);
    fetch(apiUrl)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        console.log(result.title);

        if (result) {
          const items = result
            .map((item) => item.title)
            // .filter((item) => item.startsWith(value));

          setMeals((prev) => {
           /*  setIsLoading(false);
            setEmpty(false);
 */
            return prev.concat(items);
          });

          console.log(meals);
        }
      });
    console.log(meals);
  }, []);

  

  const findAvailableReservations = useCallback((value) => {
    isReservationAvailable=false

    console.log("in findAvailableReservations");
    console.log(props.id);
    let apiUrl = "http://localhost:3000/api/meals/?availableReservations=true";
    console.log(apiUrl);
    fetch(apiUrl)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

      

        if (result) {
          const items = result
            // .map((item) => item)
             .filter((item) => item.meal_id = props.id);

  
             console.log(items);
          if (items.length > 0) {
            isReservationAvailable = true;
          }
          
          console.log(isReservationAvailable);
          

          /* setMeals((prev) => {
            return prev.concat(items);
          }
          ); */

          console.log(meals);
        }
      });
    console.log(meals);
  }, []);



  useEffect(() => {
    SearchUser();
    findAvailableReservations();
  }, [SearchUser]);

  

  const onChangeName = (e) => {
    setName(e.target.value);
    console.log("name", name);
    
  };const onChangeNumberOfGuests = (e) => {
    setNumberOfGuests(e.target.value);
    console.log("name", numberOfGuests);
   
  };const onChangeEmail = (e) => {
    setEmail(e.target.value);
    console.log("name", email);
  
  };const onChangeContact = (e) => {
    setContact(e.target.value);
    console.log("name", contact);
   
  };

  let count = 1;

  const SubmitForm = () => {
    

    count = count + 1;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contact_name: name,
        contact_phonenumber: contact,
        contact_email: email,
        meal_id:props.id,
        number_of_guests: numberOfGuests ,
        created_date:new Date(),
        id:props.id+count
       })
  };
  fetch('http://localhost:3000/api/reservations', requestOptions)
      .then(response => response.json())
      .then((result=>{
        console.log(result)
      }));
    }
   
  
 

  return (
    <div>

      {meals.map((meal) => {
        //console.log(user);
        return (
          <div style={{border:"2px solid black"}}>
            <ShowMeals list={meal} setMeals={setMeals} />
          </div>
        );
      })}
      <br></br>
      <br></br>
      <label>Add Reservation for above cuisine</label>
      <br></br>
      <br></br>
      <div className="form" >
        <label>no of guests:</label>
        <input className="App" type="number" value={numberOfGuests} onChange={onChangeNumberOfGuests} />
        <br></br>
        <label for="">name:</label>
        <input className="App" type="text" value={name} onChange={onChangeName} />
        <br></br>
        <label for="">phonenumber:</label>
        <input className="App" type="text" value={contact} onChange={onChangeContact} />
        <br></br>
        <label for="">email:</label>
        <input className="App" type="email" value={email} onChange={onChangeEmail} />
        <br></br>
        <button onClick={SubmitForm}>Add Reservation</button>
        
      </div>
      
    </div>
  );
};

export default MealsWithId;
