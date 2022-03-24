import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AccessoriesStore from '../screens/AccessoriesStoreScreen';
import ToyStore from '../screens/ToyStoreScreen';
import TreatStore from '../screens/TreatStoreScreen';
import StoreScreen from '../screens/StoreScreen';
import GroomingStore from '../screens/GroomingStore';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

const StoreNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen options={{ headerLeft: null }} name="Store" component={StoreScreen} />
    <Stack.Screen name="AccessoriesStore" component={AccessoriesStore} />
    <Stack.Screen name="ToyStore" component={ToyStore} />
    <Stack.Screen name="TreatStore" component={TreatStore} />
    <Stack.Screen name="GroomingStore" component={GroomingStore} />
  </Stack.Navigator>
);

export default StoreNavigator;
