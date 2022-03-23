import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View, Text, Image, Button } from 'react-native';
import { AsyncStorage } from '@react-native-async-storage/async-storage';

import FeedCard from '../components/FeedCard';
import colors from '../config/colors';
import Screen from '../components/Screen';

import { db } from '../../firebase/firebase-config';
import { getDocs, collection, doc } from 'firebase/firestore';
import AppButton from '../components/Button';

function FeedScreen() {
  const [feedList, setFeedList] = useState([]);
  const feedCollectionRef = collection(db, 'feed');

  useEffect(() => {
    const getFeed = async () => {
      const data = await getDocs(feedCollectionRef);
      const mappedData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setFeedList(mappedData);
    };
    getFeed();
  }, []);

  return (
    <Screen style={styles.screen}>
      <FlatList
        data={feedList}
        keyExtractor={(feedList) => feedList.id.toString()}
        renderItem={({ item }) => (
          <FeedCard
            title={item.name}
            likes={item.likes}
            image={{ uri: item.image }}
            email={item.email}
          />
        )}
      />
      <AppButton title="Upload Image" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.lightGreen,
  },
});

export default FeedScreen;
