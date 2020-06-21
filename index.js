const express = require("express");
const app = express();

app.get("/", (request, response) => {
  response.send({ hi: "there" });
});

const PORT = process.env.PORT || 7000;
app.listen(PORT);
