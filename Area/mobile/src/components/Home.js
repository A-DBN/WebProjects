import React, {useCallback, useState} from 'react';
import Service from './Service';
import Dashboard from './Dashboard';
import LogoutPage from './LogoutPage';
import {StyleSheet, Text, Plateform, StatusBar, View} from "react-native";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const Home = () => {

  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Service" component={Service} />
      <Tab.Screen name="LogoutPage" component={LogoutPage} />
    </Tab.Navigator>
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
  }
});

export default Home;