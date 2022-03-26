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

import AppText from '../components/Text';
import colors from '../config/colors';

function StoreCard({
  navigation,
  navTarget,
  imgSource,
  title,
  styling,
  backgroundColor,
}) {
  return (
    <>
      <View backgroundColor={backgroundColor}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate(navTarget)}
        >
          <ImageBackground source={imgSource} style={styles.image} />
        </TouchableWithoutFeedback>
      </View>
      <TouchableWithoutFeedback onPress={() => navigation.navigate(navTarget)}>
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
    backgroundColor: '#DF0000',
  },
});

export default StoreCard;
