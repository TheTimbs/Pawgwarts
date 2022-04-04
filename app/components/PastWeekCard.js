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
import Screen from '../components/Screen';
import AppText from './Text';
import colors from '../config/colors';

function PastWeekCard({ navigation, title }) {
  let [fontsLoaded] = useFonts({
    'Harry-Potter': require('../assets/fonts/HarryPotter.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate('SingleWeekScreen', { title })}
          style={[styles.button, { backgroundColor: colors.houseBlue }]}
        >
          <AppText style={styles.text}>{title}</AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    paddingBottom: 10,
  },
  button: {
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    width: '100%',
  },
  text: {
    color: colors.white,
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});

export default PastWeekCard;
