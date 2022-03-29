import { ImageBackground, StyleSheet, View, Image, Text, } from 'react-native';
import React from 'react';
import { db, auth } from '../../firebase/firebase-config';
import { getDoc, collection, doc, } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';


function Home(props) {
  const userId = auth.currentUser.uid;
  const currentUser = doc(db, 'users', userId);
  const gRef = doc(db, 'houses ', "GryffinDog");
  const hRef = doc(db, 'houses ', "HufflePup");
  const rRef = doc(db, 'houses ', "RavenPaw");
  const sRef = doc(db, 'houses ', "Sloberin");
  const [points, setPoints] = useState([]);
  const [user, setUser] = useState({});
  const navigation = useNavigation();


  useEffect(() => {
    console.log("!!!! useeffect from Home.js ran !!!!")
    const unsubscribe = navigation.addListener('focus', () => {
      getPoints();
      getUser();
    })
    console.log("++ user ++", user)
    return unsubscribe;
  }, [navigation])

  const getUser = async () => {
    const userData = await getDoc(currentUser);
    setUser(userData.data());
    console.log("User data", user)

  }
  const getPoints = async () => {
    const dataG = await getDoc(gRef)
    const dataH = await getDoc(hRef)
    const dataR = await getDoc(rRef)
    const dataS = await getDoc(sRef)
    setPoints([dataG.data().points, dataH.data().points, dataR.data().points, dataS.data().points])

  }
  if (!user.dog) {
    return (
      <Text>loading..</Text>
    )
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.top}>

          <Text style={styles.textHeader2}>Welcome {user.name} and {user.dog.dogName}</Text>

          <View style={styles.box2}>
            <Text style={styles.text2}>Trainings in Progress:</Text>
            {user.trainingsInProgress.map(training => (<Text key={user.trainingsInProgress.indexOf(training)}> {training} </Text>))}
          </View>
        </View>

        <View style={styles.center}>
          <Text style={styles.textHeader}>Houses Current Points</Text>
        </View>

        <View style={styles.bottom}>
          <View style={styles.box}>
            <ImageBackground style={styles.inner} source={require('../assets/hufflepup.png')} />
            <Text style={styles.text}>Points: {points[0]}</Text>
          </View>
          <View style={styles.box}>
            <ImageBackground style={styles.inner} source={require('../assets/ravenpaw.jpeg')} />
            <Text style={styles.text}>Points: {points[1]}</Text>
          </View>
          <View style={styles.box}>
            <ImageBackground style={styles.inner} source={require('../assets/slobberin.jpeg')} />
            <Text style={styles.text}>Points: {points[2]}</Text>
          </View>
          <View style={styles.box}>
            <ImageBackground style={styles.inner} source={require('../assets/gryffindog.jpeg')} />
            <Text style={styles.text}>Points: {points[3]}</Text>
          </View>
        </View>

      </View>

    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#587B7F'
  },
  top: {
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',

  },
  bottom: {
    height: '45%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#0D1321',

  },
  center: {
    height: '5%',
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: "#0D1321",

  },
  box: {
    width: '50%',
    height: '50%',
  },
  inner: {
    flex: 1,
    width: "100%",
    height: "100%",
    left: "5%",
  },
  text: {
    fontSize: 20,
    color: "white",
    textAlign: 'center'
  },
  background: {
    height: '100%'
  },
  textHeader: {
    fontSize: 30,
    color: "white",
  },
  textHeader2: {
    fontSize: 30,
    color: "black",
    bottom: "10%",
    textDecorationLine: 'underline',
    backgroundColor: '#54F2F2',
    borderRadius: 20
  },
  box2: {
    width: '85%',
    height: '25%',
    backgroundColor: '#54F2F2',
    borderRadius: 20
  },
  text2: {
    fontSize: 20,
    color: "black",
    textAlign: 'center'
  },


});

export default Home;
