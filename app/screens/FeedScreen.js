import React, { useState, useEffect, useRef } from 'react';
import { FlatList,StyleSheet, View,Text,Image,Button, Pressable,
} from 'react-native';
import { AsyncStorage } from '@react-native-async-storage/async-storage';
import FeedCard from '../components/FeedCard';
import colors from '../config/colors';
import Screen from '../components/Screen';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../firebase/firebase-config';
import {  getDocs,collection, doc, getDoc,updateDoc, arrayUnion} from 'firebase/firestore';
import { getTrainingsListChallenge,camelize, getTrainingCategoriesChallenge,random,} from '../functions/methods';
import AppButton from '../components/Button';
import NewListingButton from '../navigation/NewListingButton';
import { AntDesign } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import ChallengeCard from '../components/ChallengeCard';
import CommunityCard from '../components/CommunityCard';
import PastWeekButton from '../components/PastWeekButton'


function FeedScreen() {
  const [feedList, setFeedList] = useState([]);
  const [WeekFeed, setWeekFeed]= useState([]);
  const [communityFeed, setComFeed]= useState([]);
  const feedCollectionRef = collection(db, 'feed');
  const comFeedCollectionRef = collection(db, 'communityFeed');
  const dayCollectionRef = doc(db, 'challenge', 'date');
  const weekCollectionRef = doc(db, 'challenge', 'weeksChallenge');
  const [challenge, setChallenge] = useState({});
  const [winner, setWinner]= useState('');
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
    setWinner(challengeData.data().winner)
    if (boo) {
      await updateDoc(dayCollectionRef, { setDate: date.toDateString(), date: arrayUnion(cur.toDateString()) });
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
    const gRef = doc(db, 'houses ', 'GryffinDog');
    const hRef = doc(db, 'houses ', 'HufflePup');
    const rRef = doc(db, 'houses ', 'RavenPaw');
    const sRef = doc(db, 'houses ', 'Slobberin');
    const gData = await getDoc(gRef);
    const hData = await getDoc(hRef);
    const rData = await getDoc(rRef);
    const sData = await getDoc(sRef);
   if(gData.data().points > hData.data().points && gData.data().points > rData.data().points && gData.data().points > sData.data().points){
     await updateDoc(weekCollectionRef, { challenge: challenge , userPost:[], winner:'GryffinDog'});
     setWinner('GryffinDog')
   }else if(hData.data().points > gData.data().points && hData.data().points > rData.data().points && hData.data().points > sData.data().points){
      await updateDoc(weekCollectionRef, { challenge: challenge , userPost:[], winner:'HufflePup'});
      setWinner('HufflePup')
   }else if(rData.data().points > gData.data().points && rData.data().points > hData.data().points && rData.data().points > Data.data().points){
      await updateDoc(weekCollectionRef, { challenge: challenge , userPost:[], winner:'RavenPaw'});
      setWinner('RavenPaw')
   }else{
     await updateDoc(weekCollectionRef, { challenge: challenge , userPost:[], winner:'Slobberin'});
      setWinner('Slobberin')
   }

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
    if(num >=140 ){
    setFeedList(communityFeed);

  }else{
    setFeedList(WeekFeed)

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
    const dataCom = await getDocs(comFeedCollectionRef);
    const mappedDataCom = dataCom.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setComFeed(mappedDataCom);
    setWeekFeed(filter);
    setFeedList(filter);
  }
  useEffect(() => {

    const unsubscribe = navigation.addListener('focus', () => {
     console.log("running")
          getFeed();
    });
      getDate();
    return unsubscribe;
  }, [navigation]);

  if( Object.keys(challenge).length === 0 ){
    return(<Text> Loading... </Text>)

  }else {
  return (
    <Screen style={styles.screen}>

      <ScrollView>
        <View style={{justifyContent:"center", alignItems:'center'}}>
          <Text style={styles.text}>Last week winner</Text>
              <Text style={styles.text}>{winner}</Text>
          <ScrollView horizontal={true}
          onScroll= {(e)=> changeFeed(e.nativeEvent.contentOffset.x)}
          scrollEventThrottle={0}
          snapToStart
          >
              <ChallengeCard
                key={challenge.title}
                navigation={navigation}
                title={"Challenge of the week"}
                data={challenge}
              />

              <CommunityCard
                key={"Community"}
                navigation={navigation}
                title={"Community Feed"}
              />

             <PastWeekButton
             key={"past"}
             navigation={navigation}
             title={"past weeks"}
             />

          </ScrollView>
         </View>

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
  buttonStyle: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    bottom: 1,
    padding: 15,
    backgroundColor: 'transparent',
  },
  text: {
    color: colors.white,
    fontSize: 20,
    textTransform: 'uppercase',
    fontWeight: 'bold',

  },
});

export default FeedScreen;
