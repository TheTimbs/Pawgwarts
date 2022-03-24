import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button, Text, Image } from 'react-native';
import { collection, doc, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase-config';
import * as Linking from 'expo-linking';
import colors from '../config/colors';
import Screen from '../components/Screen';

function ToyStore() {
  const [products, setProducts] = useState([]);

  const storeCollectionRef = collection(db, 'store');
  useEffect(() => {
    const getItems = async () => {
      const data = await getDocs(storeCollectionRef);
      const mappedData = data.docs.map((document) => ({
        ...document.data(),
        id: document.id,
      }));
      const filteredData = mappedData.filter((post) => post.category === 'toy');
      setProducts(filteredData);
    };
    getItems();
  }, []);

  const handleLink = (i) => {
    Linking.openURL(products[i].link);
  };

  return (
    <Screen style={styles.screen}>
      <View>
        <Text style={styles.label}>Toy Recommendations:</Text>
        {products.map((item, i) => (
          <View key={i}>
            <Text style={styles.header}>{item.name}</Text>
            <Image
              source={{ uri: item.image }}
              style={{
                width: 200,
                height: 200,
                alignSelf: 'center',
              }}
            />
            <Button title="Link to Amazon" onPress={() => handleLink(i)} />
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

export default ToyStore;
