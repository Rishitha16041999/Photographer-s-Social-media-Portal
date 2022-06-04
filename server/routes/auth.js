//Authentication related code - login and register

const express = require("express");
const router= express.Router();
//middleware
import { requireSignin } from "../middlewares";
//Controllers
import {register} from "../controllers/auth";
import {login, currentUser, forgotPassword, profileUpdate, findPeople, addFollower, userFollow, userFollowing, removeFollower, userUnfollow, searchUser, getUser} from "../controllers/LoginAuth";

//Post endpoint
router.post('/register', register );
router.post('/login', login);
router.get('/current-user',requireSignin, currentUser);
router.post('/forgot-password', forgotPassword);
//Exporting the file, so it can be added in server

router.put('/profile-update', requireSignin, profileUpdate);
router.get('/find-people', requireSignin, findPeople);


router.put('/user-follow', requireSignin, addFollower, userFollow);
router.get('/user-following', requireSignin, userFollowing);
router.put('/user-unfollow', requireSignin, removeFollower, userUnfollow);

router.get('/search-user/:query', searchUser);
router.get('/user/:username',getUser);
module.exports = router;
