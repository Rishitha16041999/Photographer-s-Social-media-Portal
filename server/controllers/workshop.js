import Workshop from "../models/workshop";
import cloudinary from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,

});

export const createWorkshop = async (req,res) =>{
    console.log("workshop =>", req.body);
    console.log(req);
   const {content, image} = req.body;
   if(!content.length)
   {
       return res.json({
           error: "Content is required",
       });
    }
   try{
     
    const workshop = new Workshop({content, image, postedBy: req.auth._id});
    workshop.save();
    res.json(workshop);
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

export const workshopByUser = async(req,res) => {
    try{
     // const posts = await Post.find({postedBy: req.auth._id}).populate('postedBy','_id fname image').sort({createdAt: -1 }).limit(10);
     // console.log("posts",posts)
     const workshop = await Workshop.find().populate('postedBy','_id fname image').sort({createdAt: -1 }).limit(10);
     res.json(workshop);
    }catch(err){
        console.log(err);
    }
};


export const workshopPost = async (req, res) => {
    try {
      const workshop = await Workshop.findById(req.params._id);
      res.json(workshop);
    } catch (err) {
      console.log(err);
    }
  };


  export const updateWorkshop = async (req,res) => {
     // console.log("Post update controller =>" , req.body);
     try{
        const workshop = await Workshop.findByIdAndUpdate(req.params._id, req.body, {
            new: true,
        });
        res.json(workshop);
     }catch(err)
     {
         console.log(err)
     }
  };
  export const deleteWorkshop = async (req,res) => {
    // console.log("Post update controller =>" , req.body);
    try{
       const workshop = await Workshop.findByIdAndDelete(req.params._id);
       //remove image from cloudinary
       if(workshop.image && workshop.image.public_id){
           const image = await cloudinary.uploader.destroy(workshop.image.public_id);
       }
       res.json({ok: true});
    }catch(err)
    {
        console.log(err)
    }
 };