import Blog from "../models/blog";
import cloudinary from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,

});

export const createBlog = async (req,res) =>{
    console.log("post =>", req.body);
    console.log(req);
   const {content, image} = req.body;
   if(!content.length)
   {
       return res.json({
           error: "Content is required",
       });
    }
   try{
     
    const blog = new Blog({content, image, postedBy: req.auth._id});
    blog.save();
    res.json(blog);
   }catch(err){
       console.log(err);
       res.sendStatus(400);
   }
};

export const uploadImage = async(req,res) => {
   // console.log("req files => ", req.files);
   try{
    const result = await cloudinary.uploader.upload(req.files.image.path);
    //console.log("Uploaded image ur =>", result);
    res.json({
        url: result.secure_url, //https url
        public_id: result.public_id,
    });
   }catch(err){
       console.log(err);
   }
};

export const blogsByUser = async(req,res) => {
    try{
     // const posts = await Post.find({postedBy: req.auth._id}).populate('postedBy','_id fname image').sort({createdAt: -1 }).limit(10);
     // console.log("posts",posts)
     const blogs = await Blog.find().populate('postedBy','_id fname image').sort({createdAt: -1 }).limit(10);
     res.json(blogs);
    }catch(err){
        console.log(err);
    }
};


export const blogPost = async (req, res) => {
    try {
      const blog = await Blog.findById(req.params._id);
      res.json(blog);
    } catch (err) {
      console.log(err);
    }
  };


  export const updateBlog = async (req,res) => {
     // console.log("Post update controller =>" , req.body);
     try{
        const blog = await Blog.findByIdAndUpdate(req.params._id, req.body, {
            new: true,
        });
        res.json(blog);
     }catch(err)
     {
         console.log(err)
     }
  };
  export const deleteBlog = async (req,res) => {
    // console.log("Post update controller =>" , req.body);
    try{
       const blog = await Blog.findByIdAndDelete(req.params._id);
       //remove image from cloudinary
       if(blog.image && blog.image.public_id){
           const image = await cloudinary.uploader.destroy(blog.image.public_id);
       }
       res.json({ok: true});
    }catch(err)
    {
        console.log(err)
    }
 };