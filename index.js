require("dotenv").config();
const express = require("express");
const massive = require("massive");
const products_controller = require("./products_controller");
const app = express();

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

app.post("/api/products", products_controller.create);
app.get("/api/products", products_controller.getAll);
app.get("/api/products/:id", products_controller.getOne);
app.put("/api/products/:id", products_controller.update);
app.delete("/api/products/:id", products_controller.del);
