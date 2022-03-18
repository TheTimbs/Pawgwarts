import React, { useState, useEffect } from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Image,
  AsyncStorage,
} from 'react-native';

import Card from '../components/Card';
import colors from '../config/colors';
import Screen from '../components/Screen';

import { db } from '../../firebase/firebase-config';
import { getDocs, collection, doc } from 'firebase/firestore';

const dummyData = [
  {
    id: 1,
    username: 'Chris',
    likes: 0,
    image: require('../assets/GermanShepPuppy.webp'),
  },
  {
    id: 2,
    username: 'Kazi',
    likes: 2,
    image: require('../assets/GermanTeen.jpeg'),
  },
  {
    id: 3,
    username: 'Eric',
    likes: 2,
    image: require('../assets/GermanAdult.jpeg'),
  },
];

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
      // console.log(data);
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
          <Card
            title={item.username}
            subTitle={item.likes}
            image={{ uri: item.image }}
          />
        )}
      />
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
