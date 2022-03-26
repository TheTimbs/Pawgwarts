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
  const [points, setPoints] = useState([]);

  useEffect(()=>{
    getPoints();
  },[])

  const getPoints = async() =>{
    const dataG = await getDoc(gRef)
    const dataH = await getDoc(hRef)
    const dataR = await getDoc(rRef)
    const dataS = await getDoc(sRef)
    setPoints([dataG.data().points, dataH.data().points, dataR.data().points, dataS.data().points])

  }

  return (

       <ImageBackground blurRadius={1}  style={styles.background}
      source={require('../assets/BlueBackground.jpeg')} >
       <View style={styles.container}>
         <View style={styles.top}>
           <Text style={styles.textHeader}>Welcome Erick</Text>
         </View>
          <View style={styles.center}>
            <Text style={styles.textHeader}>Houses Current Points</Text>
          </View>
           <View style={styles.bottom}>
              <View style={styles.box}>
                <ImageBackground  style= {styles.inner} source={require('../assets/hufflepup.png')}/>
                <Text style={styles.text}>Points: {points[0]}</Text>
              </View>
              <View style={styles.box}>
                <ImageBackground  style= {styles.inner} source={require('../assets/ravenpaw.jpeg')}/>
                <Text style={styles.text}>Points: {points[1]}</Text>
              </View>
              <View style={styles.box}>
                <ImageBackground  style= {styles.inner} source={require('../assets/slobberin.jpeg')}/>
                <Text style={styles.text}>Points: {points[2]}</Text>
              </View>
              <View style={styles.box}>
                <ImageBackground  style= {styles.inner} source={require('../assets/gryffindog.jpeg')}/>
                <Text style={styles.text}>Points: {points[3]}</Text>
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
    height:'50%',
    alignItems:'center',
    justifyContent:'center',

  },
  bottom:{
    height: '45%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor:'black',

  },
  center:{
    height:'5%',
    justifyContent:"center",
    alignItems:'center',
    backgroundColor:"black"
  },
  box:{
    width: '50%',
    height: '50%',
  },
  inner:{
    flex:1,
    width:"100%",
    height:"100%",
    left:"5%",
  },
  text:{
  fontSize:20,
  color:"white"
  },
  background: {
   height:'100%'
  },
  textHeader:{
    fontSize:30,
    color:"red",
    }


});

export default Home;
