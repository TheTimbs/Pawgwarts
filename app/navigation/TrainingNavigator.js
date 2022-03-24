import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import TrainingYearsScreen from '../screens/TrainingYearsScreen';

const Stack = createStackNavigator();

const TrainingNavigator = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false, presentation: 'modal' }}
  >
    <Stack.Screen name="Trainings" component={TrainingYearsScreen} />
  </Stack.Navigator>
);

export default TrainingNavigator;
