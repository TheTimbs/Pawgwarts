import React, { useState, useEffect, useRef } from 'react';
import { FlatList,StyleSheet, View,Text,Image,Button, Pressable,
} from 'react-native';
import { AsyncStorage } from '@react-native-async-storage/async-storage';
import FeedCard from '../components/FeedCard';
import colors from '../config/colors';
import Screen from '../components/Screen';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../firebase/firebase-config';
import {  getDocs,collection, doc, getDoc,updateDoc,} from 'firebase/firestore';
import { getTrainingsListChallenge,camelize, getTrainingCategoriesChallenge,random,} from '../functions/methods';
import AppButton from '../components/Button';
import NewListingButton from '../navigation/NewListingButton';
import { AntDesign } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import ChallengeCard from '../components/ChallengeCard';
import CommunityCard from '../components/CommunityCard';


function FeedScreen() {
  const [feedList, setFeedList] = useState([]);
  const feedCollectionRef = collection(db, 'feed');
  const comFeedCollectionRef = collection(db, 'communityFeed');
  const dayCollectionRef = doc(db, 'challenge', 'date');
  const weekCollectionRef = doc(db, 'challenge', 'weeksChallenge');
  const [challenge, setChallenge] = useState({});
  const navigation = useNavigation();
  const today = new Date();


  const getDate = async () => {
    const data = await getDoc(dayCollectionRef);
    const cur = new Date(data.data().setDate);
    const boo = new Date(today) >= new Date(cur);
    let date = new Date();
    date.setDate(date.getDate() + 7);
    const challengeData = await getDoc(weekCollectionRef);
    setChallenge(challengeData.data().challenge);
    if (boo) {

      await updateDoc(dayCollectionRef, { setDate: date.toDateString() });
      randomChallenge();
    }

  };

  const randomChallenge = async () => {
    const yearNum = random(3);
    let year = '';
    if (yearNum === 0) {
      year = 'firstYears';
    } else if (yearNum === 1) {
      year = 'secondYears';
    } else {
      year = 'thirdYears';
    }
    const arrCate = await getTrainingCategoriesChallenge(year);
    const cateNum = random(arrCate.length);
    const title = arrCate[cateNum].data().title;
    const cateTitle = camelize(title);
    const arrTraining = await getTrainingsListChallenge(year, cateTitle);
    const trainingNum = random(arrTraining.length);
    const challenge = arrTraining[trainingNum].data();
    setChallenge(challenge);
    await updateDoc(weekCollectionRef, { challenge: challenge , userPost:[]});
    //reset the house
    const gRef = doc(db, 'houses ', 'GryffinDog');
    const hRef = doc(db, 'houses ', 'HufflePup');
    const rRef = doc(db, 'houses ', 'RavenPaw');
    const sRef = doc(db, 'houses ', 'Slobberin');
    await updateDoc(gRef,{points:0})
    await updateDoc(hRef,{points:0})
    await updateDoc(rRef,{points:0})
    await updateDoc(sRef,{points:0})
  };
  const changeFeed = async (position) => {
    console.log(position)
    let num = position;
    if(num === undefined){
      if(feedList[0].house === undefined){
        num =0;
      }

    }
    if(num >= 281){
    const data = await getDocs(comFeedCollectionRef);
    const mappedData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setFeedList(mappedData);

  }else{
    getFeed();
  }
  };
  const getFeed = async () => {
    const data = await getDocs(feedCollectionRef);
    const mappedData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
     const dataDate = await getDoc(dayCollectionRef);
     const cur = new Date(dataDate.data().setDate);
     let date = new Date();
     date.setDate(date.getDate() - 7);
     const filter =  mappedData.filter((post) => {
      if(new Date(post.date) < new Date(cur) && new Date(post.date) > new Date(date)){
        return post
      }
    });
    setFeedList(filter);
  }
  useEffect(() => {

    const unsubscribe = navigation.addListener('focus', () => {

      changeFeed()
      getDate();
    });
    return unsubscribe;
  }, [navigation]);

  if( Object.keys(challenge).length === 0 ){
    return(<Text> Loading... </Text>)

  }else {
  return (
    <Screen style={styles.screen}>

      <ScrollView>
        <ScrollView horizontal={true} style={styles.backgroundColorView} onMomentumScrollEnd= {(e)=> changeFeed(e.nativeEvent.contentOffset.x)} pagingEnabled decelerationRate={0} showsHorizontalScrollIndicator scrollEventThrottle={16} >
            <ChallengeCard
              key={challenge.title}
              navigation={navigation}
              imgSource={challenge.images[0]}
              title={challenge.title}
              data={challenge}
            />
             <CommunityCard
              key={"dum"}
              navigation={navigation}
              imgSource={challenge.images[0]}
              title={"Community Feed"}
              data={challenge}
            />
         </ScrollView>
          {feedList.map((item) =>
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
  RectangleShapeView: {
    width: '80%',
    height: 120,
    backgroundColor: 'blue',
    position: 'relative',
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
