import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
} from 'react-native';
import { useFonts } from 'expo-font';
import colors from '../config/colors';
import Button from '../components/Button';
import routes from '../navigation/routes';
import Screen from '../components/Screen';

function StoreScreen({ navigation }) {
  return (
    <Screen style={styles.screen}>
      <ScrollView>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View style={styles.buttonsContainer}>
            <Image
              source={require('../assets/apparel.jpeg')}
              style={{
                width: 300,
                height: 150,
                alignSelf: 'center',
              }}
            />
            <Button
              title="Accessories"
              color="purple"
              onPress={() => navigation.navigate('AccessoriesStore')}
            />
            <Image
              source={require('../assets/toys.jpeg')}
              style={{
                width: 300,
                height: 150,
                alignSelf: 'center',
              }}
            />
            <Button
              title="Toys"
              color="purple"
              onPress={() => navigation.navigate('ToyStore')}
            />
            <Image
              source={require('../assets/treats.jpeg')}
              style={{
                width: 300,
                height: 150,
                alignSelf: 'center',
              }}
            />
            <Button
              title="Treats"
              color="purple"
              onPress={() => navigation.navigate('TreatStore')}
            />
            <Image
              source={require('../assets/grooming.jpeg')}
              style={{
                width: 300,
                height: 150,
                alignSelf: 'center',
              }}
            />
            <Button
              title="Grooming"
              color="purple"
              onPress={() => navigation.navigate('GroomingStore')}
            />
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.secondary,
  },
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonsContainer: {
    padding: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 100,
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
