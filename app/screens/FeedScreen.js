import React, { useState, useEffect } from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  AsyncStorage,
} from 'react-native';
// import { useNavigation } from '@react-navigation/native';
import Card from '../components/Card';
import colors from '../config/colors';
import Screen from '../components/Screen';

import { db } from '../../firebase/firebase-config';
import { getDocs, collection, doc } from 'firebase/firestore';
import AppButton from '../components/Button';

function FeedScreen() {
  const [feedList, setFeedList] = useState([]);
  const feedCollectionRef = collection(db, 'feed');
  // const navigation = useNavigation();
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

  // const createPost = () => {
  //   navigation.navigate('UploadImageScreen');
  // };

  return (
    <Screen style={styles.screen}>
      <FlatList
        data={feedList}
        keyExtractor={(feedList) => feedList.id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.name}
            subTitle={item.likes}
            image={{ uri: item.image }}
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
