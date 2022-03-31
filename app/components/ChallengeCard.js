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

function ChallengeCard({
  navigation,
  imgSource,
  title,
  data,
}) {
  let [fontsLoaded] = useFonts({
    'Harry-Potter': require('../assets/fonts/HarryPotter.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }


  return (
    <>
      <View >
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate(navTarget, data)}
        >
          <ImageBackground source={{ uri: imgSource }} style={styles.image}>
            <AppText style={styles.text}>Challenge of week</AppText>
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
  },
  firstYeartext: {
    color: colors.gold,
    fontWeight: 'bold',
    fontSize: 60,
    fontFamily: 'Harry-Potter',
  },
  text: {
    color: colors.gold,
    fontWeight: 'bold',
    fontSize: 60,
    fontFamily: 'Harry-Potter',
    textDecorationLine:"underline"
  },
});

export default ChallengeCard;
