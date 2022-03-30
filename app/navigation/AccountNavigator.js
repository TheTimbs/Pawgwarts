import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AccountScreen from '../screens/AccountScreen';
import UserPic from '../screens/UserPic';
import UserProfile from '../screens/UserProfileScreen';
import EditUserProfile from '../screens/EditUserProfileScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import MyTrainings from '../screens/MyTrainingsScreen';
import SingleTrainingScreen from '../screens/trainingScreens/SingleTrainingScreen';
const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      options={{ headerLeft: null }}
      name="Account"
      component={AccountScreen}
    />
    <Stack.Screen name="info" component={UserProfile} />
    <Stack.Screen name="EditUserProfile" component={EditUserProfile} />
    <Stack.Screen name="MyPictures" component={UserPic} />
    <Stack.Screen name="MyTrainings" component={MyTrainings} />
    <Stack.Screen name="SingleTraining" component={SingleTrainingScreen} />
    <Stack.Screen
      name="signOut"
      component={WelcomeScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default AccountNavigator;
