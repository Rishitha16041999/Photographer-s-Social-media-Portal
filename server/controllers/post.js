import Post from "../models/post";
import User from "../models/user";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const createPost = async (req, res) => {
  console.log("post =>", req.body);
  console.log(req);
  const { content, image } = req.body;
  if (!content.length) {
    return res.json({
      error: "Content is required",
    });
  }
  try {
    const post = new Post({ content, image, postedBy: req.auth._id });
    post.save();
    res.json(post);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

export const uploadImage = async (req, res) => {
  // console.log("req files => ", req.files);
  try {
    const result = await cloudinary.uploader.upload(req.files.image.path);
    //console.log("Uploaded image ur =>", result);
    res.json({
      url: result.secure_url, //https url
      public_id: result.public_id,
    });
  } catch (err) {
    console.log(err);
  }
};

export const postsByUser = async (req, res) => {
  try {
    // const posts = await Post.find({postedBy: req.auth._id}).populate('postedBy','_id fname image').sort({createdAt: -1 }).limit(10);
    // console.log("posts",posts)
    const posts = await Post.find()
      .populate("postedBy", "_id fname image")
      .sort({ createdAt: -1 })
      .limit(10);
    res.json(posts);
  } catch (err) {
    console.log(err);
  }
};

export const userPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params._id)
      .populate("postedBy", "_id fname image")
      .populate("comments.postedBy", "_id fname image");
    res.json(post);
  } catch (err) {
    console.log(err);
  }
};

export const updatePost = async (req, res) => {
  // console.log("Post update controller =>" , req.body);
  try {
    const post = await Post.findByIdAndUpdate(req.params._id, req.body, {
      new: true,
    });
    res.json(post);
  } catch (err) {
    console.log(err);
  }
};
export const deletePost = async (req, res) => {
  // console.log("Post update controller =>" , req.body);
  try {
    const post = await Post.findByIdAndDelete(req.params._id);
    //remove image from cloudinary
    if (post.image && post.image.public_id) {
      const image = await cloudinary.uploader.destroy(post.image.public_id);
    }
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
  }
};

export const newsFeed = async (req, res) => {
  try {
    const user = await User.findById(req.auth._id);
    //   console.log("user"+ user);
    let following = user.following;
    following.push(req.auth._id);
    //pagination
    const currentPage = req.params.page || 1;
    const perPage = 3;

    //  console.log(following);
    const posts = await Post.find({ postedBy: { $in: following } })
      .skip((currentPage - 1) * perPage)
      .populate("postedBy", "_id fname image")
      .populate("comments.postedBy", "_id fname image")
      .sort({ createdAt: -1 })
      .limit(perPage);
    //  console.log(posts);
    res.json(posts);
  } catch (err) {
    console.log(err);
  }
};

export const likePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.body._id,
      {
        $addToSet: { likes: req.auth._id },
      },
      { new: true }
    );
    res.json(post);
  } catch (err) {
    console.log(err);
  }
};

export const unlikePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.body._id,
      {
        $pull: { likes: req.auth._id },
      },
      { new: true }
    );
    res.json(post);
  } catch (err) {
    console.log(err);
  }
};

export const addComment = async (req, res) => {
  try {
    const { postId, comment } = req.body;
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { comments: { text: comment, postedBy: req.auth._id } },
      },
      { new: true }
    )
      .populate("postedBy", "_id fname image")
      .populate("comments.postedBy", "_id fname image");
    res.json(post);
  } catch (err) {
    console.log(err);
  }
};

export const removeComment = async (req, res) => {
  try {
    const { postId, comment } = req.body;
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { comments: { _id: comment._id } },
      },
      { new: true }
    );
    res.json(post);
  } catch (err) {
    console.log(err);
  }
};

export const totalPosts = async (req, res) => {
  try {
    const total = await Post.find().estimatedDocumentCount();
    res.json(total);
  } catch (err) {
    console.log(err);
  }
};
