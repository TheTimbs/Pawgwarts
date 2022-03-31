import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  Text,
  Alert
} from 'react-native';
import { useFonts } from 'expo-font';

import AppText from '../components/Text';
import colors from '../config/colors';

function TrainingCard({
  navigation,
  navTarget,
  imgSource,
  title,
  styling,
  backgroundColor,
  dbYear,
  preReqsMet = true,
  alertMessage,
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
          onPress={() => {
            preReqsMet ? navigation.navigate(navTarget, dbYear) : Alert.alert(alertMessage)
          }}
        >
          <ImageBackground source={imgSource} style={styles.image} />
        </TouchableWithoutFeedback>
      </View>
      <TouchableWithoutFeedback
        onPress={() => {
          preReqsMet ? navigation.navigate(navTarget, dbYear) : Alert.alert(alertMessage)
        }}
      >
        <AppText style={styling}>{title}</AppText>
      </TouchableWithoutFeedback>
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
});

export default TrainingCard;
