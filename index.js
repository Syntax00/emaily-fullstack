const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
require("./models/Users");
require("./services/passportInit");

mongoose.connect(keys.mongoURL, { useNewUrlParser: true });

const app = express();

require("./routes/auth")(app);

const PORT = process.env.PORT || 7000;

app.listen(PORT);
