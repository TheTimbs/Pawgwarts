import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/firebase-config';
import Screen from '../components/Screen';
import {
  getDocs,
  collection,
} from 'firebase/firestore';
import {
  StyleSheet,
  Text,
  ScrollView,
} from 'react-native';
import FeedCard from '../components/FeedCard';
import colors from '../config/colors';

function SingleWeekScreen({route}){
  const {title} = route.params
  const [feed, setFeed] = useState([])
  const feedCollectionRef = collection(db, 'feed');

  async function getPastWeekFeed(){
     const data = await getDocs(feedCollectionRef);
    const mappedData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
     const challengeDate = new Date(title);
     let date = new Date(title);
     date.setDate(date.getDate() - 7);
     const filter =  mappedData.filter((post) => {
      if(new Date(post.date) < new Date(challengeDate) && new Date(post.date) > new Date(date)){
        return post
      }
    });
    setFeed(filter)
  }
    useEffect(()=>{
      getPastWeekFeed()
    },[])
  if(feed.length === 0){
    return(
      <Text>loading...</Text>
    )
  }
  else{
  return(
   <Screen style={styles.screen}>
      <ScrollView >
       {feed.map((item) =>
          <FeedCard
            key={item.id.toString()}
            title={item.name}
            likes={item.likes}
            image={{ uri: item.image }}
            email={item.email}
          />
        )}


      </ScrollView>
  </Screen>
  );
      }
}
const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
  },
})

export default SingleWeekScreen

