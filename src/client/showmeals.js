import React from "react";

const ShowMeals = (props) => {
  return (
    <div>
      <div>
        {props.title} : "{props.description}"
      </div>
      <div>Price:{props.price}DKK</div>
    </div>
  );
};

export default ShowMeals;
