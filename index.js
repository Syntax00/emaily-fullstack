const express = require("express");
require('./services/passportInit');

const app = express();

require('./routes/auth')(app);



const PORT = process.env.PORT || 7000;

app.listen(PORT);
