import React, { useState, useEffect } from 'react';
import { db } from "../../firebase/firebase-config";
import { getDocs, collection, doc, getDoc, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Image, ScrollView, Button, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import colors from '../config/colors';

function ChallengeScreen({ navigation, route }) {
  const data = route.params;
  const [trainingDetails, setTrainingDetails] = useState(data);


  // Dummy Training Data:
  const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
  const steps = ["Lorem ipsum dolor sit amet", "consectetur adipiscing elit", "sed do eiusmod tempor incididunt"]
  const tips = ["Don't give up", "You got this!"]
  const tools = ["Lorem", "ipsum", "dolor"];



  useEffect(() => {  }, []);




  return (
    Object.keys(trainingDetails).length === 0 ? <Text> ... Loading </Text> :
      <SafeAreaView style={styles.container}>

        <View style={styles.top}>
          <Text style={styles.trainingTitle}> {trainingDetails.title} </Text>
          <Text> Difficulty: {trainingDetails.difficulty}/5 </Text>
        </View>

        <ScrollView>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require('../assets/DogLogo.png')} />
          </View>

          <View style={styles.trainingDescriptionContainer}>
            {trainingDetails.description ? <Text style={styles.bodyText}>{trainingDetails.description}</Text> : <Text style={styles.bodyText}>{loremIpsum}</Text>}
          </View>

          <Text style={styles.stepsTitle}>Steps</Text>
          {trainingDetails.steps[0] !== "" ? trainingDetails.steps.map(step => (<Text key={steps.indexOf(step)} style={bodyText}>Step {steps.indexOf(step) + 1}: {step}</Text>)) : steps.map(step => (<Text key={steps.indexOf(step)} style={styles.bodyText}>Step {steps.indexOf(step) + 1}: {step}</Text>))}

          <Text style={styles.stepsTitle}>Tips</Text>
          {trainingDetails.tips[0] !== "" ? trainingDetails.tips.map(tip => (<Text key={tips.indexOf(tip)} style={bodyText}>* {tip}</Text>)) : tips.map(tip => (<Text key={tips.indexOf(tip)} style={styles.bodyText}>* {tip}</Text>))}

          <Text style={styles.stepsTitle}> Recommended Training Tools </Text>
          {trainingDetails.tools[0] !== "" ? trainingDetails.tools.map(tool => (<Text key={tools.indexOf(tool)} style={bodyText}>* {tool}</Text>)) : tools.map(tool => (<Text key={tools.indexOf(tool)} style={styles.bodyText}>* {tool}</Text>))}
        </ScrollView>

         <View style={styles.bottom}>
                 <Pressable
        style={styles.buttonStyle}
        onPress={() => navigation.navigate('UploadImageScreen')}
      >
        <AntDesign name="pluscircle" size={50} color={colors.houseBlue} />
      </Pressable>
        </View>
         {/* <Pressable
        style={styles.buttonStyle}
        onPress={() => navigation.navigate('UploadImageScreen')}
      >
        <AntDesign name="pluscircle" size={50} color={colors.houseBlue} />
      </Pressable> */}
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignContent:'center',
    justifyContent:'center'
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  trainingTitle: {
    fontSize: 20,
    fontWeight: "bold"
  },
  stepsTitle: {
    textAlign: 'center',
    paddingTop: 5,
    fontWeight: 'bold',
    fontSize: 18,
  },
  logo: {
    width: 90,
    height: 150,
  },
  logoContainer: {
    alignItems: 'center',
  },
  trainingDescriptionContainer: {
    marginTop: 10,
    padding: 5,
    borderRadius: 5,
    backgroundColor: 'wheat'
  },
  bodyText: {
    fontSize: 18,
  },
  bottom: {
    flexDirection: "column",
    alignItems: 'center'
  },
});


export default ChallengeScreen;
