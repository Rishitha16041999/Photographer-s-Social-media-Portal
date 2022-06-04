import {Avatar, Card} from 'antd';
import moment from "moment";
import { useRouter } from 'next/router';
import { UserContext } from '../../context';
import { useContext, useState, useEffect } from 'react';
import {LeftCircleOutlined } from "@ant-design/icons";
import Link from "next/link";
import {toast} from "react-toastify";
import axios from 'axios';

const {Meta} = Card;
const Username = () => {
    const [state, setState] = useContext(UserContext);
    const [user, setUser] = useState([]);
    const router = useRouter();
    useEffect(()=>{
     if(router.query.username) fetchUser();
    }, [router.query.username]);

    const fetchUser = async() => {
        try{
            const{data} = await axios.get(`/user/${router.query.username}`);
         //   console.log("router.query.username =>", data);
            setUser(data);
        }catch(err){
            console.log(err);
        }
    };

    const imageSource = (user) => {
        if(user.image){
            return user.image.url;
        }
        else{
        return '/images/logo.png';
        }
    };
        
  
    
   
    return (
        <div className='row col-md-6 offset-md-3'>
            <div className='pt-5 pb-5'>
        {/* <pre>{JSON.stringify(user,null,4)}</pre>  */}
        <Card small hoverable cover={<img src={imageSource(user)} width="50%" alt={user.fname}/>}>
             <Meta title={user.fname}    description={user.about}/>

             <p className='pt-2 text-muted'>Joined {moment(user.createdAt).fromNow()}</p>
          
          
          <p className="pt-2 text-muted">
            <b>Interested Areas in Photography:</b> {user.interest}
          </p>
          <p className="pt-2 text-muted">
            <b>Email</b>: {user.email}
          </p>
          <p className="pt-2 text-muted">
          <b>Place</b>: {user.citystate}
          </p>

          <div className="d-flex justify-content-left">
          
         
          <b>Connections </b>:   {user.followers && user.followers.length} Followers and  {user.following && user.following.length} Following

        
          
            </div>
        </Card>
     

        <Link href="/user/dashboard"><a className="d-flex justify-content-center pt-5"><LeftCircleOutlined style={{ fontSize: '175%'}}/></a></Link>
        </div>
        </div>

    );
};

export default Username;
