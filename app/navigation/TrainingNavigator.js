import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TrainingYearsScreen from '../screens/trainingScreens/TrainingYearsScreen';
import TrainingCategoriesScreen from '../screens/trainingScreens/TrainingCategoriesScreen';
import TrainingsScreen from '../screens/trainingScreens/TrainingsScreen';
import SingleTrainingScreen from '../screens/trainingScreens/SingleTrainingScreen';
import Home from '../screens/Home';
import colors from '../config/colors';
import { useFonts } from 'expo-font';

const Stack = createStackNavigator();

const TrainingNavigator = () => {
  let [fontsLoaded] = useFonts({
    'Harry-Potter': require('../assets/fonts/HarryPotter.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.houseBlue },
        headerTintColor: 'white',
        headerTitleStyle: { fontSize: 35, fontFamily: 'Harry-Potter' },
      }}
    >
      <Stack.Screen
        name="Training Years"
        component={TrainingYearsScreen}
        options={{ headerLeft: null }}
      />
      <Stack.Screen
        name="TrainingCategories"
        component={TrainingCategoriesScreen}
      />
      <Stack.Screen name="Trainings" component={TrainingsScreen} />
      <Stack.Screen
        name="SingleTraining"
        component={SingleTrainingScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
      <Stack.Screen name="home" component={Home} />
    </Stack.Navigator>
  );
};

export default TrainingNavigator;
