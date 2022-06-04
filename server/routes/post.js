import express from "express";
import formidable from "express-formidable";
const router= express.Router();

//middleware
import { requireSignin, canEditDeletePost } from "../middlewares";

//Controllers
import {createPost, uploadImage, postsByUser, userPost, updatePost, deletePost, newsFeed, likePost, unlikePost, addComment, removeComment, totalPosts} from "../controllers/post";
import { blogPost, blogsByUser, createBlog, deleteBlog, updateBlog } from "../controllers/blog";
import { createWorkshop, deleteWorkshop, updateWorkshop, workshopByUser, workshopPost } from "../controllers/workshop";

router.post("/create-post", requireSignin, createPost );
router.post("/create-blog", requireSignin, createBlog);
router.post("/create-workshop", requireSignin, createWorkshop);

router.post("/upload-image", requireSignin, formidable({maxFileSize: 5 * 1024 * 1024 }), uploadImage);
//posts
router.get("/user-posts", requireSignin, postsByUser);
router.get("/user-blogs", requireSignin, blogsByUser);
router.get("/user-workshop", requireSignin, workshopByUser);

router.get('/user-post/:_id', requireSignin, userPost);
router.get('/user-blog/:_id', requireSignin, blogPost);
router.get('/user-workshop/:_id', requireSignin, workshopPost);

router.put('/update-post/:_id', requireSignin, canEditDeletePost, updatePost);
router.put('/update-blog/:_id', requireSignin, canEditDeletePost, updateBlog);
router.put('/update-workshop/:_id', requireSignin, canEditDeletePost, updateWorkshop);


router.delete('/delete-post/:_id', requireSignin, canEditDeletePost, deletePost);
router.delete('/delete-blog/:_id', requireSignin, canEditDeletePost, deleteBlog);
router.delete('/delete-workshop/:_id', requireSignin, canEditDeletePost, deleteWorkshop);

router.get("/news-feed/:page", requireSignin, newsFeed);
//Exporting the file, so it can be added in server
router.put("/like-post", requireSignin, likePost);
router.put("/unlike-post", requireSignin, unlikePost);


router.put("/add-comment", requireSignin, addComment);
router.put("/remove-comment", requireSignin, removeComment);

router.get("/total-posts", totalPosts);
module.exports = router;
