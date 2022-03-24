import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AccountNavigator from './AccountNavigator';
import FeedNavigator from './FeedNavigator';
import StoreNavigator from './StoreNavigator';
import TrainingNavigator from './TrainingNavigator';
// import ListingEditScreen from '../screens/ListingEditScreen';
// import NewListingButton from './NewListingButton';
// import routes from './routes';

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Home"
      component={FeedNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
        headerShown: false,
      }}
    />
    <Tab.Screen
      name="Feed"
      component={FeedNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="image-area" color={color} size={size} />
        ),
        headerShown: false,
      }}
    />
    <Tab.Screen
      name="Training"
      component={TrainingNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="wizard-hat" color={color} size={size} />
        ),
        headerShown: false,
      }}
    />
    {/* <Tab.Screen
      name="ListingEdit"
      component={ListingEditScreen}
      options={({ navigation }) => ({
        tabBarButton: () => (
          <NewListingButton
            onPress={() => navigation.navigate(routes.LISTING_EDIT)}
          />
        ),
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="plus-circle"
            color={color}
            size={size}
          />
        ),
      })}
    /> */}
    <Tab.Screen
      name="Store"
      component={StoreNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="shopping" color={color} size={size} />
        ),
        headerShown: false,
      }}
    />
    <Tab.Screen
      name="My Account"
      component={AccountNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="dog" color={color} size={size} />
        ),
        headerShown: false,
      }}
    />
  </Tab.Navigator>
);

export default AppNavigator;
