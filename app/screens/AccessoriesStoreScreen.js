import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button, Text, Image } from 'react-native';
import { collection, doc, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase-config';
import * as Linking from 'expo-linking';
import colors from '../config/colors';
import Screen from '../components/Screen';

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
      setBeds(beds);
      setLeash(leash);
    };
    getItems();
  }, []);

  const handleLinkBed = (i) => {
    Linking.openURL(beds[i].link);
  };
  const handleLinkLeash = (i) => {
    Linking.openURL(leash[i].link);
  };

  return (
    <Screen style={styles.screen}>
      <View>
        <Text style={styles.label}>Accessory Recommendations:</Text>
        <Text style={styles.label}>Beds:</Text>
        {beds.map((item, i) => (
          <View key={i}>
            <Text style={styles.header}>{item.name}</Text>
            <Image
              source={{ uri: item.image }}
              style={{
                width: 250,
                height: 200,
                alignSelf: 'center',
              }}
            />
            <Button title="Link to Amazon" onPress={() => handleLinkBed(i)} />
          </View>
        ))}
        <Text style={styles.label}>Leash:</Text>
        {leash.map((item, i) => (
          <View key={i}>
            <Text style={styles.header}>{item.name}</Text>
            <Image
              source={{ uri: item.image }}
              style={{
                width: 250,
                height: 200,
                alignSelf: 'center',
              }}
            />
            <Button title="Link to Amazon" onPress={() => handleLinkLeash(i)} />
          </View>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.secondary,
  },
  header: {
    color: colors.blue,
    fontSize: 17,
    fontWeight: '800',
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  label: {
    color: colors.purple,
    fontSize: 25,
    fontWeight: '800',
    paddingVertical: 3,
    alignSelf: 'center',
  },
});

export default AccessoriesStore;
