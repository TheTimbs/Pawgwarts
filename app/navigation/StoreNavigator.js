import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AccessoriesStore from '../screens/storeScreens/AccessoriesStoreScreen';
import colors from '../config/colors';
import GroomingStore from '../screens/storeScreens/GroomingStore';
import StoreScreen from '../screens/storeScreens/StoreScreen';
import ToyStore from '../screens/storeScreens/ToyStoreScreen';
import TreatStore from '../screens/storeScreens/TreatStoreScreen';

const Stack = createStackNavigator();

const StoreNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: colors.houseRed },
      headerTintColor: 'white',
      headerTitleStyle: { fontSize: 25, fontFamily: 'Futura' },
    }}
  >
    <Stack.Screen
      options={{ headerLeft: null }}
      name="Shop"
      component={StoreScreen}
    />
    <Stack.Screen
      name="Accessories"
      component={AccessoriesStore}
      options={{ headerStyle: { backgroundColor: colors.houseRed } }}
    />
    <Stack.Screen
      name="Toys"
      component={ToyStore}
      options={{ headerStyle: { backgroundColor: colors.houseBlue } }}
    />
    <Stack.Screen
      name="Treats"
      component={TreatStore}
      options={{ headerStyle: { backgroundColor: colors.houseYellow } }}
    />
    <Stack.Screen
      name="Grooming"
      component={GroomingStore}
      options={{ headerStyle: { backgroundColor: colors.houseGreen } }}
    />
  </Stack.Navigator>
);

export default StoreNavigator;
