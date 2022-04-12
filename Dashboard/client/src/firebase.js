import { React, useEffect, useState } from 'react';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/compat/app";
import 'firebase/compat/auth'
import './firebase.css'
import { Navigate } from 'react-router';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAaiKflv2F0VnDCioXXyyfMaDxA5Gtxaj8",
    authDomain: "epidashboard-332413.firebaseapp.com",
    databaseURL: "https://epidashboard-332413-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "epidashboard-332413",
    storageBucket: "epidashboard-332413.appspot.com",
    messagingSenderId: "460328128181",
    appId: "1:460328128181:web:7fd3f6a2e09a59d6c838fc",
    measurementId: "G-K81R4MGEH3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const uiConfig = {
    signInFlow: "redirect",
    signInSuccessUrl: "/dashboard",
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID
    ],
};

function SignInScreen() {
    const [isSignedIn, setIsSignedIn] = useState(false); //local-only state

    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
            setIsSignedIn(!!user);
        });
        return () => { unregisterAuthObserver() };
    }, []);
    if (!isSignedIn) {
        return (
            <div>
                <h1>Sign In</h1>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
            </div>
        );
    }
    return <Navigate to="/dashboard" />;
}

export default SignInScreen;