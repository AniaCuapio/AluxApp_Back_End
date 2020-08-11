const express = require("express");
const { request, response } = require("express");
const cors = require("cors");
const app = express();

const entriesRouter = require("./routes/entries");
const usersRouter = require("./routes/users");
const petsRouter = require("./routes/pets");
const authRouter = require("./routes/auth");

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
    message: "Alux API running",
  });
});

module.exports = app;
