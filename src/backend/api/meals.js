const express = require("express");
const router = express.Router();
const knex = require("../database");


 router.get("/", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const titles = await knex("meal").select("title");
    response.json(titles);
  } catch (error) {
    throw error;
  }
}); 

 router.get("/", async (request, response) => {
  try {
    //console.log(meals)
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const meals = await knex("meal");
    response.json(meals);
  } catch (error) {
    throw error;
  }
}); 

router.post("/", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const meals = await knex("meal")
      .insert({
        id: request.body.id,
        title: request.body.title,
        description: request.body.description,
        location: request.body.location,
        max_reservations: request.body.max_reservations,
        when: request.body.when,
        price: request.body.price,
      })
      .then(function (result) {
        response.json({ success: true, message: "ok" }); // respond back to request
      });
    //response.json(meals);
  } catch (error) {
    throw error;
  }
});

router.get("/:id", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const meals = await knex("meal").where("id", request.params.id);
    response.json(meals);
  } catch (error) {
    throw error;
  }
});

router.put("/:id", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const meals = await knex("meal")
      .update({
        title: request.body.title,
        description: request.body.description,
        location: request.body.location,
        max_reservations: request.body.max_reservations,
        when: request.body.when,
        price: request.body.price,
      })
      .where("id", request.params.id)
      .then(function (result) {
        response.json({ success: true, message: "ok" }); // respond back to request
      });
    //response.json(meals);
  } catch (error) {
    throw error;
  }
});

router.delete("/:id", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const meals = await knex("meal")
      .where("id", request.params.id)
      .del()
      .then(function (result) {
        response.json({ success: true, message: "ok" }); // respond back to request
      });
    //response.json(meals);
  } catch (error) {
    throw error;
  }
});

router.get("/", async (request, response) => {
  try {

    // knex syntax for selecting things. Look up the documentation for knex for further info
    const meals = await knex("meal");

    const maxPrice = request.query.maxPrice;
    const titles = request.query.title;
    const createdAfter = request.query.createdAfter;
    const availableReservations = request.query.availableReservations;
    const limit = request.query.limit;

    if (limit !== undefined && limit !== "" && maxPrice !== undefined && maxPrice !== "") {
      const filteredMeals = meals.filter((meal) => meal.price < maxPrice);
      const newMeals = [];
      console.log(limit);
      for (let i = 0; i < limit; i++) {
        console.log(i);
        newMeals.push(filteredMeals[i]);
      }
      response.send(newMeals);

    }
    else if (maxPrice !== undefined && maxPrice !== "") {
      console.log("maxPrice");
      const filteredMeals = meals.filter((meal) => meal.price < maxPrice);
      response.send(filteredMeals);
    } else if (titles !== undefined && titles !== "") {
      console.log("titles");
      const filteredTitle = meals.filter((meal) => meal.title.includes(titles));
      response.send(filteredTitle);

    } else if (availableReservations !== undefined && availableReservations !== "") {
      const filteredReservations = await knex("meal")
        .join('Reservation', 'meal.id', '=', 'Reservation.meal_id')
        //.select('meal_id','max_reservations','number_of_guests')
        .where('max_reservations', '>', 'number_of_guests');
      response.send(filteredReservations);
    } else if (createdAfter !== undefined && createdAfter !== "") {
      console.log(createdAfter);
      //console.log(meals);
      // const result = await knex("meal").where("created_date", ">", createdAfter);
      // response.send(result);

      const filteredMeals = meals.filter((meal) => meal.created_date > new Date(createdAfter));
      console.log(filteredMeals);
      response.send(filteredMeals);
    } else if (limit !== undefined && limit !== "") {
      console.log("limit");
      const newMeals = [];
      for (let i = 0; i < limit; i++) {
        console.log(i);
        newMeals.push(meals[i]);
      }
      response.send(newMeals);
    }

    else {
      let undefinedQueryParam = false;
      for (const key in request.query) {
        undefinedQueryParam = true;
      }
      console.log(undefinedQueryParam);
      if (undefinedQueryParam) {
        response.send("{ Error : Request contains undefined query parameter}");
      } else {
        response.send(meals);
      }
    }
  } catch (error) {
    throw error;
  }
});



module.exports = router;
