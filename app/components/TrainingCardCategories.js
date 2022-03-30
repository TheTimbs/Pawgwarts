import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';
import { useFonts } from 'expo-font';

import AppText from './Text';
import colors from '../config/colors';

function TrainingCardCategories({
  navigation,
  navTarget,
  imgSource,
  title,
  dbYear,
}) {
  let [fontsLoaded] = useFonts({
    'Harry-Potter': require('../assets/fonts/HarryPotter.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }


  return (
    <>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate(navTarget, dbYear)}
        >
          <ImageBackground source={{ uri: imgSource }} style={styles.image}>
            <AppText style={styles.firstYeartext}>{title}</AppText>
          </ImageBackground>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    alignItems: 'center',
    height: 200,
    justifyContent: 'center',
    width: '100%',
    borderRadius: 100,
    opacity: 0.5,
  },
  overlay: {
    backgroundColor: colors.dark,
  },
  firstYeartext: {
    color: colors.houseBlue,
    fontWeight: 'bold',
    fontSize: 60,
    fontFamily: 'Harry-Potter',
  },
});

export default TrainingCardCategories;
