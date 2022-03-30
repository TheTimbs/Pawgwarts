import React, { useState, useEffect } from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  Pressable,
} from 'react-native';
import { AsyncStorage } from '@react-native-async-storage/async-storage';

import FeedCard from '../components/FeedCard';
import colors from '../config/colors';
import Screen from '../components/Screen';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../firebase/firebase-config';
import { getDocs, collection, doc } from 'firebase/firestore';
import AppButton from '../components/Button';
import NewListingButton from '../navigation/NewListingButton';
import { AntDesign } from '@expo/vector-icons';
import { useTimer } from 'react-timer-hook';

function FeedScreen() {
  const [feedList, setFeedList] = useState([]);
  const feedCollectionRef = collection(db, 'feed');
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const getFeed = async () => {
        const data = await getDocs(feedCollectionRef);
        const mappedData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setFeedList(mappedData);
      };
      getFeed();
    });
    console.log('feedscreen');
    return unsubscribe;
  }, [navigation]);

  // console.log(feedList);
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
      {/* <NewListingButton
            style={styles.upload}
            onPress={() => navigation.navigate('ListingDetails')}
          /> */}
      {/* <Button
        title="Upload"
        onPress={() => navigation.navigate('UploadImageScreen')}
      /> */}
      <Pressable
        style={styles.buttonStyle}
        onPress={() => navigation.navigate('UploadImageScreen')}
      >
        <AntDesign name="pluscircle" size={50} color="black" />
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.medium,
    justifyContent: 'center',
  },
  buttonStyle: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    bottom: 1,
    padding: 15,
    backgroundColor: 'transparent',
  },
});

export default FeedScreen;
