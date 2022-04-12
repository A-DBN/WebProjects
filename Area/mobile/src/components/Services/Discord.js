import { Link } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {StyleSheet,Text,View,Image,TextInput,Switch,TouchableOpacity, Linking} from "react-native";
import { SubscribeToServiceDiscord, UnsubscribeToAction, SubscribeToAction,UnsubscribeFromService } from './Sub';

export default function Discord() {
    const [channel, setChannel] = useState('');
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
        !isEnabled ? SubscribeToAction('discord', 'new_mention') : UnsubscribeToAction('discord', 'new_mention');
    };

    return (
      <View styles={styles.container}>
        <View style={styles.inputView}>
          <TextInput style={styles.TextInput} placeholder="Discord ID" placeholderTextColor="#003f5c"
              onChangeText={(channel) => setChannel(channel)}
          />
        </View>
        <View style={styles.inputView}>
            <TouchableOpacity style={styles.loginBtn} title="Invite Discord Bot" onPress={() => { Linking.openURL('https://discord.com/api/oauth2/authorize?client_id=948214284842840064&permissions=8&scope=bot')}}>
                <Text style={styles.textStyle}>Invite Discord Bot</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.inputView}>
            <Text style={styles.switchStyle}>Get info when there is a new mention</Text>
              <Switch
                    trackColor={{ false: "#767577", true: "#5865F2" }}
                    thumbColor={isEnabled ? "#5865F2" : "#f4f3f4"}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                    />
            </View>
        <View style={styles.inputView} opacity={!channel ? 0.5:1}>
            <TouchableOpacity style={styles.loginBtn} disabled={!channel} title="Subscribe" onPress={() => SubscribeToServiceDiscord(channel)}>
                <Text style={styles.textStyle}>Subscribe</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.inputView}>
            <TouchableOpacity style={styles.loginBtn} title="Unsubscribe" onPress={() => UnsubscribeFromService('discord')}>
                <Text style={styles.textStyle}>Unsubscribe</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.inputView}>
          <Text style={styles.TextInput}>Don't forget to invite the bot to your discord server</Text>
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
    width: "90%",
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
      backgroundColor: "#5865F2",
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