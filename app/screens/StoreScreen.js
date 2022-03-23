import React from 'react';
import { ImageBackground, StyleSheet, View, Image, Text } from 'react-native';
import { useFonts } from 'expo-font';

import Button from '../components/Button';
import routes from '../navigation/routes';

function StoreScreen({ navigation }) {
  return (
    <View>
      <View style={styles.buttonsContainer}>
        <Button
          title="Accessories"
          color="purple"
          onPress={() => navigation.navigate('AccessoriesStore')}
        />
        <Button
          title="Toys"
          color="purple"
          onPress={() => navigation.navigate('ToyStore')}
        />
        <Button
          title="Treats"
          color="purple"
          onPress={() => navigation.navigate('TreatStore')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonsContainer: {
    padding: 20,
    width: '100%',
  },
  logo: {
    width: 100,
    height: 200,
  },
  logoContainer: {
    position: 'absolute',
    top: 70,
    alignItems: 'center',
  },
});

export default StoreScreen;
