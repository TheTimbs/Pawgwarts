import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/firebase-config';
import { getDocs, collection, doc, getDoc } from 'firebase/firestore';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function TrainingScreen(props) {
  const { trainingDetails } = props;
  console.log("steps.length", trainingDetails.steps.length)
  console.log("+++ props passed into SingleTraining Screen +++", props)
  const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
  const steps = ["give instruction", "observe", "give treats"]
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.trainingTitle}> {trainingDetails.title} </Text>
        <Text> Dificulty: {trainingDetails.difficulty}/5 </Text>
      </View>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../assets/DogLogo.png')} />
      </View>
      <View style={styles.trainingDescription}>
        {trainingDetails.description ? <Text>{trainingDetails.description}</Text> : <Text>{loremIpsum}</Text>}
      </View>

      <ScrollView>
        <Text style={styles.stepsTitle}>Steps</Text>
        {trainingDetails.steps.length > 1 ? trainingDetails.steps.map(step => (<Text>{step}</Text>)) : steps.map(step => (<Text>{step}</Text>))}

        <Text style={styles.stepsTitle}>Tips</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  trainingTitle: {
    fontSize: 15,
    fontWeight: "bold"
  },
  stepsTitle: {
    textAlign: 'center',
    paddingTop: 5,
    fontWeight: 'bold',
  },
  logo: {
    width: 100,
    height: 200,
  },
  logoContainer: {
    alignItems: 'center',
  },
  trainingDescription: {
    marginTop: 10,
    padding: 5,
    borderRadius: 5,
    backgroundColor: 'wheat'
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  option: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
  },
  optionButton: {
    paddingVertical: 12,
    marginVertical: 6,
    backgroundColor: '#34A0A4',
    paddingHorizontal: 12,
    borderRadius: 12,
  },
});


export default TrainingScreen;