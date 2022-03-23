import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AccountScreen from './app/screens/AccountScreen';
import ListingDetailsScreen from './app/screens/ListingDetailsScreen';
import ListingEditScreen from './app/screens/ListingEditScreen';
import ListingsScreen from './app/screens/ListingsScreen';
import LoginScreen from './app/screens/LoginScreen';
import MessagesScreen from './app/screens/MessagesScreen';
import RegisterScreen from './app/screens/RegisterScreen';
import ViewImageScreen from './app/screens/ViewImageScreen';
import WelcomeScreen from './app/screens/WelcomeScreen';
import FeedScreen from './app/screens/FeedScreen';
import UploadImageScreen from './app/screens/UploadImageScreen';
import QuizScreen from './app/screens/QuizScreen';
import navigationTheme from './app/navigation/navigationTheme';
import AppNavigator from './app/navigation/AppNavigator';
import AccountNavigator from './app/navigation/AccountNavigator';
import AuthNavigator from './app/navigation/AuthNavigator';
import FeedNavigator from './app/navigation/FeedNavigator';
import { SignOut } from './app/screens/SignOut';

export default function App() {
  return (
     //<WelcomeScreen />
   // <LoginScreen />
    // <RegisterScreen />
    //<AccountScreen />
    // <ListingsScreen />
    //<MessagesScreen />
    //<ViewImageScreen />
    //<FeedScreen />
    //<UploadImageScreen />
    //<QuizScreen />
    //<SignOut />
   <NavigationContainer theme={navigationTheme}>
     <AuthNavigator />

   </NavigationContainer>

  );
}
