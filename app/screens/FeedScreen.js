import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View, Text, Image, Button } from 'react-native';
import { AsyncStorage } from '@react-native-async-storage/async-storage'
import FeedCard from '../components/FeedCard';
import colors from '../config/colors';
import Screen from '../components/Screen';
import {useNavigation} from '@react-navigation/native'
import { db } from '../../firebase/firebase-config';
import { getDocs, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import {getTrainingsListChallenge, camelize, getTrainingCategoriesChallenge, random} from '../functions.js/methods'


function FeedScreen() {
  const [feedList, setFeedList] = useState([]);
  const feedCollectionRef = collection(db, 'feed');
  const dayCollectionRef = doc(db, 'challenge', 'date');
  const weekCollectionRef = doc(db, 'challenge', 'weeksChallenge');
  const navigation = useNavigation();
  const today = new Date();

  //console.log(today);
  const getDate = async () =>{
    const data = await getDoc(dayCollectionRef);
    const weekData = await getDoc(weekCollectionRef);
   // console.log(data.data())
    //console.log(data.data().setDate.toString());
    const cur = new Date( data.data().setDate)
    //console.log(new Date (cur));
    const boo  = (new Date(today) >= new Date(cur))
    let date = new Date();
     date.setDate(date.getDate() + 7);
      //console.log("this is 7 day:" ,boo);
      //console.log("this is 7 day:" ,date);
   if(!boo){
      await updateDoc(dayCollectionRef, {setDate:date.toDateString()});
       randomChallenge();
   }

  }

  const randomChallenge = async () => {
   const yearNum = random(3)
   let year = ""
    if(yearNum === 0){
      year = "firstYears"
    }else if(yearNum === 1){
      year = "secondYears"
    }else {
      year = "thirdYears"
    }
    const arrCate = await getTrainingCategoriesChallenge(year);
    const cateNum =random(arrCate.length);
    const title = arrCate[cateNum].data().title;
    const cateTitle = camelize(title);
    const arrTraining = await getTrainingsListChallenge(year, cateTitle)
    const trainingNum =random(arrTraining.length);
    console.log(title)
    console.log(arrCate[cateNum].data());
    const challenge = arrTraining[trainingNum].data()
    await updateDoc(weekCollectionRef,{challenge:challenge})

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
      <View style={styles.RectangleShapeView}>

      </View>
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

    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.lightGreen,
    justifyContent:'center',
    alignContent:'center'

  },
  RectangleShapeView: {

    marginTop: 20,
    width: "100%",
    height: 120,
    backgroundColor: 'blue',

    },



});

export default FeedScreen;
