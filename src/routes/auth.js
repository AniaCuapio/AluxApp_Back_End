const express = require("express");
const { request, response } = require("express");
const router = express.Router();
const user = require("../usecases/users");

router.post("/sign-up", async (request, response) => {
  try {
    const signUpUser = await user.signUp(request.body);
    response.json({
      success: true,
      data: {
        user: signUpUser,
      },
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      error: error.message,
    });
  }
});

router.post("/sign-in", async (request, response) => {
  try {
    const { email, password } = request.body;
    const token = await user.login(email, password);
    response.json({
      success: true,
      data: {
        token,
      },
    });
  } catch (error) {
    response.status(401);
    response.json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
