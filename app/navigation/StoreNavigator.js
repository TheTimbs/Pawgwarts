import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AccessoriesStore from '../screens/storeScreens/AccessoriesStoreScreen';
import colors from '../config/colors';
import GroomingStore from '../screens/storeScreens/GroomingStore';
import StoreScreen from '../screens/storeScreens/StoreScreen';
import ToyStore from '../screens/storeScreens/ToyStoreScreen';
import TreatStore from '../screens/storeScreens/TreatStoreScreen';
// o: remove if not being used
// import { NavigationContainer } from '@react-navigation/native';

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
      name="Store"
      component={StoreScreen}
    />
    <Stack.Screen name="AccessoriesStore" component={AccessoriesStore} />
    <Stack.Screen name="ToyStore" component={ToyStore} />
    <Stack.Screen name="TreatStore" component={TreatStore} />
    <Stack.Screen name="GroomingStore" component={GroomingStore} />
  </Stack.Navigator>
);

export default StoreNavigator;
