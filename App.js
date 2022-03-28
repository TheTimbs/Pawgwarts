import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './app/navigation/AuthNavigator';

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
    // <QuizScreen />
    // <QuizResult />
    //<SignOut />
    // <UserProfile />
    //<TrainingYearsScreen />
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
    // <TreatStore />
    // <ToyStore />
    // <AccessoriesStore />
    //     <Home></Home>
    // <NavigationContainer>
    //   <AppNavigator />
    // </NavigationContainer>
  );
}
