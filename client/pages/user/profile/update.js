import {useState, useContext,useEffect} from "react";
import axios from 'axios';
import {toast} from "react-toastify";
import {Modal, Avatar} from "antd";
import Link from "next/link";
import { SyncOutlined } from '@ant-design/icons';
import {UserContext} from '../../../context';
import {useRouter} from "next/router";
//import AuthForm from '../components/forms/AuthForm';
import { LoadingOutlined, CameraOutlined } from "@ant-design/icons";
const ProfileUpdate = () => {
   

    const [fname,setFName]=useState('')
    const [lname,setLName]=useState('')
    const [username, setUsername] = useState("");
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [gender, setGender] =useState('');
    const [number, setNumber] =useState('');
    const [citystate, setCitystate] =useState('');
    const [country, setCountry] =useState('');
    const [interest, setInterest] =useState('');
     const [freelance, setFreelance] =useState('');
    const [about, setAbout] =useState('');
    const [ok, setOk] = useState(false);
    const [loading, setLoading] =useState(false);

    const [image, setImage] = useState({})
    const [uploading, setUploading] = useState(false);

    const [state, setState] = useContext(UserContext);
    const router = useRouter();
    useEffect(()=> {
     if(state && state.user)
     console.log("User from state =>", state.user);
    setFName(state.user.fname);
    setLName(state.user.lname);
    setUsername(state.user.lname);
    setUsername(state.user.username);
    setEmail(state.user.email);
    setPassword(state.user.password);
    setGender(state.user.gender);
    setNumber(state.user.number);
    setCitystate(state.user.citystate);
    setCountry(state.user.country);
    setInterest(state.user.interest);
    setFreelance(state.user.freelance);
    setAbout(state.user.about);
    setImage(state.user.image);

    }, [state && state.user])


    const handleChange=(e)=>{
        setGender( e.target.value);
     }
     const handleChangeFreelancing=(e)=>{
         setFreelance( e.target.value);
      }

      const handleSubmit = async (e) => {
          e.preventDefault();
        
try{
    setLoading(true);
    const {data} = await axios.put(`/profile-update`,{
        fname,
        lname,
        username,
        email,
        password,
        gender,
        number,
        citystate,
        country,
        interest,
        freelance,
        about,
        image
      });
      console.log("Update response=>", data);
      if (data.error) {
          toast.error(data.error);
          setLoading(false);
      }
      else{
        setOk(true);
       // setOk(data.ok);
        setLoading(false);
        //update local storage, update user and keep token
        let auth = JSON.parse(localStorage.getItem("auth"));
        auth.user = data;
        localStorage.setItem("auth", JSON.stringify(auth));

        //update context 
        setState({...state, user: data});
        setOk(true);
       // setOk(data.ok);
        setLoading(false);
      }


        //  .then((res)=> setOk(res.data.ok))
            //.catch((err) => toast.error(err.response.data))

    }catch(err)
        {
            toast.error(err.response.data);
            setLoading(false);
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
    


    return (
        <div className ="container-fluid">
            <div className="row p-5 bg-default-image">
                <div className="col text-center">
                    <h3>Profile</h3>
                </div>
            </div>


  
           <div className="row py-5">
                <div className="col-md-6 offset-md-3">
                   
                   <label className="d-flex justify-content-center h5">
               {
                   image && image.url ? (
                       <Avatar size={30} src={image.url} className="mt-1"/>
                   ) :uploading ? ( <LoadingOutlined className='mt-2'/>) : ( <CameraOutlined className='mt-2'/>)
               }
            <input onChange={handleImage} type="file" accept="images/*" hidden/>
            </label>

                <form>
        <div className="form-group">
            <small>
                <label className="text-muted">First Name</label>
            </small>
            <input value={fname} onChange={(e) => setFName(e.target.value)} type="text" className="form-control" />
        </div>

        <div className="form-group">
            <small>
                <label className="text-muted">Last Name</label>
            </small>
            <input value={lname} onChange={(e) => setLName(e.target.value)} type="text" className="form-control" />
        </div>
        <div className="form-group">
            <small>
                <label className="text-muted">Username</label>
            </small>
            <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" className="form-control" />
        </div>
        <div className="form-group">
            <small>
                <label className="text-muted">Email address</label>
            </small>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="form-control" disabled />
        </div>
        <div className="mb-3">
            <div className="form-group">
                <small>
                    <label className="text-muted">Password</label>
                </small>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" />
            </div>
        </div>
        <div className="mb-3">
            <small>
                <label className="col-md-3 text-muted">Gender</label>
            </small>
            <div className="col-md-2 form-check form-check-inline">
                <input className="form-check-input" type="radio" name="gender" id="male" value="male" onChange={handleChange} />
                <label className="form-check-label">Male</label>
            </div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="gender" id="female" value="female" onChange={handleChange} />
                <label className="form-check-label">Female</label>
            </div>
        </div>

        <div className="form-group">
            <small>
                <label className="text-muted">Contact Number</label>
            </small>
            <input value={number} onChange={(e) => setNumber(e.target.value)} type="number" className="form-control" />
        </div>


        <div className="form-group">
            <small>
                <label className="text-muted">City & State</label>
            </small>
            <input value={citystate} onChange={(e) => setCitystate(e.target.value)} type="text" className="form-control" />
        </div>

        <div className="mb-3 form-group">
            <small>
                <label className="text-muted">Country</label>
            </small>
            <input value={country} onChange={(e) => setCountry(e.target.value)} type="text" className="form-control" />
        </div>

        <div className="mb-3 form-group">
            <small>
                <label className="text-muted">Interested areas in Photography</label>
            </small>
            <input value={interest} onChange={(e) => setInterest(e.target.value)} type="text" className="form-control" />
        </div>

        <div className="mb-3">
            <small>
                <label className="col-md-3 text-muted">Willing to freelance?</label>
            </small>
            <div className="col-md-2 form-check form-check-inline">
                <input className="form-check-input" type="radio" name="freelance" id="yes" value="yes" onChange={handleChangeFreelancing} />
                <label className="form-check-label" >Yes</label>
            </div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="freelance" id="no" value="no" onChange={handleChangeFreelancing} />
                <label className="form-check-label" >No</label>
            </div>
        </div>


        <div className="form-group mb-3">
            <small>
                <label className="form-label text-muted">Tell us about yourself</label>
            </small>
            <textarea value={about} onChange={(e) => setAbout(e.target.value)} className="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>
        </div>

        <div className="text-center">
            <button disabled={ProfileUpdate ? loading : page === "login" ? !email || !password || loading :
            !fname || !lname || !email || !password || !gender || !number || !citystate || !country ||!interest || !freelance || !about
        } type="button" className="btn btn-info col-12" onClick={handleSubmit}> {loading ? <SyncOutlined spin className="py-1" /> : "SUBMIT"} </button>
        </div>



    </form>
        


                </div>
            </div>

            <div className="row">
                <div className="col">
                    <Modal
                    title="Yay! :)" 
                    visible={ok}
                    onCancel={() =>setOk(false)}
                    footer={null}


                    >
                    <p>You have successfully updated your profile.</p>
                 
                    </Modal>
                </div>
            </div>
         

        </div>
    );
};

export default ProfileUpdate;