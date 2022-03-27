import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import TrainingYearsScreen from '../screens/trainingScreens/TrainingYearsScreen';
import TrainingCategoriesScreen from '../screens/trainingScreens/TrainingCategoriesScreen';
import TrainingsScreen from '../screens/trainingScreens/TrainingsScreen';
import SingleTrainingScreen from '../screens/trainingScreens/SingleTrainingScreen';

const Stack = createStackNavigator();

const TrainingNavigator = () => (
  <Stack.Navigator
    screenOptions={{ headerLeft: null, presentation: 'modal' }}
  >
    <Stack.Screen name="Training Years" component={TrainingYearsScreen} />
    <Stack.Screen name="TrainingCategories" component={TrainingCategoriesScreen} />
    <Stack.Screen name="Trainings" component={TrainingsScreen} />
    <Stack.Screen name="SingleTraining" component={SingleTrainingScreen} />
  </Stack.Navigator>
);

export default TrainingNavigator;
