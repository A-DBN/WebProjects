import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, StatusBar, TouchableOpacity, View} from "react-native";
import { Logout } from "../../auth";

const LogoutPage = (navigation) => {

  return (
    <View style={styles.container}>
        <View style={styles.inputView}>
          <Text style={styles.descStyle}>Do you want to log out ?</Text>
        </View>
        <TouchableOpacity style={styles.loginBtn} title="Yes" onPress={() => Logout(navigation)}>
          <Text style={styles.textStyle}>Yes</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
  
    inputView: {
      backgroundColor: "#f3f3f3",
      borderRadius: 30,
      width: "70%",
      height: 45,
      marginBottom: 20,
      alignItems: "center",
      alignSelf: "center",
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
    descStyle: {
      fontSize: 14,
      color: "#000",
      alignSelf: "center",
      marginTop: 10,
      textTransform: "uppercase"
    },
  });

export default LogoutPage;  