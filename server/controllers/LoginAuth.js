import User from "../models/user";
import { hashPassword, comparePassword } from "../helpers/auth";
import jwt from 'jsonwebtoken';


export const login = async (req, res) => {
  //  console.log(req.body);

  try {
    //Check if db has user with that email
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "No user found" });
    }
    //Check password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.json({ error: "Wrong password" });
    }

    //Create signed Token

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    user.password = undefined;
    user.secret = undefined;

    res.json({
      token,
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error! Try again");
  }
};

export const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.auth._id);
    //res.json(user);
   
    res.json({ ok: true });
  } catch (err) {
    //console.log(req.auth);
    console.log(err);
    res.sendStatus(400);
  }
};

export const forgotPassword = async(req,res) => {
 // console.log(req.body);
 //Validation

 const {email, newPassword} = req.body;
 if(!newPassword || !newPassword < 6)
 {
   return res.json({
     error: "New password is required and should be minimum 6 characters long",

   });
 }
const user = await User.findOne({email});
if(!user)
{
  return res.json({
    error: "Sorry! Verification failed,"
  });
}
try{

const hashed = await hashPassword(newPassword);
await User.findByIdAndUpdate(user._id, {password: hashed});
return res.json({
  success: "Congrats, now you can login with your new password",
});
} catch(err)
{
  console.log(err);
  return res.json({
    error: "Something wrong. Try again",
  });
}

};

export const profileUpdate = async(req,res) => {
  try{
  //  console.log("Profile update req.body", req.body);
  const data = {};
  if(req.body.username){
    data.username = req.body.username;

  }
  if(req.body.about){
    data.about = req.body.about;
    
  }
  if(req.body.citystate){
    data.citystate = req.body.citystate;
    
  }
  if(req.body.country){
    data.country = req.body.country;
    
  }
  if(req.body.number){
    data.number = req.body.number;
    
  }
  if(req.body.interest){
    data.interest = req.body.interest;
    
  }
  if(req.body.image){
    data.image = req.body.image;
    
  }
  let user = await User.findByIdAndUpdate(req.auth._id, data, {new: true});
  //console.log("Updated user", user);
  user.password = undefined;
  res.json(user);
  }catch(err){
    if(err.code == 11000)
    {
      return res.json({error: "Duplicate Username"});
    }
    console.log(err);
  }
};

export const findPeople = async(req,res)=>{
  //console.log(req);
  try{
   const user = await User.findById(req.auth._id);
   //userfollowing list
   //console.log(user);

   let following = user.following;
   following.push(user._id);
   const people = await User.find({_id: { $nin: following}}).select("-password").limit(10);
   res.json(people);
  }catch(err){
    console.log(err)
  }
};

export const addFollower = async(req,res,next) => {
  try {
    const user = await User.findByIdAndUpdate(req.body._id, {
      $addToSet: { followers: req.auth._id },
    });
    next();
  } catch (err) {
    console.log(err);
  }
};

export const userFollow = async(req,res) =>{
  try {
    const user = await User.findByIdAndUpdate(
      req.auth._id,
      {
        $addToSet: { following: req.body._id },
      },
      { new: true }
    ).select("-password");
    res.json(user);
  } catch (err) {
    console.log(err);
  }
};

export const userFollowing = async(req,res) =>{
  try {
    const user = await User.findById(req.auth._id);
    const following = await User.find({_id: user.following}).limit(100);
    res.json(following);
  } catch (err) {
    console.log(err);
  }
};

export const removeFollower = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.body._id, {
      $pull: { followers: req.auth._id },
    });
    next();
  } catch (err) {
    console.log(err);
  }
};

export const userUnfollow = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.auth._id,
      {
        $pull: { following: req.body._id },
      },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    console.log(err);
  }
};

export const searchUser = async (req, res) => {
  const { query } = req.params;
  if (!query) return;
  try {
    // $regex is special method from mongodb
    // The i modifier is used to perform case-insensitive matching
    const user = await User.find({
      $or: [
        { fname: { $regex: query, $options: "i" } },
        { username: { $regex: query, $options: "i" } },
      ],
    }).select("-password");
    res.json(user);
  } catch (err) {
    console.log(err);
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select(
      "-password"
    );
    res.json(user);
  } catch (err) {
    console.log(err);
  }
};