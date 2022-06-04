//Navigation bar

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { UserContext } from "../context";
import { useRouter } from "next/router";
import { Avatar } from "antd";
const Nav = () => {
    const [current, setCurrent] = useState("");
    const [state, setState] = useContext(UserContext);

    useEffect(() => {
        process.browser && setCurrent(window.location.pathname);
    }, [process.browser && window.location.pathname]);


    //  console.log("current =>",current);
    const router = useRouter();
    const logout = () => {
        window.localStorage.removeItem("auth");
        setState(null);
        router.push("/login");
    };

    return (
        <nav className="nav d-flex justify-content-right" style={{ backgroundColor: "#676FA3" }}>

            <Link href="/">
                <a className={`nav-link text-light ${current === "/"}`}>
                    <Avatar src="/images/logo.png" /> Photographer's Community</a>
            </Link>

            <Link href="/">
                <a className={`nav-link text-light ${current === "/" && "active"}`}>
                    Home</a>
            </Link>


            {state !== null ? (<>
                <div className="dropdown" >
                    <button className="btn dropdown-toggle text-light" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        {state && state.user && state.user.fname}
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><Link href="/user/dashboard ">
                            <a className={`nav-link dropdown-item ${current === "/user/dashboard" && "active"}`} >Newsfeed</a>
                        </Link></li>

                        <li><Link href="/user/blog ">
                            <a className={`nav-link dropdown-item ${current === "/user/blog" && "active"}`} >Blogs</a>
                        </Link></li>

                        <li><Link href="/user/workshop ">
                            <a className={`nav-link dropdown-item ${current === "/user/workshop" && "active"}`} >Workshops & Events</a>
                        </Link></li>

                        <li><Link href="/user/hire ">
                            <a className={`nav-link dropdown-item ${current === "/user/hire" && "active"}`} >Hire</a>
                        </Link></li>

                        <li><Link href="/user/profile/update ">
                            <a className={`nav-link dropdown-item ${current === "/user/profile/update" && "active"}`} >My Profile</a>
                        </Link></li>

                        <li>           <a onClick={logout} className="nav-link">Logout</a></li>

                    </ul>
                </div>

            </>) :

                (<>
                    <Link href="/login">
                        <a className={`nav-link text-light ${current === "/login" && "active"}`}>Login</a>
                    </Link>



                    <Link href="/register">
                        <a className={`nav-link text-light ${current === "/register" && "active"}`}>Sign up</a>
                    </Link>

                </>
                )}



        </nav>

    );
};

export default Nav;