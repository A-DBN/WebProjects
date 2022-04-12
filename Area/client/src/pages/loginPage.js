import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, Signin, SigninGoogle, SigninMicrosoft, SigninGithub } from "../auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsMicrosoft, BsGoogle, BsGithub } from "react-icons/bs";
import { HiOutlineLogin } from "react-icons/hi";
import Button from 'react-bootstrap/Button';
import "./loginPage.css";

function LoginForm() {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    // eslint-disable-next-line
    const [user, loading, error] = useAuthState(auth);
    let navigate = useNavigate();

    useEffect(() => {
        if (loading) { return; }
        if (user) {
            console.log(auth.currentUser.getIdToken(true));
            navigate("/services/youtube", { replace: true })
        }
        // eslint-disable-next-line
    }, [user, loading]);

    return (
        <div className="login">
            <div className="login_container">
                <div className="title_login">Login</div>
                <input
                    type="text"
                    className="login_textBox"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    placeholder="E-mail Address"
                />
                <input
                    type="password"
                    className="login_textBox"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    placeholder="Password"
                />
                <Button className="login_btn" onClick={() => Signin(email, password)}>
                    <HiOutlineLogin className="logo"/>
                    Login
                </Button>
                <Button className="login_btn login_github" onClick={SigninGithub}>
                    <BsGithub className="logo"/>
                    Login with Github
                </Button>
                <Button className="login_btn login_google" onClick={SigninGoogle}>
                    <BsGoogle className="logo"/>
                    Login with Google
                </Button>
                <Button className="login_btn login_microsoft" onClick={SigninMicrosoft}>
                    <BsMicrosoft className="logo"/>
                    Login with Microsoft
                </Button>
                <div>
                    <Link to="/reset">Forgot Password</Link>
                </div>
                <div>
                    Don't have an account? <Link to="/signup">Sign up</Link> now.
                </div>
            </div>
        </div>
    );
}

export default LoginForm;