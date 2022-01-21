import React, { useState, useEffect, useCallback } from "react";
import "./meal_with_id.css";
import ShowMeals from "./showmeals_with_reservation";
import ShowReviews from "./showReviews";

const MealsWithId = (props) => {
  const [name, setName] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [meals, setMeals] = useState([]);
  const [isReservationAvailable, setIsReservationAvailable] = useState(false);
  const [availableReservations, setAvailableReservations] = useState(0);
  const [showReservationForm, setShowReservationForm] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviews, setReviews] = useState([]);

  const SearchMeal = useCallback(() => {
    console.log(props.id);
    let apiUrl = "/api/meals/" + props.id;
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
        }
      });
  }, []);

  const findAvailableReservations = useCallback(() => {
    console.log("in findAvailableReservations");

    console.log(props.id);
    let apiUrl = "/api/meals/?availableReservations=true";
    console.log(apiUrl);
    fetch(apiUrl)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        if (result) {
          const items = result.filter((item) => item.id == props.id);

          console.log(items);
          if (items.length > 0) {
            setIsReservationAvailable(true);

            let availability = items[0]["availableReservations"];

            console.log(availability);

            setAvailableReservations(availability);
          }
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
    console.log("noOfGuests", numberOfGuests);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    console.log("email", email);
  };
  const onChangeContact = (e) => {
    setContact(e.target.value);
    console.log("contact", contact);
  };

  const ToShowForm = () => {
    setShowReservationForm(true);
  };

  const showReviews = () => {
    let apiUrl = "/api/reviews/" + props.id;
    console.log(apiUrl);
    setShowReviewForm(true);
    fetch(apiUrl)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setReviews(result);
      });
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
        id:  props.id+count,
      }),
    };
    fetch("/api/reservations", requestOptions)
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
                  <ShowMeals
                    title={meal.title}
                    price={meal.price}
                    description={meal.description}
                    setMeals={setMeals}
                    availableReservations={availableReservations}
                    key={meal.id}
                  />
                </div>
              );
            })}

            <hr></hr>
            <br></br>
            <button
              className="btn"
              onClick={ToShowForm}
              style={{
                display: isReservationAvailable ? "inline-block" : "none",
              }}
            >
              Make Reservation
            </button>
            <button className="review-btn" onClick={showReviews}>
              Reviews
            </button>

            <div
              style={{
                display: showReviewForm ? "inline-block" : "none",
              }}
            >
              {reviews.map((review) => {
                return (
                  <div>
                    <div>
                      <ShowReviews title={review.title} />
                    </div>
                    <hr></hr>
                  </div>
                );
              })}
            </div>

            <form
              style={{ display: showReservationForm ? "inline-block" : "none" }}
            >
              <h2>Add Reservation for above cuisine</h2>

              <label>no of guests:</label>
              <input
                className="field"
                type="number"
                value={numberOfGuests}
                required
                onChange={onChangeNumberOfGuests}
              />

              <label>name:</label>
              <input
                className="field"
                type="text"
                value={name}
                required
                onChange={onChangeName}
              />

              <label>phonenumber:</label>
              <input
                className="field"
                type="number"
                value={contact}
                required
                onChange={onChangeContact}
              />

              <label>email:</label>
              <input
                className="field"
                type="email"
                value={email}
                required
                onChange={onChangeEmail}
              />

              <button className="btn" onClick={SubmitForm}>
                Add Reservation
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealsWithId;
