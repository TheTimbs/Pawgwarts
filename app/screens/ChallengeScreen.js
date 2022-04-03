import React, { useState, useEffect } from 'react';
import { db, auth } from "../../firebase/firebase-config";
import { doc, getDoc,} from 'firebase/firestore';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Image, ScrollView, Button, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import colors from '../config/colors';

function ChallengeScreen({ navigation, route }) {
  const data = route.params;
  const [trainingDetails, setTrainingDetails] = useState(data);
  const [userPosted, setUserPosted] = useState(false);
  const props = 'feed'

  // Dummy Training Data:
  const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
  const steps = ["Lorem ipsum dolor sit amet", "consectetur adipiscing elit", "sed do eiusmod tempor incididunt"]
  const tips = ["Don't give up", "You got this!"]
  const tools = ["Lorem", "ipsum", "dolor"];



  useEffect(() => {

    async function checkUserPosted(){
      const weekCollectionRef = doc(db, 'challenge', 'weeksChallenge');
      const challengeData = await getDoc(weekCollectionRef);
      const userEmails = challengeData.data().userPost
      if(userEmails.includes(auth.currentUser.email)){
              setUserPosted(true)
      }
    }
    checkUserPosted();
    }, []);

    const handleLink = (link) => {
    Linking.openURL(link);
  };

  if (trainingDetails.difficulty) {
    var myloop = [];

    for (let i = 0; i < trainingDetails.difficulty; i++) {
      myloop.push(
        <MaterialCommunityIcons name="star" color={colors.white} size={30} />
      );
    }
    for (let i = 0; i < 5 - trainingDetails.difficulty; i++) {
      myloop.push(
        <MaterialCommunityIcons
          name="star-outline"
          color={colors.white}
          size={30}
        />
      );
    }
  }


  return (
    Object.keys(trainingDetails).length === 0 ? (
    <Text> ... Loading </Text>
  ) : (
    <>
      <ScrollView>
        <View style={styles.logoContainer}>
          {trainingDetails.images[1] ? (
            <Image
              style={styles.logo}
              source={{ uri: trainingDetails.images[0] }}
            />
          ) : (
            <Image
              style={styles.logo}
              source={{ uri: trainingDetails.images[0] }}
            />
          )}
        </View>
        <View style={styles.trainingDescriptionContainer}>
          {trainingDetails.description ? (
            <>
              <Text style={styles.topText}>Difficulty: {myloop}</Text>
              <Text style={styles.descriptionText}>
                {trainingDetails.description}
              </Text>
              {/* <View style={styles.bottom}>
                {startTraining ? (
                  <Button
                    title="Start Training"
                    onPress={() => handleStartTraining()}
                    color={colors.purple}
                  />
                ) : trainingCompleted ? (
                  <Text fontSize={30}> Training completed! </Text>
                ) : (
                  <Button
                    title="In Progress: Mark Completed"
                    onPress={handleMarkCompleted}
                    color={colors.purple}
                  />
                )}
              </View> */}
            </>
          ) : (
            <Text style={styles.bodyText}>{loremIpsum}</Text>
          )}
        </View>

        <Text style={styles.stepsTitle}>Steps</Text>
        {trainingDetails.steps[0] !== '' ? (
          trainingDetails.steps.map((step, stepIndex) => (
            <>
              <View style={styles.stepsView}>
                <View style={styles.stepNumIcon}>
                  <Text key={stepIndex} style={styles.stepNumIconText}>
                    {stepIndex + 1}
                  </Text>
                </View>
                <Text key={stepIndex} style={styles.stepsText}>
                  {step}
                </Text>
              </View>
              <Image
                style={styles.logo}
                source={{ uri: trainingDetails.images[stepIndex + 2] }}
              />
            </>
          ))
        ) : (
          <Text>Loading...</Text>
        )}
        <View style={styles.tipsView}>
          <Text style={styles.tipTitle}>Tips</Text>
          {trainingDetails.tips[0] !== '' ? (
            trainingDetails.tips.map((tip) => (
              <Text key={tips.indexOf(tip)} style={styles.tipsText}>
                * {tip}
              </Text>
            ))
          ) : (
            <Text>Loading...</Text>
          )}
        </View>
        <Text style={styles.stepsTitle}> Recommended Training Tools </Text>
        {trainingDetails.tools[0] !== '' ? (
          trainingDetails.tools.map((tool, i) => (
            <ScrollView horizontal={true}>
              <View>
                <View key={i} style={styles.toolsContainer}>
                  <TouchableWithoutFeedback
                    onPress={() => handleLink(tool.link)}
                  >
                    <Image
                      source={{ uri: tool.image }}
                      style={{
                        width: 200,
                        height: 200,
                        alignSelf: 'center',
                        borderColor: colors.houseYellow,
                        borderWidth: 3,
                      }}
                    />

                    <Text style={styles.header}>{tool.name}</Text>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </ScrollView>
          ))
        ) : (
          <Text>Just some yummy treats! :) </Text>
        )}
      </ScrollView>
    </>
  )
  )}
//         }

//        {/* {!userPosted ?(  <View style={styles.bottom}>
//              <Pressable style={styles.buttonStyle}
//                onPress={() => navigation.navigate('UploadImageScreen', {props})}>
//              <AntDesign name="pluscircle" size={50} color={colors.houseBlue} />
//              </Pressable>
//          </View>
//        ):<View style={styles.bottom}>
//          <Text style={styles.text}>You already posted for this week</Text>
//        </View>
//          } */}


//   )
// }

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
  text:{
    fontSize:20
  }
});


export default ChallengeScreen;
