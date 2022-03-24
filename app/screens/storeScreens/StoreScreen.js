import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { useFonts } from 'expo-font';
import colors from '../../config/colors';
import Button from '../../components/Button';
import routes from '../../navigation/routes';
import Screen from '../../components/Screen';
import AppText from '../../components/Text';

function StoreScreen({ navigation }) {
  return (
    <Screen style={styles.screen}>
      <ScrollView>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('AccessoriesStore')}
          >
            <ImageBackground
              source={require('../../assets/apparel.jpeg')}
              style={styles.image}
            >
              <AppText style={styles.text}>Accessories</AppText>
            </ImageBackground>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('ToyStore')}
          >
            <ImageBackground
              source={require('../../assets/toys.jpeg')}
              style={styles.image}
            >
              <AppText style={styles.text}>Toys</AppText>
            </ImageBackground>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('TreatStore')}
          >
            <ImageBackground
              source={require('../../assets/treats.jpeg')}
              style={styles.image}
            >
              <AppText style={styles.text}>Treats</AppText>
            </ImageBackground>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('GroomingStore')}
          >
            <ImageBackground
              source={require('../../assets/grooming.jpeg')}
              style={styles.image}
            >
              <AppText style={styles.text}>Grooming</AppText>
            </ImageBackground>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    //padding: 20,
    backgroundColor: colors.purple,
  },
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  // buttonsContainer: {
  //   padding: 10,
  //   width: '100%',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   paddingHorizontal: 100,
  // },
  image: {
    alignItems: 'center',
    height: 200,
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
    borderRadius: 100,
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
  text: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 40,
  },
});

export default StoreScreen;
