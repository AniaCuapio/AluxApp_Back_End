const express = require("express");
const { request, response } = require("express");
const cors = require("cors");
const app = express();

const entriesRouter = require("./src/routes/entries");
const usersRouter = require("./src/routes/users");
const petsRouter = require("./src/routes/pets");
const authRouter = require("./src/routes/auth");

//Este es un middleware
app.use(express.json());
app.use(cors());

//Aqui se monta el enrutador
app.use("/entries", entriesRouter);
app.use("/users", usersRouter);
app.use("/pets", petsRouter);
app.use("/", authRouter);

app.get("/", (request, response) => {
  response.json({
    success: true,
    message: "Alux API",
  });
});

module.exports = app;
