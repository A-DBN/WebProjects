import React, { useState } from "react";
import {StyleSheet,Text,View,TextInput,Switch,TouchableOpacity} from "react-native";
import { SubscribeToServiceWeather, UnsubscribeToAction, SubscribeToAction,UnsubscribeFromService } from './Sub';

export default function Weather() {
    const [channel, setChannel] = useState('');
    const [isEnabled, setIsEnabled] = useState(false);
    const [isEnabledtwo, setIsEnabledtwo] = useState(false);
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
        !isEnabled ? SubscribeToAction('weather', 'weather_change') : UnsubscribeToAction('weather', 'weather_change');
    };
    const toggleSwitchtwo = () => {
        setIsEnabledtwo(previousStatetwo => !previousStatetwo);
        !isEnabledtwo ? SubscribeToAction('weather', 'ip_change') : UnsubscribeToAction('weather', 'ip_change');
    };

    return (
      <View styles={styles.container}>
        <View style={styles.inputView}>
          <TextInput style={styles.TextInput} placeholder="Weather" placeholderTextColor="#003f5c"
              onChangeText={(channel) => setChannel(channel)}
          />
        </View>
        <View style={styles.inputView}>
            <Text style={styles.switchStyle}>Get updates on the weather</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#eab308" }}
                    thumbColor={isEnabled ? "#eab308" : "#f4f3f4"}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                    />
        </View>
        <View style={styles.inputView}>
            <Text style={styles.switchStyle}>Get an update when your ip change</Text>
                <Switch 
                    trackColor={{ false: "#767577", true: "#eab308" }}
                    thumbColor={isEnabledtwo ? "#eab308" : "#f4f3f4"}
                    onValueChange={toggleSwitchtwo}
                    value={isEnabledtwo}
                    />
        </View>
        <View style={styles.inputView} opacity={!channel ? 0.5:1}>
                <TouchableOpacity style={styles.loginBtn} disabled={!channel} title="Subscribe" onPress={() => SubscribeToServiceWeather(channel)}>
                    <Text style={styles.textStyle}>Subscribe</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.inputView}>
                <TouchableOpacity style={styles.loginBtn} title="Unsubscribe" onPress={() => UnsubscribeFromService('weather')}>
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
  switchStyle: {
      fontSize: 12,
      color: "#000",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
  },
});