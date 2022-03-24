import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/firebase-config';
import { getDocs, collection, doc, getDoc } from 'firebase/firestore';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Image, ScrollView, Picker, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function TrainingScreen(props) {
  const [selectedValue, setSelectedValue] = useState("Start Training");
  const { trainingDetails } = props;
  console.log("steps.length", trainingDetails.steps.length)
  console.log("+++ props passed into SingleTraining Screen +++", props)
  const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
  const steps = ["Lorem ipsum dolor sit amet", "consectetur adipiscing elit", "sed do eiusmod tempor incididunt"]
  const tips = ["Don't give up", "You got this!"]
  const tools = ["Lorem", "ipsum", "dolor"]
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.top}>
        <Text style={styles.trainingTitle}> {trainingDetails.title} </Text>
        <Text> Dificulty: {trainingDetails.difficulty}/5 </Text>
      </View>

      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../assets/DogLogo.png')} />
      </View>

      <View style={styles.trainingDescriptionContainer}>
        {trainingDetails.description ? <Text style={styles.bodyText}>{trainingDetails.description}</Text> : <Text style={styles.bodyText}>{loremIpsum}</Text>}
      </View>

      <Picker
        style={styles.dropDown}
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedValue(itemValue)
        }>
        <Picker.Item label="Start This Training" value="trainingStarted" />
        <Picker.Item label="Mark Completed" value="trainingCompleted" />
      </Picker>

      <ScrollView>
        <Text style={styles.stepsTitle}>Steps</Text>
        {trainingDetails.steps[0] !== "" ? trainingDetails.steps.map(step => (<Text key={steps.indexOf(step)} style={bodyText}>Step {steps.indexOf(step) + 1}: {step}</Text>)) : steps.map(step => (<Text key={steps.indexOf(step)} style={styles.bodyText}>Step {steps.indexOf(step) + 1}: {step}</Text>))}

        <Text style={styles.stepsTitle}>Tips</Text>
        {trainingDetails.tips[0] !== "" ? trainingDetails.tips.map(tip => (<Text key={tips.indexOf(tip)} style={bodyText}>* {tip}</Text>)) : tips.map(tip => (<Text key={tips.indexOf(tip)} style={styles.bodyText}>* {tip}</Text>))}

        <Text style={styles.stepsTitle}> Recommended Training Tools </Text>
        {trainingDetails.tools[0] !== "" ? trainingDetails.tools.map(tool => (<Text key={tools.indexOf(tool)} style={bodyText}>* {tool}</Text>)) : tools.map(tool => (<Text key={tools.indexOf(tool)} style={styles.bodyText}>* {tool}</Text>))}

      </ScrollView>
      {/* {if we don't want to use the picker} */}
      <View style={styles.buttons}>
        <Button title='Start Training' />
        <Button title='Mark Completed' />
      </View>
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
  buttons: {
    marginLeft: 0,
    flexDirection: "row",
    justifyContent: "space-between"
  },
});


export default TrainingScreen;