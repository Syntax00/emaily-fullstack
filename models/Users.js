const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
});

// Create a new collection called 'users' and SET Mongoose's schema to 'userSchema'
mongoose.model('users', userSchema);
