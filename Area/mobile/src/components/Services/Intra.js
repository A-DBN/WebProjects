import React, { useState, useEffect } from "react";
import {StyleSheet,Text,View,Image,TextInput,Button,TouchableOpacity, Switch} from "react-native";
import { SubscribeToAction, UnsubscribeToAction, UnsubscribeFromService, SubscribeToServiceIntra } from './Sub';

export default function Intra() {
    const [channel, setChannel] = useState('');
    const [isEnabled, setIsEnabled] = useState(false);
    const [isEnabledtwo, setIsEnabledtwo] = useState(false);
    const [isEnabledthree, setIsEnabledthree] = useState(false);
    const [isEnabledfour, setIsEnabledfour] = useState(false);
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
        !isEnabled ? SubscribeToAction('intra', 'gpa') : UnsubscribeToAction('intra', 'gpa');
    };
    const toggleSwitchtwo = () => {
        setIsEnabledtwo(previousStatetwo => !previousStatetwo);
        !isEnabledtwo ? SubscribeToAction('intra', 'netsoul') : UnsubscribeToAction('intra', 'netsoul');
    };
    const toggleSwitchthree = () => {
        setIsEnabledthree(previousStatethree => !previousStatethree);
        !isEnabledthree ? SubscribeToAction('intra', 'credits') : UnsubscribeToAction('intra', 'credits');
    };
    const toggleSwitchfour = () => {
        setIsEnabledfour(previousStatefour => !previousStatefour);
        !isEnabledfour ? SubscribeToAction('intra', 'alerts') : UnsubscribeToAction('intra', 'alerts');
    };

    return (
        <View styles={styles.container}>
            <Text>{isEnabled}</Text>
            <View style={styles.inputView}>
                <TextInput style={styles.TextInput} placeholder="Autologin link / davude" placeholderTextColor="#003f5c"
                onChangeText={(channel) => setChannel(channel)}/>
            </View>
            <View style={styles.inputView}>
                <Text style={styles.switchStyle}>Get news on your gpa</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#5E72EB" }}
                    thumbColor={isEnabled ? "#5E72EB" : "#f4f3f4"}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                    />
            </View>
            <View style={styles.inputView}>
                <Text style={styles.switchStyle}>Get an update of your logtime</Text>
                <Switch 
                    trackColor={{ false: "#767577", true: "#5E72EB" }}
                    thumbColor={isEnabledtwo ? "#5E72EB" : "#f4f3f4"}
                    onValueChange={toggleSwitchtwo}
                    value={isEnabledtwo}
                    />
            </View>
            <View style={styles.inputView}>
                <Text style={styles.switchStyle}>Get an update of your credits</Text>
                <Switch 
                    trackColor={{ false: "#767577", true: "#5E72EB" }}
                    thumbColor={isEnabledthree ? "#5E72EB" : "#f4f3f4"}
                    onValueChange={toggleSwitchthree}
                    value={isEnabledthree}
                    />
            </View>
            <View style={styles.inputView}>
                <Text style={styles.switchStyle}>Get news of new notifs</Text>
                <Switch 
                    trackColor={{ false: "#767577", true: "#5E72EB" }}
                    thumbColor={isEnabledfour ? "#5E72EB" : "#f4f3f4"}
                    onValueChange={toggleSwitchfour}
                    value={isEnabledfour}
                    />
            </View>
            <View style={styles.inputView} opacity={!channel ? 0.5:1}>
                <TouchableOpacity style={styles.loginBtn} disabled={!channel} title="Subscribe" onPress={() => SubscribeToServiceIntra(channel)}>
                    <Text style={styles.textStyle}>Subscribe</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.inputView}>
                <TouchableOpacity style={styles.loginBtn} title="Unsubscribe" onPress={() => UnsubscribeFromService('intra')}>
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
    switchStyle: {
        fontSize: 12,
        color: "#000",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
  });