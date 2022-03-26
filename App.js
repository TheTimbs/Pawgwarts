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
import UserProfile from './app/screens/UserProfileScreen';
import navigationTheme from './app/navigation/navigationTheme';
import AppNavigator from './app/navigation/AppNavigator';
import AccountNavigator from './app/navigation/AccountNavigator';
import AuthNavigator from './app/navigation/AuthNavigator';
import FeedNavigator from './app/navigation/FeedNavigator';
import { SignOut } from './app/screens/SignOut';
import TrainingYearsScreen from './app/screens/TrainingYearsScreen';
import TreatStore from './app/screens/storeScreens/TreatStoreScreen';
import ToyStore from './app/screens/storeScreens/ToyStoreScreen';
import AccessoriesStore from './app/screens/storeScreens/AccessoriesStoreScreen';
import StoreScreen from './app/screens/storeScreens/StoreScreen';
import StoreNavigator from './app/navigation/StoreNavigator';
import TrainingCategoriesScreen from './app/screens/TrainingCategoriesScreen';
import Home from './app/screens/Home';
import QuizResult from './app/screens/QuizResult';
export default function App() {
  return (
    //<WelcomeScreen />
    // <LoginScreen />
    // <RegisterScreen />
    //<AccountScreen />
    // <ListingsScreen />
    //<MessagesScreen />
    //<ViewImageScreen />
   // <FeedScreen />
    //<UploadImageScreen />
    // <QuizScreen />
    // <QuizResult />
    //<SignOut />
    // <UserProfile />
    //<TrainingYearsScreen />

    // <NavigationContainer theme={navigationTheme}>
    //   <AuthNavigator />
    // </NavigationContainer>
    // <TreatStore />
    // <ToyStore />
    // <AccessoriesStore />
    //     <Home></Home>
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
