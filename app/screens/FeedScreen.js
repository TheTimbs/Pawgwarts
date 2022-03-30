import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View, Text, Image, Button } from 'react-native';
import { AsyncStorage } from '@react-native-async-storage/async-storage'
import FeedCard from '../components/FeedCard';
import colors from '../config/colors';
import Screen from '../components/Screen';
import {useNavigation} from '@react-navigation/native'
import { db } from '../../firebase/firebase-config';
import { getDocs, collection, doc, getDoc } from 'firebase/firestore';
import AppButton from '../components/Button';
import NewListingButton from '../navigation/NewListingButton';
import { useTimer } from 'react-timer-hook';
import { updateCurrentUser } from '@firebase/auth';


function FeedScreen() {
  const [feedList, setFeedList] = useState([]);
  const feedCollectionRef = collection(db, 'feed');
  const challengeCollectionRef = doc(db, 'challenge', 'date');
  const weekCollectionRef = doc(db, 'challenge', 'weeksChallenge');
  const navigation = useNavigation();
  const today = new Date();

  console.log(today);
  const getDate = async () =>{
    const data = await getDoc(challengeCollectionRef);
    const weekData = await getDoc(weekCollectionRef);
   // console.log(data.data().setDate)
    //console.log(new Date(data.data().setDate))
    const boo  = (new Date(today) >= new Date(data.data().setDate))
    var date = new Date();
      date.setDate(date.getDate() + 7);

    console.log("this is 7 day:" ,date);
   if(boo){

   }


   updateCurrentUser(arrayUnion(obj))
  }

  useEffect(() => {
    const getFeed = async () => {
      const data = await getDocs(feedCollectionRef);
      const mappedData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setFeedList(mappedData);
      getDate();
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
         {/* <NewListingButton
            style={styles.upload}
            onPress={() => navigation.navigate('ListingDetails')}
          /> */}
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

export default FeedScreen;
