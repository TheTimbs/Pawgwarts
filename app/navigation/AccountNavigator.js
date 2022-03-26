import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/AccountScreen";
import UserPic from "../screens/UserPic";
import UserProfile from "../screens/UserProfileScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen   options={{ headerLeft: null }} name="Account" component={AccountScreen} />
    <Stack.Screen name="info" component={UserProfile} />
    <Stack.Screen name="MyPictures" component={UserPic} />
    <Stack.Screen
      name="signOut"
      component={WelcomeScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default AccountNavigator;
