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

function CommunityCard({
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

  const props = 'communityFeed'
  return (
    <>
      <View style={styles.container} >
      <AppText style={styles.text}>Challenge of weeks</AppText>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("UploadImageScreen", {props})}
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
  container:{
    marginHorizontal:10,
    alignContent:'center',
    alignSelf:'center',
    backgroundColor:'black'

  },
  image: {
    alignItems: 'center',
    height: 150,
    justifyContent: 'center',
    width: '80%',
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

export default CommunityCard;
