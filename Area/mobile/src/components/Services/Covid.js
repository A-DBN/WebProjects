import React, { useState } from "react";
import {StyleSheet,Text,View,Switch,TouchableOpacity} from "react-native";
import { SubscribeToServiceCovid, UnsubscribeToAction, SubscribeToAction,UnsubscribeFromService } from './Sub';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';

const data = [
    { label: 'Auvergne-Rhône-Alpes', value: 'Auvergne et Rhône-Alpes' },
    { label: 'Bourgogne-Franche-Comté', value: 'Bourgogne et Franche-Comté' },
    { label: 'Bretagne', value: 'Bretagne' },
    { label: 'Centre-Val de Loire', value: 'Centre-Val de Loire' },
    { label: 'Corse', value: 'Corse' },
    { label: 'Grand Est', value: 'Grand Est' },
    { label: 'Île-de-France', value: 'Île-de-France'},
    { label: 'Hauts-de-France', value: 'Hauts-de-France' },
    { label: 'Normandie', value: 'Normandie' },
    { label: 'Nouvelle-Aquitaine', value: 'Nouvelle Aquitaine' },
    { label: 'Occitanie', value: 'Occitanie'},
    { label: 'Pays de la Loire', value: 'Pays de la Loire'},
    { label: 'Provence-Alpes-Côte d\'Azur', value: 'Provence-Alpes-Côte d\'Azur' },
    { label: 'Guadeloupe', value: 'Guadeloupe' },
    { label: 'Martinique', value: 'Martinique' },
    { label: 'Guyane', value: 'Guyane' },
    { label: 'Réunion', value: 'Réunion' },
    { label: 'Mayotte', value: 'Mayotte' },
];

export default function Covid() {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
        !isEnabled ? SubscribeToAction('covid', 'tracker') : UnsubscribeToAction('covid', 'tracker');
    };

    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const renderLabel = () => {
      if (value || isFocus) {
        return (
          <Text style={[styles.label, isFocus && { color: '#ef4444' }]}>
            Region
          </Text>
        );
      }
      return null;
    };

    return (
      <View styles={styles.container}>
        <View style={styles.container}>
          {renderLabel()}
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: '#ef4444' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Select region' : '...'}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setValue(item.value);
                setIsFocus(false);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon}
                  name="Safety"
                  size={20}
                  />
                  )}
                  color={isFocus ? 'blue' : 'black'}
            />
        </View>
        <View style={styles.inputView}>
            <Text style={styles.switchStyle}>Get updates on the covid per region</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#ef4444" }}
                    thumbColor={isEnabled ? "#ef4444" : "#f4f3f4"}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                    />
        </View>
        <View style={styles.inputView} opacity={!value ? 0.5:1}>
                <TouchableOpacity style={styles.loginBtn} disabled={!value} title="Subscribe" onPress={() => SubscribeToServiceCovid(value)}>
                    <Text style={styles.textStyle}>Subscribe</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.inputView}>
                <TouchableOpacity style={styles.loginBtn} title="Unsubscribe" onPress={() => UnsubscribeFromService('covid')}>
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
      backgroundColor: "#ef4444",
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
  },container: {
    backgroundColor: '#fff',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: '#fff',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});