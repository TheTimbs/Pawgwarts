import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import FeedScreen from "../screens/FeedScreen";
import AppNavigator from "./AppNavigator";
import QuizScreen from "../screens/QuizScreen";

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator >
    <Stack.Screen
      name="Welcome"
      component={WelcomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="Quiz" component={QuizScreen} />
    <Stack.Screen options={{ headerShown: false }}name="App" component={AppNavigator}/>
  </Stack.Navigator>
);

export default AuthNavigator;
