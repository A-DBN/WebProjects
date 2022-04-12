import { OAuthProvider, GoogleAuthProvider, GithubAuthProvider, signInWithEmailAndPassword, sendEmailVerification,
    createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "./firebase";
import {getDatabase, child, set, get, ref} from "firebase/database";


export const Signup = async (email, password, {navigation}) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        createUser(user.uid, email, {});
        alert("You've received a mail, please confirm your email adress.");
        navigation.navigate('Login');
        sendEmailVerification(auth.currentUser);
    } catch (e) {
        console.error(e);
        alert(e.message);
    };
}

export const SignIn = async (email, password, navigation) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user.emailVerified;
        if (user === false) {
            alert("Please verify your email");
        }
        console.log("You're connected");
        alert("You're connected!");
        navigation.navigate('Home');
    } catch (e) {
        console.error(e);
        alert(e.message);
    };
}

export const Logout = async ({navigation}) => {
    try{
        await signOut(auth);
        alert("You have successfully logged out");
        navigation.navigate('Login');
    } catch (e) {
        console.error(e);
        alert(e.message);
    }
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
