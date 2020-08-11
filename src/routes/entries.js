const express = require("express");
const entries = require("../usecases/entries");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/", async (request, response) => {
  try {
    const allEntries = await entries.getAll();
    response.json({
      success: true,
      data: {
        entries: allEntries,
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
    const entryById = await entries.getById(id);
    response.json({
      success: true,
      data: {
        entry: entryById,
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
    const newEntryData = request.body;
    const newEntry = await entries.create(newEntryData);
    response.json({
      success: true,
      data: {
        newEntry,
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
    const remove = await entries.remove(id);
    response.json({
      success: true,
      message: "entry deleted",
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
    const newEntryData = request.body;
    const update = await entries.update(id, newEntryData);
    response.json({
      success: true,
      data: {
        update,
      },
      message: "Post successfully updated",
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
