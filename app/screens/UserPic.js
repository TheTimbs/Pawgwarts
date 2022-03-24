import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View, Text, Image, Button } from 'react-native';
import { AsyncStorage } from '@react-native-async-storage/async-storage';
import FeedCard from '../components/FeedCard';
import colors from '../config/colors';
import Screen from '../components/Screen';
import {useNavigation} from '@react-navigation/native'
import { db,auth } from '../../firebase/firebase-config';
import { getDocs, collection, doc } from 'firebase/firestore';
import AppButton from '../components/Button';
import NewListingButton from '../navigation/NewListingButton';

function userPic() {
  const [userPhoto, setUserPhoto] = useState([]);
  const feedCollectionRef = collection(db, 'feed');
  const navigation = useNavigation();

  useEffect(() => {
    const getPhotos = async () => {
      const data = await getDocs(feedCollectionRef);
      const mappedData = data.docs.map((document) => ({
        ...document.data(),
        id: document.id,
      }));
      const filteredData = mappedData.filter(
        (post) => post.email === auth.currentUser.email
      );
      setUserPhoto(filteredData);
    };
    getPhotos();
  }, []);
  let i =0;
  return (
    <Screen style={styles.screen}>
      <FlatList
        data={userPhoto}
        keyExtractor={(i) => i++}
        renderItem={({ item }) => (
          <FeedCard
            title={item.name}
            likes={item.likes}
            image={{ uri: item.image }}
            email={item.email}
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
    justifyContent:'center'

  },

});

export default userPic;
