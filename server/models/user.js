const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new Schema(
  {
    fname: {
      type: String,
      trim: true,
      required: [true, "Please tell us your first name"],
    },
    lname: {
      type: String,
      trim: true,
      required: [true, "Please tell us your last name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email ID"],
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      min: 7,
      max: 15,
      required: [true, "Please set a password"],
    },
    gender: {
      type: String,
      possibleValues: ["Male", "Female"],
    },
    number: {
      type: Number,
      min: 10,
      required: [true, "Please enter your mobile number"],
    },
    citystate: {
      type: String,
      required: [true, "We would like to know where you are from"],
    },
    country: {
      type: String,
      required: [true, "We would like to know where you are from"],
    },
    interest: {
      type: String,
      required: [
        true,
        "Please tell us about your interested areas in Photography",
      ],
    },
    freelance: {
      type: String,
      possibleValues: ["Yes", "No"],
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    about: {
      type: String,
      required: [true, "We would like to know more about you!"],
    },
    image: {
      url: String,
      public_id: String,
    },
    following: [{ type: Schema.ObjectId, ref: "User" }],
    followers: [{ type: Schema.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('User',userSchema);