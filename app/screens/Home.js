import { ImageBackground, StyleSheet, View, Image, Text, } from 'react-native';
import React from 'react';
import { db, auth } from '../../firebase/firebase-config';
import { getDoc, collection, doc, } from 'firebase/firestore';
import { useEffect, useState } from 'react/cjs/react.development';

function Home(props){
  const gRef = doc(db,'houses ',"GryffinDog");
  const hRef = doc(db,'houses ',"HufflePup");
  const rRef = doc(db,'houses ',"RavenPaw");
  const sRef = doc(db,'houses ',"Sloberin");
  const [gPoints, setGPoints] = useState(0);
  const [hPoints, setHPoints] = useState(0);
  const [rPoints, setRPoints] = useState(0);
  const [sPoints, setSPoints] = useState(0);
  useEffect(()=>{
    const getPoints = async() =>{
      const dataG = await getDoc(gRef)
      const dataH = await getDoc(hRef)
      const dataR = await getDoc(rRef)
      const dataS = await getDoc(sRef)
      setGPoints(dataG.data().points)
      setHPoints(dataH.data().points)
      setRPoints(dataR.data().points)
      setSPoints(dataS.data().points)
    }
    getPoints();
  },[])

  return (

       <ImageBackground blurRadius={1}  style={styles.background}
      source={require('../assets/BlueBackground.jpeg')} >
       <View style={styles.container}>
         <View style={styles.top}>
           <Text>Hello</Text>
         </View>
          <View style={styles.center}>
            <Text style={styles.text}>Team Current points</Text>
          </View>
           <View style={styles.bottom}>
              <View style={styles.box}>
                <ImageBackground  style= {styles.inner} source={require('../assets/hufflepup.png')}/>
                <Text style={styles.text}>Points: {hPoints}</Text>
              </View>
              <View style={styles.box}>
                <ImageBackground  style= {styles.inner} source={require('../assets/ravenpaw.jpeg')}/>
                <Text style={styles.text}>Points: {rPoints}</Text>
              </View>
              <View style={styles.box}>
                <ImageBackground  style= {styles.inner} source={require('../assets/slobberin.jpeg')}/>
                <Text style={styles.text}>Points: {sPoints}</Text>
              </View>
              <View style={styles.box}>
                <ImageBackground  style= {styles.inner} source={require('../assets/gryffindog.jpeg')}/>
                <Text style={styles.text}>Points: {gPoints}</Text>
              </View>
            </View>

       </View>
     </ImageBackground>

  );

}
const styles = StyleSheet.create({
  container:{
    flex:1
  },
  top:{
    height:'45%',
    alignItems:'center',
    justifyContent:'center',

  },
  bottom:{
    height: '45%',
    flexDirection: 'row',
    flexWrap: 'wrap',

  },
  center:{
    height:'5%',
    left:'25%'
  },
  box:{
    width: '50%',
    height: '50%',
  },
  inner:{
    flex:1,
    width:"90%",
    height:"90%",
    left:"5%"
  },
  text:{
  fontSize:20,
  color:"white"
  },
  background: {
   height:'100%'
  },
  textHeader:{
    top:'55%',
    fontSize:40,
    color:"red",
    left:10
    }


});

export default Home;
