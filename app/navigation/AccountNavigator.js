import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/AccountScreen";
import MessagesScreen from "../screens/MessagesScreen";
import AuthNavigator from "./AuthNavigator";
import UserProfile from "../screens/UserProfileScreen";
const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen  options={{ headerShown: false }} name="Account" component={AccountScreen} />
    <Stack.Screen name="info" component={UserProfile} />
    <Stack.Screen name="Messages" component={MessagesScreen} />
    <Stack.Screen name="Signout" component={AuthNavigator}  />
  </Stack.Navigator>
);

export default AccountNavigator;
