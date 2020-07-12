const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("../config/keys");
const mongoose = require("mongoose");

// To fetch a collection's utils and schema out of Mongoose, we provide single argument (the collection's name)
const Users = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await Users.findById(id);
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async (_, __, profile, done) => {
      // 1- First, we need to determine whether or not the user that's currently trying to login exists already in our DB or not
      // If, he/she exists, we will not restore him/her again. Instead, we resume the flow. Else, we create a new Model Instance
      // for him/her, and then save this Record to MongoDB.
      const user = await Users.findOne({ googleId: profile.id });
      if (user) {
        // Resume authentication flow

        return done(null, user);
      }

      // 2- To insert/create a new Model Instance, we call the Users constructure, and provide it with the Document
      // Hint: creating a Model Instance, i.e. new Users({...}), exists only inside our JS application, not yet persisted in MongoDB
      // So, in order to persist this record/instance to MongoDB, we MUST call a method that exists on new Users({}), that's ".save()"

      // 2.1- Create new Model Instance
      const userInstance = new Users({
        googleId: profile.id,
      });

      // 2.2- Insert it in MongoDB
      const newUser = await userInstance.save();
      done(null, newUser);
    }
  )
);
