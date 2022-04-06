import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SingleTrainingScreen from '../screens/trainingScreens/SingleTrainingScreen';
import Home from '../screens/Home';

const Stack = createStackNavigator();

const HomeNavigator = () => (
  <Stack.Navigator
    screenOptions={{ headerLeft: null }}
  >
    <Stack.Screen name="home" component={Home} options={{ headerShown: false }} />
    <Stack.Screen name="SingleTraining" component={SingleTrainingScreen} />

  </Stack.Navigator>
);

export default HomeNavigator;
