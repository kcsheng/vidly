const genres = require("./routes/genres");
const home = require("./routes/home");
const express = require("express");
const app = express();
app.use(express.json());
app.use("/videos/genres", genres);
app.use("/", home);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running and listening at port ${port}...`);
});
