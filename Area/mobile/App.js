import { registerRootComponent } from 'expo';
import React from 'react';
import Login from './src/components/Login';
import Home from './src/components/Home';
import Register from './src/components/Register';
import BackSelection from './src/components/BackSelection';
import Youtube from './src/components/Services/Youtube';
import Twitch from './src/components/Services/Twitch';
import Discord from './src/components/Services/Discord';
import Google from './src/components/Services/Google';
import Intra from './src/components/Services/Intra';
import News from './src/components/Services/News';
import Covid from './src/components/Services/Covid';
import Weather from './src/components/Services/Weather';
import Spotify from './src/components/Services/Spotify';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="BackSelection" component={BackSelection}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Register" component={Register}/>
        <Stack.Screen name="Youtube" component={Youtube}/>
        <Stack.Screen name="Twitch" component={Twitch}/>
        <Stack.Screen name="Discord" component={Discord}/>
        <Stack.Screen name="Google" component={Google}/>
        <Stack.Screen name="Intra" component={Intra}/>
        <Stack.Screen name="News" component={News}/>
        <Stack.Screen name="Covid" component={Covid}/>
        <Stack.Screen name="Weather" component={Weather}/>
        <Stack.Screen name="Spotify" component={Spotify}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

registerRootComponent(App);
