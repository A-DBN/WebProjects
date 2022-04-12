import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {StyleSheet,Text,View,Image,TextInput,Button,TouchableOpacity} from "react-native";

const Backnav = (navigation) => {
    alert("Back adress correctly set up");
    navigation.navigate('Login');
}

const BackSelection = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={require("../../assets/favicon.png")} />

        <StatusBar style="auto" />
        <View style={styles.inputView}>
          <TextInput style={styles.TextInput} placeholder="Back Adress" placeholderTextColor="#003f5c"
            onChangeText={(Adress) => backAdress = Adress}/>
        </View>
        <TouchableOpacity style={styles.loginBtn} title="Yes" onPress={() => Backnav(navigation)}>
          <Text style={styles.textStyle}>Confirm Back adress</Text>
        </TouchableOpacity>
      </View>
    );
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

export default BackSelection;