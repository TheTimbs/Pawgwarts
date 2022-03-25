
import { ImageBackground, StyleSheet, View, Image, Text, } from 'react-native';
import React from 'react';
function Home(props){

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
                <ImageBackground  style= {styles.inner} source={require('../assets/hufflepup.png')}>
                </ImageBackground>
                <Text style={styles.text}>team 1</Text>
              </View>
              <View style={styles.box}>
                <ImageBackground  style= {styles.inner} source={require('../assets/ravenpaw.jpeg')}>
                </ImageBackground>
                <Text style={styles.text}>team 1</Text>
              </View>
              <View style={styles.box}>
               <ImageBackground  style= {styles.inner} source={require('../assets/slobberin.jpeg')}>
               </ImageBackground>
               <Text style={styles.text}>team 1</Text>
              </View>
              <View style={styles.box}>
               <ImageBackground  style= {styles.inner} source={require('../assets/gryffindog.jpeg')}>
               </ImageBackground>
               <Text style={styles.text}>team 1</Text>
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
    height: '50%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding:5,
    backgroundColor:'black'
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
