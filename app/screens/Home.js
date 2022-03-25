
import { ImageBackground, StyleSheet, View, Image, Text, } from 'react-native';
import React from 'react';
function Home(props){

  return (

       <ImageBackground
      blurRadius={1}
      style={styles.background}
      source={require('../assets/BlueBackground.jpeg')}
    >
      <Text style={styles.textHeader}>Team Current points:</Text>
      <View style={styles.container}>

        <View style={styles.box}>
          <View style={styles.inner}>
            <Image  style= {styles.image} source={require('../assets/Puppy.jpeg')}></Image>
            <Text style={styles.text}>team 1</Text>
          </View>
        </View>
        <View style={styles.box}>
          <View style={styles.inner}>
            <Image  style= {styles.image} source={require('../assets/Puppy.jpeg')}></Image>
            <Text style={styles.text}>team 2</Text>
          </View>
        </View>
        <View style={styles.box}>
          <View style={styles.inner}>
            <Image  style= {styles.image} source={require('../assets/Puppy.jpeg')}></Image>
            <Text style={styles.text}>team 3</Text>
          </View>
        </View>
        <View style={styles.box}>
          <View style={styles.inner}>
            <Image  style= {styles.image} source={require('../assets/Puppy.jpeg')}></Image>
            <Text style={styles.text}>team 4</Text>
          </View>
        </View>


     </View>
     </ImageBackground>

  );
}
const styles = StyleSheet.create({
  container:{
    width: '100%',
    height: '65%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    top:'120%',
    margin:'-8%',
    marginLeft:"5%"
  },
  box:{
    width: '50%',
    height: '50%',
    margin:'-18%',
    marginVertical:'-12%',
    marginLeft:"1.5%"
  },
  inner:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    padding:5
  },
  image: {
    width: '60%',
    height: '60%',

  },
  text:{
  bottom:'60%',
  fontSize:40,
  color:"white"
  },
  background: {
   height:'100%'
  },
  textHeader:{
    top:'50%',
    fontSize:40,
    color:"red",
    left:10
    }


});

export default Home;
