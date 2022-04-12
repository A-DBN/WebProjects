import React, { useState } from "react";
import {StyleSheet,Text,View,Switch,TouchableOpacity} from "react-native";
import { UnsubscribeToAction, SubscribeToAction,UnsubscribeFromService, SubscribeToServiceSpotify } from './Sub';

export default function Spotify() {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
        !isEnabled ? SubscribeToAction('spotify', 'new_trend') : UnsubscribeToAction('spotify', 'new_trend');
    };

    return (
      <View styles={styles.container}>
        <View style={styles.inputView}>
            <Text style={styles.switchStyle}>Get new trends info</Text>
              <Switch
                    trackColor={{ false: "#767577", true: "#1DB954" }}
                    thumbColor={isEnabled ? "#1DB954" : "#f4f3f4"}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                    />
            </View>
            <View style={styles.inputView}>
                <TouchableOpacity style={styles.loginBtn} title="Subscribe" onPress={() => SubscribeToServiceSpotify()}>
                    <Text style={styles.textStyle}>Subscribe</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.inputView}>
                <TouchableOpacity style={styles.loginBtn} title="Unsubscribe" onPress={() => UnsubscribeFromService('spotify')}>
                    <Text style={styles.textStyle}>Unsubscribe</Text>
                </TouchableOpacity>
            </View>
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
      height: 60,
      marginBottom: 20,
      alignItems: "center",
      alignSelf: "center",
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
      backgroundColor: "#1DB954",
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
  switchStyle: {
      fontSize: 12,
      color: "#000",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
  },
});