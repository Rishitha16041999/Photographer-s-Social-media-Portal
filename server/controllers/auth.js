import User from "../models/user";
import { hashPassword, comparePassword } from "../helpers/auth";
import jwt from 'jsonwebtoken';
import {nanoid} from "nanoid";

export const register = async (req, res) => {
  //  console.log("REGISTER ENDPOINT =>", req.body);

  const { fname, lname, email, password, gender, number, citystate, country, interest, freelance, about } = req.body;
  //Validation
  if (!fname) {return res.json({error: "Name is required"});}
  if (!lname) {return res.json({error: "Name is required"});}
  if (!email) {return res.json({error: "Email ID is required"});}
  if (!password || password.length < 7) {return res.json({error: "Password is required and should be 7 characters long"});}
  if (!gender) {return res.json({error: "Gender is required"});}
  if (!number) {return res.json({error: "Number is required"});}
  if (!citystate) {return res.json({error: "City & State is required"});}
  if (!country) {return res.json({error: "Country is required"});}
  if (!interest) {return res.json({error: "This is a required field"});}
  if (!freelance) {return res.json({error: "This is a required field"});}
  if (!about){return res.json({error: "This is a required field"});}

  const exist = await User.findOne({ email });
  if (exist) {return res.json({error: "Email is already registered"});}

  //Hash password
  const hashedPassword = await hashPassword(password);

  const user = new User({ fname, lname, email, password: hashedPassword, gender, number, citystate, country, interest, freelance, username: nanoid(6), about });

  try {
    await user.save();
    //  console.log("REGISTERED USER =>", user);
    return res.json({
      ok: true,
    });
  } catch (err) {
    console.log("REGISTRATION FAILED =>", err);
    return res.status(400).send("Error, Try again");
  }


};






