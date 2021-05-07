require("dotenv").config();
const express = require("express");
const massive = require("massive");

const { SERVER_PORT, CONNECTION_STRING } = process.env;

app.use(express.json());

app.listen(SERVER_PORT, () => {
  console.log(`Listening on Port ${SERVER_PORT}!`);
});

massive({
  connectionString: CONNECTION_STRING,
  SSL: {
    rejectUnauthorized: false,
  },
})
  .then((dbInstance) => {
    app.set("db", dbInstance);
    console.log("Successfully established connection with remote database.");
  })
  .catch((error) => {
    console.log(error);
    return error;
  });
