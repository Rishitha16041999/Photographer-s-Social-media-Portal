import { useState, useContext, useEffect } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import { Modal } from "antd";
import Link from "next/link";
import { SyncOutlined } from '@ant-design/icons';
import {useRouter} from "next/router";
import { UserContext } from "../context";

//import AuthForm from '../components/forms/AuthForm';

const Login = () => {


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false);
    
    const[state, setState] = useContext(UserContext);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            console.log(email);
            console.log(password);
            const { data } = await axios.post(`/login`, {

                email,
                password
            });
             if(data.error)
             {
                 toast.error(data.error);
                 setLoading(false);
              }
              else{
                    //Update context
                    setState({
                        user: data.user,
                        token: data.token,
                    });

                    //Save in local storage
                        window.localStorage.setItem('auth',JSON.stringify(data));

                    //console.log(data);
                    router.push("/");
              }

         

           } catch (err) {
           toast.error(err.response.data);
            setLoading(false);
        }
    };

   if(state && state.token) router.push("/");


    return (
        <div className="container-fluid">
            <div className="row p-5 bg-default-image">
                <div className="col text-center">
                    <h3>Login</h3>
                </div>
            </div>



            <div className="row py-5">
                <div className="col-md-6 offset-md-3">

                    <form>


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

                        <div className="text-center">
                            <button disabled={!email || !password} type="button" className="btn btn-info col-12" onClick={handleSubmit}> {loading ? <SyncOutlined spin className="py-1" /> : "LOGIN"} </button>
                        </div>

                    </form>

                </div>
            </div>

            <div className="row">
                <div className="col">
                    <p className="text-center">Not yet registered? {" "}   <Link href="/register">
                        <a>Register here</a>
                    </Link>
                    </p>
                </div>

            </div>
                    <div className="row">
                        <div className="col">
                            <p className="text-center">Forgot password? {" "}   <Link href="/forgot-password">
                            <a className="text-danger">Click here to reset</a>
                               </Link>
                             </p>
                        </div>
                    </div>
        </div>
    );
};

export default Login;