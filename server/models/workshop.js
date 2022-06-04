import mongoose from "mongoose";
const {ObjectId} = mongoose.Schema;

const workshopSchema = new mongoose.Schema({
    content: {
        type: {},
        required: true,
    },
    postedBy: {
      type: ObjectId,
      ref: "User",
    },
    // title: {
    //     type: String,
    
    //   },
    image: {
        url: String,
        public_id: String,
    },
   
}, 
{timestamps: true}
);

export default mongoose.model("Workshop", workshopSchema);