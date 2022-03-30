import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Button,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import { collection, doc, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase/firebase-config';
import * as Linking from 'expo-linking';
import colors from '../../config/colors';
import Screen from '../../components/Screen';
import { useFonts } from 'expo-font';

function AccessoriesStore() {
  const [beds, setBeds] = useState([]);
  const [leash, setLeash] = useState([]);
  const [apparel, setApparel] = useState([]);

  const storeCollectionRef = collection(db, 'store');
  useEffect(() => {
    const getItems = async () => {
      const data = await getDocs(storeCollectionRef);
      const mappedData = data.docs.map((document) => ({
        ...document.data(),
        id: document.id,
      }));
      const beds = mappedData.filter(
        (post) => post.category === 'accessories' && post.subcategory === 'bed'
      );
      const leash = mappedData.filter(
        (post) =>
          post.category === 'accessories' && post.subcategory === 'leash'
      );
      const apparel = mappedData.filter(
        (post) =>
          post.category === 'accessories' && post.subcategory === 'apparel'
      );
      setBeds(beds);
      setLeash(leash);
      setApparel(apparel);
    };
    getItems();
  }, []);

  const handleLinkBed = (i) => {
    Linking.openURL(beds[i].link);
  };
  const handleLinkLeash = (i) => {
    Linking.openURL(leash[i].link);
  };
  const handleLinkApparel = (i) => {
    Linking.openURL(apparel[i].link);
  };

  let [fontsLoaded] = useFonts({
    'Harry-Potter': require('../../assets/fonts/HarryPotter.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <Screen style={styles.screen}>
      <ScrollView>
        <View>
          <Text style={styles.label}>Accessory Recommendations:</Text>
          <Text style={styles.label}>Beds:</Text>
          {beds.map((item, i) => (
            <View key={i} style={styles.container}>
              <Text style={styles.header} onPress={() => handleLinkBed(i)}>
                {item.name}
              </Text>
              <Image
                source={{ uri: item.image }}
                style={{
                  width: 250,
                  height: 200,
                  alignSelf: 'center',
                  borderColor: colors.houseRed,
                  borderWidth: 3,
                }}
              />
            </View>
          ))}
          <Text style={styles.label}>Leash:</Text>
          {leash.map((item, i) => (
            <View key={i} style={styles.container}>
              <Text style={styles.header} onPress={() => handleLinkLeash(i)}>
                {item.name}
              </Text>
              <Image
                source={{ uri: item.image }}
                style={{
                  width: 250,
                  height: 200,
                  alignSelf: 'center',
                  borderColor: colors.houseRed,
                  borderWidth: 3,
                }}
              />
            </View>
          ))}
          <Text style={styles.label}>Apparel:</Text>
          {apparel.map((item, i) => (
            <View key={i} style={styles.container}>
              <Text style={styles.header} onPress={() => handleLinkApparel(i)}>
                {item.name}
              </Text>
              <Image
                source={{ uri: item.image }}
                style={{
                  width: 250,
                  height: 200,
                  alignSelf: 'center',
                  borderColor: colors.houseRed,
                  borderWidth: 3,
                }}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.houseRed,
  },
  header: {
    color: colors.gold,
    fontSize: 25,
    fontWeight: '800',
    paddingVertical: 2,
    paddingHorizontal: 15,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: 'Harry-Potter',
  },
  label: {
    color: colors.white,
    fontSize: 40,
    fontWeight: '800',
    paddingVertical: 10,
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: 'Harry-Potter',
  },
  container: {
    borderColor: colors.primary,
    borderWidth: 3,
    padding: 10,
    margin: 10,
  },
});

export default AccessoriesStore;
