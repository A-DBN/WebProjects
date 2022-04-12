import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, Plateform, StatusBar, View} from "react-native";

const Dashboard = () => {

  return (
  <Text style={styles.text}>In night city you can become @ saucisse</Text>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 25,
    fontWeight: '500',
  },
  AndroidSafeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  loginBtn: {
    elevation: 8,
    backgroundColor: "#5E72EB",
    borderRadius: 5,
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

export default Dashboard;