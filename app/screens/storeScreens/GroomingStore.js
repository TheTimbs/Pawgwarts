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

function GroomingStore() {
  const [products, setProducts] = useState([]);

  const storeCollectionRef = collection(db, 'store');
  useEffect(() => {
    const getItems = async () => {
      const data = await getDocs(storeCollectionRef);
      const mappedData = data.docs.map((document) => ({
        ...document.data(),
        id: document.id,
      }));
      const filteredData = mappedData.filter(
        (post) => post.category === 'grooming'
      );
      setProducts(filteredData);
    };
    getItems();
  }, []);

  const handleLink = (i) => {
    Linking.openURL(products[i].link);
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
          <Text style={styles.label}>Grooming Recommendations:</Text>
          {products ? (
            products.map((item, i) => (
              <View key={i} style={styles.container}>
                <Text style={styles.header} onPress={() => handleLink(i)}>
                  {item.name}
                </Text>
                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: 200,
                    height: 200,
                    alignSelf: 'center',
                    borderColor: 'darkgreen',
                    borderWidth: 3,
                  }}
                />
              </View>
            ))
          ) : (
            <Text>Loading</Text>
          )}
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.houseGreen,
  },
  header: {
    color: colors.gold,
    fontSize: 25,
    fontWeight: '800',
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Harry-Potter',
  },
  label: {
    color: colors.white,
    fontSize: 40,
    fontWeight: '800',
    paddingVertical: 3,
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: 'Harry-Potter',
  },
  container: {
    borderColor: 'darkgreen',
    borderWidth: 3,
    padding: 10,
    margin: 10,
  },
});

export default GroomingStore;
