import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FeedScreen from '../screens/FeedScreen';
import ChallengeScreen from '../screens/ChallengeScreen';
import UploadImageScreen from '../screens/UploadImageScreen';
import CommentsScreen from '../screens/CommentsScreen';

const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="MyFeed" component={FeedScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ChallengeScreen" component={ChallengeScreen} />
    <Stack.Screen name="UploadImageScreen" component={UploadImageScreen} />
    <Stack.Screen name="CommentsScreen" component={CommentsScreen} options={{ presentation: 'modal', headerShown: false }} />
  </Stack.Navigator>
);

export default FeedNavigator;
