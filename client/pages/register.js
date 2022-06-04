import {useState, useContext} from "react";
import axios from 'axios';
import {toast} from "react-toastify";
import {Modal} from "antd";
import Link from "next/link";
import { SyncOutlined } from '@ant-design/icons';
import {UserContext} from '../context';
import {useRouter} from "next/router";
//import AuthForm from '../components/forms/AuthForm';

const Register = () => {
    
    const [fname,setFName]=useState('')
    const [lname,setLName]=useState('')
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

    const [state] = useContext(UserContext);
    const router = useRouter();
    
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
    const {data} = await axios.post(`/register`,{
        fname,
        lname,
        email,
        password,
        gender,
        number,
        citystate,
        country,
        interest,
        freelance,
        about
      });

      if (data.error) {
          toast.error(data.error);
          setLoading(false);
      }
      else{
        setFName('');
        setLName('');
        setEmail('');
        setPassword('');
        setGender('');
        setNumber('');
        setCitystate('');
        setCountry('');
        setInterest('');
        setFreelance('');
        setAbout('');
        setOk(data.ok);
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

        if(state && state.token) router.push("/");


    return (
        <div className ="container-fluid">
            <div className="row p-5 bg-default-image">
                <div className="col text-center">
                    <h3>Join the community</h3>
                </div>
            </div>


  
           <div className="row py-5">
                <div className="col-md-6 offset-md-3">
                   
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
                <label className="text-muted">Email address</label>
            </small>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="form-control" />
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
            <button disabled={!fname || !lname || !email || !password || !gender || !number || !citystate || !country || !interest || !freelance || !about} type="button" className="btn btn-info col-12" onClick={handleSubmit}> {loading ? <SyncOutlined spin className="py-1" /> : "SUBMIT"} </button>
        </div>



    </form>
        


                </div>
            </div>

            <div className="row">
                <div className="col">
                    <Modal
                    title="Yay! Congratulations :)" 
                    visible={ok}
                    onCancel={() =>setOk(false)}
                    footer={null}


                    >
                    <p>You have successfully registered! Welcome to the photographers' community.</p>
                    <Link href="/login">
                        <a className="btn btn-primary btn-sm">Login</a>
                    </Link>
                    </Modal>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <p className="text-center">Already registered? {" "}   <Link href="/login">
                        <a>Login</a>
                    </Link>
                    
                    </p>
                </div>

            </div>

        </div>
    );
};

export default Register;