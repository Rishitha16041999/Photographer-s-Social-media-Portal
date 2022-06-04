import { useContext, useState, useEffect } from "react";
import {UserContext} from "../../context";
import UserRoute from "../../components/routes/userRoute";
import PostForm from "../../components/forms/PostForm";
import {useRouter, userRouter} from "next/router";
import axios from 'axios';
import {toast} from "react-toastify";
import PostList from "../../components/cards/PostList";
import renderHTML from 'react-render-html';
import { Avatar } from 'antd';
import moment from "moment";

const Workshop = () => {

    const [state, setState] =useContext(UserContext);

    //state
    const [content, setContent] = useState("");
    const [image, setImage] = useState({})
    const [uploading, setUploading] = useState(false);
    const [posts, setPosts] = useState([]);
  
    //route
    const router = useRouter();

    useEffect(() => {
      if(state && state.token)  
      {
          fetchUserPosts();
        
      }
    }, [state && state.token]);

    const fetchUserPosts = async () => {
      try{
        const {data} = await axios.get("/user-workshop");
      //  console.log("User posts =>",data);
      setPosts(data);
      }catch(err)
      {
          console.log(err);
      }
    };

    const postSubmit = async (e) => {
        e.preventDefault();
       // console.log("post =>", content);
       try{
         const { data } = await axios.post("/create-workshop", { content, image });
         console.log("Create post response =>", data);
         if(data.error){
             toast.error(data.error);
         } else{
            fetchUserPosts();
             toast.success("Workshop created");
             setContent("");
             setImage({});
         }
       }catch(err){
           console.log(err);
       }
    };

    

    const handleImage = async (e) => {
        const file = e.target.files[0];
        let formData = new FormData()
        formData.append('image',file);
        
       // console.log([...formData]);
       setUploading(true);
        try{
           const {data} = await axios.post("/upload-image", formData);
          // console.log("Uploaded image => ", data);
          setImage({
              url: data.url,
              public_id: data.public_id,
          })
           setUploading(false);
        }catch(err){
            console.log(err);
            setUploading(false);
        }
    };

    const handleDelete = async(post) => {
        try{
          const answer = window.confirm("Are you sure you want to delete this post?");
          if(!answer) return;
          const {data} = await axios.delete(`/delete-workshop/${post._id}`);
          toast.error("Workshop deleted");
          fetchUserPosts();
        }catch(err){
            console.log(err);
        }
    };

  



    return (
        <UserRoute>
        <div className="container-fluid">
        <div className="row p-5 bg-default-image">
                <div className="col text-center">
                    <h3>Workshops and Events</h3>
                </div>
            </div>
           
         <div className="row col-md-10 offset-md-3" >
         <div className="col-md-8">
         <div className="form-group">
            <small>
                <label className="text-muted">Workshop/Event Title</label>
            </small>
            <br/>
            <input name="title"  type="text" className="form-control" />
        </div>

             
              <br/>

              <div className="form-group">
            <small>
                <label className="text-muted">Workshop Details</label>
            </small>
            <br/>
         
        </div>
              <PostForm 
              content={content}
              setContent={setContent}
              postSubmit={postSubmit}
              handleImage={handleImage}
              uploading={uploading}
              image={image}
               />
            <br/>
            {
                            posts && posts.map((post) => {
                                console.log(post);
                                return (
                                    <div key={post._id} className="card mb-5">
                                        <div className="card-header">
                                            <Avatar size={40}>{post.postedBy.fname[0]} </Avatar> {" "}
                                            <span className="pt-2 ml-3" style={{ marginLeft: "1rem" }}>
                                                {post.postedBy.fname} </span>
                                            <span className="pt-2 ml-3" style={{ marginLeft: '1rem' }}>{moment(post.createdAt).fromNow()}</span>

                                        </div>
                                        <div className="card-body"> {renderHTML(post.content)}</div>

                                    </div>
                                )

                            })
                        }
         </div>

            {/* <pre>{JSON.stringify(posts, null, 4)}</pre> */}

          


         </div>

        </div>
        </UserRoute>
         
    );
};
export default Workshop;