import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, Plateform, StatusBar, TouchableOpacity, View} from "react-native";

const Service = ({navigation}) => {

  return (
    <View styles={styles.container}>
        <View styles={styles.inputView}>
            <TouchableOpacity style={styles.loginBtnYoutube} title="Youtube" onPress={() => navigation.navigate('Youtube')}>
                <Text style={styles.textStyle}>Youtube</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtnTwitch} title="Twitch" onPress={() => navigation.navigate('Twitch')}>
                <Text style={styles.textStyle}>Twitch</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtnDiscord} title="Discord" onPress={() => navigation.navigate('Discord')}>
                <Text style={styles.textStyle}>Discord</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtnGoogle} title="Google" onPress={() => navigation.navigate('Google')}>
                <Text style={styles.textStyle}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtnIntra} title="Intra" onPress={() => navigation.navigate('Intra')}>
                <Text style={styles.textStyle}>Intranet</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtnCovid} title="Covid" onPress={() => navigation.navigate('Covid')}>
                <Text style={styles.textStyle}>Covid</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtnNews} title="News" onPress={() => navigation.navigate('News')}>
                <Text style={styles.textStyle}>News</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtnWeather} title="Weather" onPress={() => navigation.navigate('Weather')}>
                <Text style={styles.textStyle}>Weather</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtnSpotify} title="Spotify" onPress={() => navigation.navigate('Spotify')}>
                <Text style={styles.textStyle}>Spotify</Text>
            </TouchableOpacity>
        </View>
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
  
    image: {
      marginBottom: 40,
    },
  
    inputView: {
        backgroundColor: "#f3f3f3",
        borderRadius: 30,
        width: "70%",
        height: 60,
        marginBottom: 20,
        alignItems: "center",
        alignSelf: "center",
    },
    loginBtnIntra: {
        elevation: 8,
        backgroundColor: "#5E72EB",
        borderRadius: 100,
        paddingVertical: 10,
        paddingHorizontal: 12,
        width: '65%',
        marginBottom: 10,
    },
    loginBtnCovid: {
        elevation: 8,
        backgroundColor: "#ef4444",
        borderRadius: 100,
        paddingVertical: 10,
        paddingHorizontal: 12,
        width: '65%',
        marginBottom: 10,
    },
    loginBtnYoutube: {
        elevation: 8,
        backgroundColor: "#ef4444",
        borderRadius: 100,
        paddingVertical: 10,
        paddingHorizontal: 12,
        width: '65%',
        marginBottom: 10,  
    },
    loginBtnNews: {
        elevation: 8,
        backgroundColor: "#3b83f6",
        borderRadius: 100,
        paddingVertical: 10,
        paddingHorizontal: 12,
        width: '65%',
        marginBottom: 10,  
    },
    loginBtnDiscord: {
        elevation: 8,
        backgroundColor: "#5865F2",
        borderRadius: 100,
        paddingVertical: 10,
        paddingHorizontal: 12,
        width: '65%',
        marginBottom: 10,  
    },
    loginBtnGoogle: {
        elevation: 8,
        backgroundColor: "#ff7f00",
        borderRadius: 100,
        paddingVertical: 10,
        paddingHorizontal: 12,
        width: '65%',
        marginBottom: 10,  
    },
    loginBtnTwitch: {
        elevation: 8,
        backgroundColor: "#6441a5",
        borderRadius: 100,
        paddingVertical: 10,
        paddingHorizontal: 12,
        width: '65%',
        marginBottom: 10,  
    },
    loginBtnSpotify: {
        elevation: 8,
        backgroundColor: "#1DB954",
        borderRadius: 100,
        paddingVertical: 10,
        paddingHorizontal: 12,
        width: '65%',
        marginBottom: 10,  
    },
    loginBtnWeather: {
        elevation: 8,
        backgroundColor: "#eab308",
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

export default Service;