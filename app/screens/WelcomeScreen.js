import React from 'react';
import { ImageBackground, StyleSheet, View, Image, Text } from 'react-native';
import { useFonts } from 'expo-font';

import Button from '../components/Button';
import routes from '../navigation/routes';

function WelcomeScreen({ navigation }) {
  let [fontsLoaded] = useFonts({
    'Harry-Potter': require('../assets/fonts/HarryPotter.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <ImageBackground
      blurRadius={1}
      style={styles.background}
      source={require('../assets/BlueBackground.jpeg')}
    >
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../assets/DogLogo.png')} />
        <Text style={styles.tagline}>Pawgwarts</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          title="Login"
          color="blue"
          onPress={() => navigation.navigate(routes.LOGIN)}
        />
        <Button
          title="Register"
          color="purple"
          onPress={() => navigation.navigate(routes.REGISTER)}
        />
      </View>
    </ImageBackground>
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
  tagline: {
    color: 'gold',
    fontFamily: 'Harry-Potter',
    fontSize: 80,
    fontWeight: '600',
    paddingVertical: 20,
  },
});

export default WelcomeScreen;
