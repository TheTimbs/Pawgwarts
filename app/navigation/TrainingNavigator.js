import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TrainingCategoriesScreen from '../screens/TrainingCategoriesScreen';
import TrainingYearsScreen from '../screens/TrainingYearsScreen';

const Stack = createStackNavigator();

const TrainingNavigator = () => (
  <Stack.Navigator
    screenOptions={{ headerLeft: null, presentation: 'modal' }}
  >
    <Stack.Screen name="Trainings" component={TrainingYearsScreen} />
    <Stack.Screen name="Categories" component={TrainingCategoriesScreen}/>
  </Stack.Navigator>
);

export default TrainingNavigator;
