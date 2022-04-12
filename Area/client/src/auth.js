import { OAuthProvider, GoogleAuthProvider, GithubAuthProvider,
        signInWithPopup, signInWithEmailAndPassword, sendEmailVerification,
        createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "./firebase";
import {getDatabase, child, set, get, ref} from "firebase/database";

const Signup = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword( auth, email, password);
        const user = userCredential.user;
        createUser(user.uid, email, {})
        await sendEmailVerification(auth.currentUser);
    } catch (e) {
        console.error(e);
        alert(e.message);
    }
};

const Signin = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user.emailVerified
        if (user === false) {
            alert("Please verify your email!")
        }
        console.log("You're connected!");
        // alert("You're connected!");
    } catch (e) {
        console.error(e);
        alert(e.message);
    }
};

const googleProvider = new GoogleAuthProvider();
const SigninGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        const dbRef = ref(getDatabase());
        get(child(dbRef, `users/${user.uid}`)).then((snapshot) => {
            if (!snapshot.exists()) {
                createUser(user.uid, user.email, {isGithub:true});
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    } catch (e) {
        console.error(e);
        alert(e.message);
    }
};

const microsoft = new OAuthProvider('microsoft.com').setCustomParameters({
    prompt: "consent",
    tenant: "000bfa5f-3818-4e97-8249-d3b277439e13"
});
const SigninMicrosoft = async () => {
    try {
        const result = await signInWithPopup(auth, microsoft);
        const user = result.user;
        const dbRef = ref(getDatabase());
        get(child(dbRef, `users/${user.uid}`)).then((snapshot) => {
            if (!snapshot.exists()) {
                createUser(user.uid, user.email, {isGithub:true});
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
        console.log(auth.currentUser.getIdToken(true));
    } catch (e) {
        console.error(e);
        alert(e.message);
    }
};

const github = new GithubAuthProvider().setCustomParameters({
    'allow_signup': 'false'
});
const SigninGithub = async () => {
    try {
        const result = await signInWithPopup(auth, github);
        const user = result.user;
        const dbRef = ref(getDatabase());
        get(child(dbRef, `users/${user.uid}`)).then((snapshot) => {
            if (!snapshot.exists()) {
                createUser(user.uid, user.email, {isGithub:true});
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
        const uid = auth.currentUser.getIdToken(true);
        console.log(uid);
    } catch (e) {
        console.error(e);
        alert(e.message);
    }
};

const Logout = async () => {
    await signOut(auth);
};

function createUser(uid, mail, isService) {
    set(ref(db, 'users/' + uid), {
        email: mail,
        subscriptions: {
            google: {
                isSubscribed: isService.isGoogle || false,
                actions : {
                    translate: false
                }
            },
            covid: {
                isSubscribed: false,
                reg: "",
                hosp: 0,
                rea: 0,
                actions : {
                    tracker: false
                }
            },
            intra: {
                isSubscribed: false,
                gpa: 0,
                netsoul: 0,
                credits: 0,
                alerts: '',
                actions: {
                    gpa: false,
                    netsoul: false,
                    credits: false,
                    alerts: false,
                }
            },
            twitch: {
                isSubscribed: false,
                channel: '',
                live_state: false,
                view_count: 0,
                actions : {
                    live_on: false,
                    milestone: false
                }
            },
            youtube: {
                isSubscribed: false,
                channel: '',
                video_id: '',
                sub_count: 0,
                actions: {
                    new_video: true,
                    milestone : false
                }
            },
            news: {
                isSubscribed: false,
                id: '',
                domain: '',
                actions : {
                    new_news: false
                }
            },
            weather: {
                isSubscribed: false,
                city: '',
                weather: '',
                ip: '',
                actions : {
                    weather_change: false,
                    ip_change: false
                }
            },
            twitter: {
                isSubscribed: false,
                oauth_token: '',
                mention_id: '',
                actions : {
                    new_mention: false,
                    new_like: false,
                }
            },
            discord : {
                isSubscribed: false,
                user_id: '',
                actions : {
                    new_mention: false
                }
            },
            spotify: {
                isSubscribed: false,
                trend: '',
                actions: {
                    new_trend: false
                }
            }
        }
    });
}

export { auth, SigninGithub, SigninMicrosoft, SigninGoogle, Signup, Signin, Logout };