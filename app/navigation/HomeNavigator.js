import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SingleTrainingScreen from '../screens/trainingScreens/SingleTrainingScreen';
import Home from '../screens/Home';
import colors from '../config/colors';

const Stack = createStackNavigator();

const HomeNavigator = () => (
  <Stack.Navigator
    screenOptions={{ headerLeft: null }}
  >
    <Stack.Screen name="home" component={Home} />
    <Stack.Screen name="SingleTraining" component={SingleTrainingScreen} />

  </Stack.Navigator>
);

export default HomeNavigator;
