const mongoose = require("mongoose");
const Joi = require("Joi");
const express = require("express");
const router = express.Router();

const genreSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 50 },
});

const Genre = mongoose.model("Genre", genreSchema);

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

router.post("/", async (req, res) => {
  validateReqBodyByJoi(req, res);
  const genre = new Genre({ name: req.body.name });
  const genreSaved = await genre.save(); // reuturns the actual genre document we save to the db
  res.send(genreSaved);
});

router.put("/:id", async (req, res) => {
  validateReqBodyByJoi(req, res);
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!genre) return res.status(404).send("The genre with that id not found!");
  res.send(genre);
});

router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAnsRemove(req.params.id);
  if (!genre) return res.status(404).send("The genre with that id not found!");
  res.send(genre);
});

function validateReqBodyByJoi(req, res) {
  const schema = Joi.object({
    category: Joi.string().min(3).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  }
}

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send("The genre with that id not found!");
  res.send(genre);
});

module.exports = router;
