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
import StoreCard from '../../components/StoreCard';

function StoreScreen({ navigation }) {
  let [fontsLoaded] = useFonts({
    'Harry-Potter': require('../../assets/fonts/HarryPotter.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }
  const storeImages = {
    accessories: require('../../assets/apparel.jpeg'),
    toys: require('../../assets/toys.jpeg'),
    treats: require('../../assets/treats.jpeg'),
    grooming: require('../../assets/grooming.jpeg'),
  };

  const storeStylings = {
    accessoryText: {
      color: colors.white,
      fontWeight: 'bold',
      fontSize: 60,
      opacity: 1,
      position: 'absolute',
      top: '10%',
      left: '28%',
      fontFamily: 'Harry-Potter',
    },
    toyText: {
      color: colors.white,
      fontWeight: 'bold',
      fontSize: 60,
      opacity: 1,
      position: 'absolute',
      top: '35%',
      left: '37%',
      fontFamily: 'Harry-Potter',
    },
    treatText: {
      color: colors.white,
      fontWeight: 'bold',
      fontSize: 60,
      opacity: 1,
      position: 'absolute',
      top: '60%',
      left: '35%',
      fontFamily: 'Harry-Potter',
    },
    groomingText: {
      color: colors.white,
      fontWeight: 'bold',
      fontSize: 60,
      opacity: 1,
      position: 'absolute',
      top: '85%',
      left: '30%',
      fontFamily: 'Harry-Potter',
    },
  };
  return (
    <Screen style={styles.screen}>
      <ScrollView>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <StoreCard
            navigation={navigation}
            navTarget={'AccessoriesStore'}
            imgSource={storeImages.accessories}
            title={'Accessories'}
            styling={storeStylings.accessoryText}
            backgroundColor={'#DF0000'}
          />
          <StoreCard
            navigation={navigation}
            navTarget={'ToyStore'}
            imgSource={storeImages.toys}
            title={'Toys'}
            styling={storeStylings.toyText}
            backgroundColor={'#0356C9'}
          />
          <StoreCard
            navigation={navigation}
            navTarget={'TreatStore'}
            imgSource={storeImages.treats}
            title={'Treats'}
            styling={storeStylings.treatText}
            backgroundColor={'#CCA000'}
          />
          <StoreCard
            navigation={navigation}
            navTarget={'GroomingStore'}
            imgSource={storeImages.grooming}
            title={'Grooming'}
            styling={storeStylings.groomingText}
            backgroundColor={'#05764E'}
          />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    //padding: 20,
    backgroundColor: colors.white,
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
    borderRadius: 100,
  },
});

export default StoreScreen;
