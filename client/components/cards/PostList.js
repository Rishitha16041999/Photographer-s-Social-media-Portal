import renderHTML from 'react-render-html';
import {useContext} from "react";
import moment from "moment";
import { Avatar } from 'antd';
import {HeartOutlined, HeartFilled, CommentOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons'
import {UserContext} from "../../context";
import { useRouter } from "next/router";
import Link from 'next/link';
import Post from "../../components/cards/Post";



 const PostList = ({posts, handleDelete, handleLike, handleUnlike, handleComment, removeComment }) => {
   const [state] = useContext(UserContext);
   //console.log(posts);
   const router = useRouter();
    return (
        <>
   { posts && posts.map((post) => (
     <Post
     key={post._id} 
     post={post} 
     handleDelete={handleDelete}
    handleLike={handleLike}
     handleUnlike={handleUnlike}
     handleComment={handleComment}
     removeComment={removeComment}
     />
  ))}
  </>
  );
};

export default PostList;

        {/* {post.image && (
          <div style={{backgroundImage:"url(" + post.image.url + ")",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundSize: "cover",
          height: "300px",
          
          
          }}>

            </div>
        )} */}