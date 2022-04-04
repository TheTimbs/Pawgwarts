import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useFonts } from 'expo-font';

import AppText from './Text';
import colors from '../config/colors';

function PastWeekButton({ navigation, title }) {
  let [fontsLoaded] = useFonts({
    'Harry-Potter': require('../assets/fonts/HarryPotter.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('pastWeekScreen')}
          style={[styles.button, { backgroundColor: colors.houseBlue }]}
        >
          <AppText style={styles.text}>{title}</AppText>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    width: '100%',
    marginHorizontal: 10,
    marginLeft: 20,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});

export default PastWeekButton;
