import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye,faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import '@fontsource/roboto/500.css'
import signupWordart from '../assets/signup.png'
import { auth, Signup } from "../auth";
import '../index.css';
import { useAuthState } from 'react-firebase-hooks/auth';

function SignupAndLogin(email, password) {
    Signup(email, password);
    console.log('Signup called');
}

function SignupForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [user, loading] = useAuthState(auth);

    let navigate = useNavigate();

    useEffect(() => {
        if (loading) { return; }
        if (user) {
            console.log(auth.currentUser.getIdToken(false));
            navigate("/", { replace: true })
        }
    });


    return (
        <div className='main-content flex h-screen w-screen flex-col'>
            <div className='self-center mb-6 mt-10'>
            <img className="form-header w-80" src={signupWordart} alt='signup icon' />
            </div>
            <div className='forms self-center'>
            <input className='mb-2' name='email' type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <br />
            <input name='password' type={showPassword ? 'text' : 'password'} placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <FontAwesomeIcon className='ml-2 scale-150 text-white' icon={showPassword ? faEyeSlash : faEye} onClick={() => setShowPassword(!showPassword)} />
            </div>
            <div className='self-center mt-8'>  
            <button className='bg-blue-500 rounded text-white text-lg hover:border-black border hover:bg-blue-600 px-4 py-2' onClick={() => SignupAndLogin(email, password)}>Sign Up</button>
            </div>
        </div>
    );
}

export default SignupForm;