const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db = require("./api/apiQueries");
const PORT = 5000;
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/weatherAPI", db.getDataFromWeatherApi);

app.listen(PORT, () => {
  console.log(`server  running on ${PORT}`);
});
