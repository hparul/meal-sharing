const express = require("express");
const router = express.Router();
const knex = require("../database");

router.get("/", async (request, response) => {
  try {
    const reservations = await knex("Reservation");
    response.json(reservations);
  } catch (error) {
    throw error;
  }
});

router.get("/", async (request, response) => {
  try {
    const reservations = await knex("Reservation");
    response.json(reservations);
  } catch (error) {
    throw error;
  }
});

router.post("/", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const reservations = await knex("Reservation")
      .insert({
        id: request.body.id,

        created_date: request.body.created_date,
        contact_phonenumber: request.body.contact_phonenumber,
        contact_name: request.body.contact_name,
        contact_email: request.body.contact_email,
        number_of_guests: request.body.number_of_guests,
        meal_id: request.body.meal_id,
      })
      .then(function (result) {
        response.json({ success: true, message: "ok" }); // respond back to request
      });
  } catch (error) {
    throw error;
  }
});

router.get("/:id", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const reservations = await knex("Reservation").where(
      "id",
      request.params.id
    );
    response.json(reservations);
  } catch (error) {
    throw error;
  }
});

router.put("/:id", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const meals = await knex("Reservation")
      .update({
        id: request.body.id,
        number_of_guests: request.body.number_of_guests,
        meal_id: request.body.meal_id,
        created_date: request.body.created_date,
        contact_phonenumber: request.body.contact_phonenumber,
        contact_name: request.body.contact_name,
        contact_email: request.body.contact_email,
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
    const reservations = await knex("Reservation")
      .where("id", request.params.id)
      .del()
      .then(function (result) {
        response.json({ success: true, message: "ok" }); // respond back to request
      });
  } catch (error) {
    throw error;
  }
});

module.exports = router;
