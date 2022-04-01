import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase/firebase-config';
import {
  getDocs,
  collection,
  doc,
  getDoc,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import * as Linking from 'expo-linking';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  ScrollView,
  Button,
  useColorScheme,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../config/colors';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Colors } from 'react-native/Libraries/NewAppScreen';

function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
    if (+match === 0) return '';
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
}

function SingleTrainingScreen({ navigation, route }) {
  const { year, trainingCategory, userDetails, title } = route.params;
  const titleCamelCased = camelize(title);
  const usersCompletedTrainings = [];
  const usersTrainingsInProgress = [];
  userDetails.completedTrainings.forEach((training) =>
    usersCompletedTrainings.push(training.title)
  );
  userDetails.trainingsInProgress.forEach((training) =>
    usersTrainingsInProgress.push(training.title)
  );

  const [trainingDetails, setTrainingDetails] = useState({});
  const [trainingCompleted, setTrainingCompleted] = useState(false);
  const [trainingInProgress, setTrainingInProgress] = useState(false);
  const [startTraining, setStartTraining] = useState(false);

  // Dummy Training Data:
  const loremIpsum =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua';
  const steps = [
    'Lorem ipsum dolor sit amet',
    'consectetur adipiscing elit',
    'sed do eiusmod tempor incididunt',
  ];
  const tips = ["Don't give up", 'You got this!'];
  const tools = ['Lorem', 'ipsum', 'dolor'];

  const getSingleTraining = async (year, trainingCategory, titleCamelCased) => {
    const trainingDocRef = doc(
      db,
      year,
      trainingCategory,
      'trainings',
      titleCamelCased
    );
    const docSnap = await getDoc(trainingDocRef);
    const trainingData = docSnap.data();
    setTrainingDetails(trainingData);
    console.log('My Training details', trainingDetails);
  };

  const setStateVariables = () => {
    if (usersCompletedTrainings.includes(title)) {
      setTrainingCompleted(true);
    } else if (usersTrainingsInProgress.includes(title)) {
      setTrainingInProgress(true);
    } else {
      setStartTraining(true);
    }
  };

  useEffect(() => {
    getSingleTraining(year, trainingCategory, titleCamelCased);
    setStateVariables();
  }, []);

  // runs when clicked Start Training Button
  const handleStartTraining = async () => {
    setStartTraining(false);
    setTrainingInProgress(true);

    const auth = getAuth();
    const userId = auth.currentUser.uid;
    const docRef = doc(db, 'users', userId);
    const trainingInProgressObj = {
      title: title,
      year: year,
      category: trainingCategory,
    };
    await updateDoc(docRef, {
      trainingsInProgress: arrayUnion(trainingInProgressObj),
    });
  };

  // runs when clicked Mark Completed Button
  const handleMarkCompleted = async () => {
    setStartTraining(false);
    setTrainingCompleted(true);

    const auth = getAuth();
    const userId = auth.currentUser.uid;
    const docRef = doc(db, 'users', userId);

    const trainingObj = {
      title: title,
      year: year,
      category: trainingCategory,
    };
    await updateDoc(docRef, { completedTrainings: arrayUnion(trainingObj) });
    await updateDoc(docRef, { trainingsInProgress: arrayRemove(trainingObj) });
  };

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

  return Object.keys(trainingDetails).length === 0 ? (
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
              <View style={styles.bottom}>
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
              </View>
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
  );
}

const styles = StyleSheet.create({
  bodyText: {
    fontSize: 18,
    flexWrap: 'wrap',
    flex: 1,
    padding: 15,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: colors.houseYellow,
    width: '50%',
    alignSelf: 'center',
    borderRadius: 10,
  },
  descriptionText: {
    fontSize: 18,
    padding: 15,
    color: colors.white,
  },
  logo: {
    width: '100%',
    height: 250,
  },
  logoContainer: {
    flex: 1,
  },
  stepsTitle: {
    textAlign: 'center',
    paddingTop: 5,
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 15,
  },
  stepNumIcon: {
    marginLeft: 20,
    backgroundColor: colors.houseBlue,
    borderRadius: 50,
    width: 30,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: 15,
  },
  stepNumIconText: {
    fontSize: 18,
    alignSelf: 'center',
    color: colors.white,
  },
  stepsText: {
    fontSize: 18,
    flexWrap: 'wrap',
    flex: 1,
    paddingRight: 15,
  },
  stepsView: {
    flexDirection: 'row',
    paddingBottom: 20,
    marginTop: 20,
  },
  tipsView: {
    backgroundColor: colors.houseBlue,
  },
  tipsText: {
    color: colors.white,
    fontSize: 18,
    flexWrap: 'wrap',
    flex: 1,
    padding: 10,
    marginRight: 10,
    marginLeft: 10,
  },
  tipTitle: {
    textAlign: 'center',
    paddingTop: 5,
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 5,
    color: colors.white,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  topText: {
    fontSize: 25,
    alignSelf: 'center',
    color: colors.white,
  },
  toolsContainer: {
    marginLeft: 5,
    height: 250,
    width: 200,
  },
  trainingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  trainingDescriptionContainer: {
    padding: 5,
    backgroundColor: colors.houseBlue,
  },
});

export default SingleTrainingScreen;
