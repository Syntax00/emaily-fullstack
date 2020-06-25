const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const passport = require("passport");
const cookieSession = require("cookie-session");

require("./models/Users");
require("./services/passportInit");

mongoose.connect(keys.mongoURL, { useNewUrlParser: true });

const app = express();

// app.use() is a function that is used to inject Middlewares to Express's app
// A Middleware --> a small function that is used to modify incoming requests to our app, before they are sent off to the
// route handlers. They do some preprocessing on the incoming requests before they're sent off to the route handlers.
// That's why Middlewares are considered a great locations to locate some logic that is common to many different route handlers.
// Examples: Request 1 is coming from a Client app to out Server. In our current case, this request will go throught/piped in
// the specified Middlewares sequentially, one by one. Each Middleware will modify the `req` object with some data. After getting
// modified by the Middlewares, the `req` object will be sent off normally to the route handlers with the data from Middlewares
// attached to it.
app.use(
  cookieSession({ maxAge: 30 * 24 * 60 * 60 * 1000, keys: [keys.cookieKey] })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/auth")(app);

const PORT = process.env.PORT || 7000;

app.listen(PORT);
