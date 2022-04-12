import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {StyleSheet,Text,View,Image,TextInput,Button,TouchableOpacity} from "react-native";
import { SignIn, SigninGoogle, SigninGithub, SigninMicrosoft } from "../../auth";
import {firebase, firebaseConfig} from '@react-native-firebase/auth';

if (firebase.app.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={require("../../assets/favicon.png")} />

        <StatusBar style="auto" />
        <View style={styles.inputView}>
          <TextInput style={styles.TextInput} placeholder="Email" placeholderTextColor="#003f5c"
            onChangeText={(email) => setEmail(email)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput style={styles.TextInput} placeholder="Password" placeholderTextColor="#003f5c" secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>

        <TouchableOpacity>
          <Text style={styles.forgot_button} onPress={() => navigation.navigate('Register')}>Doesn't have an account ?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginBtn} title="Login" onPress={() => SignIn(email, password, navigation)}>
          <Text style={styles.textStyle}>Login</Text>
        </TouchableOpacity>
      </View>
    );

  } else {
    navigation.navigate('Home');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: "#f3f3f3",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,

    alignItems: "center",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  loginBtn: {
    elevation: 8,
    backgroundColor: "#5E72EB",
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: '65%',
    marginBottom: 10,
    
  },
  textStyle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
});

export default Login;