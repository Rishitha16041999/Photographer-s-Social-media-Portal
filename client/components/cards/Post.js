import renderHTML from 'react-render-html';
import { useContext } from "react";
import moment from "moment";
import { Avatar } from 'antd';
import { HeartOutlined, HeartFilled, CommentOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { UserContext } from "../../context";
import { useRouter } from "next/router";
import Link from 'next/link';


const Post = ({ post, handleDelete, handleLike, handleUnlike, handleComment, commentsCount, removeComment }) => {
  const [state] = useContext(UserContext);
  //console.log(posts);
  const router = useRouter();
  return (
    <>

      {post && post.postedBy && (<div key={post._id} className="card mb-5">
        <div className="card-header">
          <Avatar size={40}>{post.postedBy.fname[0]} </Avatar> {" "}
          <span className="pt-2 ml-3" style={{ marginLeft: "1rem" }}>
            {post.postedBy.fname} </span>
          <span className="pt-2 ml-3" style={{ marginLeft: '1rem' }}>{moment(post.createdAt).fromNow()}</span>

        </div>
        <div className="card-body"> {renderHTML(post.content)}</div>
        <div className="card-footer">

          <img src={post.image && post.image.url} />
          <br />
          <br></br>
          <div className="d-flex">

            {state && post.likes && state.user && post.likes.includes(state.user._id) ? (
              <HeartFilled onClick={() => handleUnlike(post._id)} className='text-danger pt-2 h5 px-2' />
            ) : (
              <HeartOutlined onClick={() => handleLike(post._id)} className='text-danger pt-2 h5 px-2' />
            )}

            <div className="pt-1 pl-3" style={{ marginRight: "1rem" }}>{post.likes.length}</div>
            <CommentOutlined onClick={() => handleComment(post)} className='text-danger p-2 h5 pl-5' />
            <div className="pt-1 pl-3"><Link href={`/post/${post._id}`}><a>{post.comments.length} comments</a></Link></div>

            {state && state.user && state.user._id === post.postedBy._id && (
              <>

                <EditOutlined onClick={() => router.push(`/user/post/${post._id}`)} className='text-danger pt-2 h5 px-2 mx-auto' />
                <DeleteOutlined onClick={() => handleDelete(post)} className='text-danger p-2 h5 pl-5' />
              </>
            )}

          </div>
        </div>
        {/*2 comments*/}
        {post.comments && post.comments.length > 0 && (
          <ol className='list-group' style={{ maxHeight: "150px", overflow: "scroll" }}>
            {post.comments.slice(0, commentsCount).map((c) => (
              <li key={c._id} className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div>
                    {<Avatar size={30}>{ } </Avatar>}
                    &nbsp;{c.postedBy.fname}

                  </div>
                  <b className="text-muted">{c.text}</b>

                </div>
                <span className="badge rounded-pill text-muted">{moment(c.created).fromNow()}
                  {state && state.user && state.user._id === c.postedBy._id && (
                    <div className='ml-auto mt-1'>
                      <DeleteOutlined onClick={() => removeComment(post._id, c)} className='pl-2 text-danger' />
                    </div>
                  )}
                </span>

              </li>
            ))}
          </ol>
        )}

      </div>)}

    </>
  );
};

export default Post;

