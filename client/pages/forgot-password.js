import { useState, useContext } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import { Modal } from "antd";
import Link from "next/link";
import { SyncOutlined } from '@ant-design/icons';
import { UserContext } from '../context';
import { useRouter } from "next/router";
//import AuthForm from '../components/forms/AuthForm';

const ForgotPassword = () => {


    const [email, setEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [ok, setOk] = useState(false);
    const [loading, setLoading] = useState(false);

    const [state] = useContext(UserContext);
    const router = useRouter();


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const { data } = await axios.post(`/forgot-password`, {
                email,
                newPassword,
            });
            console.log("forgot password res data =>", data);
             
            if (data.error) {
                toast.error(data.error);
                setLoading(false);
              }
              if (data.success) {
                setEmail("");
                setNewPassword("");
                setSecret("");
                setOk(true);
                setLoading(false);
              }

            } catch (err) {
                console.log(err);
           // toast.error(err.response.data);
            setLoading(false);
        }
    };

    if (state && state.token) router.push("/");


    return (
        <div className="container-fluid">
            <div className="row p-5 bg-default-image">
                <div className="col text-center">
                    <h3>Reset Password</h3>
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
                                    <label className="text-muted">New password</label>
                                </small>
                                <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="password" className="form-control" />
                            </div>
                        </div>


                        <div className="text-center">
                            <button disabled={!email || !newPassword ||loading } type="button" className="btn btn-info col-12" onClick={handleSubmit}> {loading ? <SyncOutlined spin className="py-1" /> : "SUBMIT"} </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <Modal
                        title="Yay! Congratulations :)"
                        visible={ok}
                        onCancel={() => setOk(false)}
                        footer={null}


                    >
                        <p>Password reset successful! You can now login with your new password</p>
                        <Link href="/login">
                            <a className="btn btn-primary btn-sm">Login</a>
                        </Link>
                    </Modal>
                </div>
            </div>


        </div>
    );
};

export default ForgotPassword;