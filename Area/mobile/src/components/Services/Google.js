import React, { useState, useEffect } from "react";
import {StyleSheet,Text,View,Image,TextInput,Switch,TouchableOpacity} from "react-native";
import { SendTranslate } from './Sub';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';

  const data = [
        { value: 'af', label: 'Afrikaans' },
        { value: 'sq', label: 'Albanian' },
        { value: 'am', label: 'Amharic' },
        { value: 'ar', label: 'Arabic' },
        { value: 'hy', label: 'Armenian' },
        { value: 'az', label: 'Azerbaijani' },
        { value: 'eu', label: 'Basque' },
        { value: 'be', label: 'Belarusian' },
        { value: 'bn', label: 'Bengali' },
        { value: 'bs', label: 'Bosnian' },
        { value: 'bg', label: 'Bulgarian' },
        { value: 'ca', label: 'Catalan' },
        { value: 'ny', label: 'Chichewa' },
        { value: 'co', label: 'Corsican' },
        { value: 'hr', label: 'Croatian' },
        { value: 'cs', label: 'Czech' },
        { value: 'da', label: 'Danish' },
        { value: 'nl', label: 'Dutch' },
        { value: 'en', label: 'English' },
        { value: 'eo', label: 'Esperanto' },
        { value: 'et', label: 'Estonian' },
        { value: 'tl', label: 'Filipino' },
        { value: 'fi', label: 'Finnish' },
        { value: 'fr', label: 'French' },
        { value: 'fy', label: 'Frisian' },
        { value: 'gl', label: 'Galician' },
        { value: 'ka', label: 'Georgian' },
        { value: 'de', label: 'German' },
        { value: 'el', label: 'Greek' },
        { value: 'gu', label: 'Gujarati' },
        { value: 'ht', label: 'Haitian Creole' },
        { value: 'ha', label: 'Hausa' },
        { value: 'iw', label: 'Hebrew' },
        { value: 'hi', label: 'Hindi' },
        { value: 'hu', label: 'Hungarian' },
        { value: 'is', label: 'Icelandic' },
        { value: 'ig', label: 'Igbo' },
        { value: 'id', label: 'Indonesian' },
        { value: 'ga', label: 'Irish' },
        { value: 'it', label: 'Italian' },
        { value: 'ja', label: 'Japanese' },
        { value: 'jw', label: 'Javanese' },
        { value: 'kn', label: 'Kannada' },
        { value: 'kk', label: 'Kazakh' },
        { value: 'km', label: 'Khmer' },
        { value: 'ko', label: 'Korean' },
        { value: 'ku', label: 'Kurdish (Kurmanji)' },
        { value: 'ky', label: 'Kyrgyz' },
        { value: 'lo', label: 'Lao' },
        { value: 'la', label: 'Latin' },
        { value: 'lv', label: 'Latvian' },
        { value: 'lt', label: 'Lithuanian' },
        { value: 'lb', label: 'Luxembourgish' },
        { value: 'mk', label: 'Macedonian' },
        { value: 'mg', label: 'Malagasy' },
        { value: 'ms', label: 'Malay' },
        { value: 'ml', label: 'Malayalam' },
        { value: 'mt', label: 'Maltese' },
        { value: 'mi', label: 'Maori' },
        { value: 'mr', label: 'Marathi' },
        { value: 'mn', label: 'Mongolian' },
        { value: 'my', label: 'Myanmar (Burmese)' },
        { value: 'ne', label: 'Nepali' },
        { value: 'no', label: 'Norwegian' },
        { value: 'ps', label: 'Pashto' },
        { value: 'fa', label: 'Persian' },
        { value: 'pl', label: 'Polish' },
        { value: 'pt', label: 'Portuguese' },
        { value: 'pa', label: 'Punjabi' },
        { value: 'ro', label: 'Romanian' },
        { value: 'ru', label: 'Russian' },
        { value: 'sm', label: 'Samoan' },
        { value: 'gd', label: 'Scots Gaelic' },
        { value: 'sr', label: 'Serbian' },
        { value: 'st', label: 'Sesotho' },
        { value: 'sn', label: 'Shona' },
        { value: 'sd', label: 'Sindhi' },
        { value: 'si', label: 'Sinhala' },
        { value: 'sk', label: 'Slovak' },
        { value: 'sl', label: 'Slovenian' },
        { value: 'so', label: 'Somali' },
        { value: 'es', label: 'Spanish' },
        { value: 'su', label: 'Sundanese' },
        { value: 'sw', label: 'Swahili' },
        { value: 'sv', label: 'Swedish' },
        { value: 'tg', label: 'Tajik' },
        { value: 'ta', label: 'Tamil' },
        { value: 'te', label: 'Telugu' },
        { value: 'th', label: 'Thai' },
        { value: 'tr', label: 'Turkish' },
        { value: 'uk', label: 'Ukrainian' },
        { value: 'ur', label: 'Urdu' },
        { value: 'uz', label: 'Uzbek' },
        { value: 'vi', label: 'Vietnamese' },
        { value: 'cy', label: 'Welsh' },
        { value: 'xh', label: 'Xhosa' },
        { value: 'yi', label: 'Yiddish' },
        { value: 'yo', label: 'Yoruba' },
        { value: 'zu', label: 'Zulu' },
    ];

export default function Covid() {
    const [txt, setTxt] = useState('');
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const renderLabel = () => {
      if (value || isFocus) {
        return (
          <Text style={[styles.label, isFocus && { color: '#ff7f00' }]}>
            Language
          </Text>
        );
      }
      return null;
    };

    return (
      <View styles={styles.container}>
        <View style={styles.inputView}>
          <TextInput style={styles.TextInput} placeholder="Text to translate from french" placeholderTextColor="#003f5c"
              onChangeText={(txt) => setTxt(txt)}
          />
        </View>
        <View style={styles.container}>
          {renderLabel()}
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: '#ff7f00' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Select Language' : '...'}
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
            <TouchableOpacity style={styles.loginBtn} title="Translate" onPress={() => SendTranslate(txt, value)}>
                <Text style={styles.textStyle}>Send translation</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.inputView}>
          <Text style={styles.descStyle}>You need to be connected to discord service to use google service</Text>
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
      backgroundColor: "#ff7f00",
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
  descStyle: {
    fontSize: 14,
    color: "#000",
    alignSelf: "center",
    marginTop: 10,
    textTransform: "uppercase"
  },
});