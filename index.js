const Joi = require("Joi");
const express = require("express");
const app = express();
app.use(express.json());
const genres = [
  { id: 1, category: "thriller" },
  { id: 2, category: "comedy" },
  { id: 3, category: "drama" },
];
app.get("/", (req, res) => {
  res.send("Wecome to vidly");
});

app.get("/videos/genres", (req, res) => {
  res.send(genres);
});

app.get("/videos/genres/:id", (req, res) => {
  const genre = genres.find((genre) => genre.id === parseInt(req.params.id));

  if (!genre || isNaN(req.params.id)) {
    return res.status(404).send("The genre with that id not found!");
  }
  res.send(genre);
});

app.post("/videos/genres", (req, res) => {
  validateReqBodyByJoi(req, res);

  const genre = {
    id: genres.length + 1,
    category: req.body.category,
  };
  genres.push(genre);
  res.send(genre);
});

app.put("/videos/genres/:id", (req, res) => {
  const genre = genres.find((genre) => genre.id === parseInt(req.params.id));

  if (!genre || isNaN(req.params.id)) {
    return res.status(404).send("The genre with that id not found!");
  }
  validateReqBodyByJoi(req, res);
  genre.category = req.body.category;
  res.send(genre);
});

app.delete("/videos/genres/:id", (req, res) => {
  const genre = genres.find((genre) => genre.id === parseInt(req.params.id));

  if (!genre || isNaN(req.params.id)) {
    return res.status(404).send("The genre with that id not found!");
  }

  const targetIndex = genres.indexOf(genre);
  genres.splice(targetIndex, 1);
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

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running and listening at port ${port}...`);
});
