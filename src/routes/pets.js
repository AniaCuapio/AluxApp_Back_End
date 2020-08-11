const express = require("express");
const pets = require("../usecases/pets");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/", async (request, response) => {
  try {
    const allPets = await pets.getAll();
    response.json({
      success: true,
      data: {
        pets: allPets,
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

router.get("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const petById = await pets.getById(id);
    response.json({
      success: true,
      data: {
        pet: petById,
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

router.post("/", auth, async (request, response) => {
  try {
    const newPetData = request.body;
    const newPet = await pets.create(newPetData);
    response.json({
      success: true,
      data: {
        newPet,
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

router.delete("/:id", auth, async (request, response) => {
  try {
    const id = request.params.id;
    const remove = await pets.remove(id);
    response.json({
      success: true,
      message: "Pet deleted",
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      error: error.message,
    });
  }
});

router.patch("/:id", auth, async (request, response) => {
  try {
    const id = request.params.id;
    const newPetData = request.body;
    const update = await pets.update(id, newPetData);
    response.json({
      success: true,
      data: {
        update,
      },
      message: "Pet successfully updated",
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
