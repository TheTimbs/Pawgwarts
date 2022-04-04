import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';

import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase-config';
import { getAuth } from 'firebase/auth';
import QuizResult from './QuizResult';
import colors from '../../config/colors';
import { useFonts } from 'expo-font';

// house constants
const gryffindog = 'GryffinDog';
const slobberin = 'Slobberin';
const ravenPaw = 'RavenPaw';
const hufflepup = 'HufflePup';

const allQuestions = [
  {
    question: 'Where is your dog when you get back from Pawgwarts?',
    options: [
      {
        answer: 'At the door to greet me like Doby the houseelf',
        house: gryffindog,
      },
      { answer: 'In their crate', house: slobberin },
      {
        answer: 'Watching his favorite show on the TV I left on for them',
        house: ravenPaw,
      },
      { answer: 'On the couch or bed', house: hufflepup },
    ],
  },
  {
    question: 'No Pawgwarts class today! What are you and your dog up to?',
    options: [
      { answer: 'A doggy play date', house: gryffindog },
      { answer: 'A long run', house: slobberin },
      { answer: 'A dog friendly festival or event', house: ravenPaw },
      { answer: 'Couch, snacks and a movie or two', house: hufflepup },
    ],
  },
  {
    question: 'What distracts your dog most on walks?',
    options: [
      { answer: 'Other dogs and people', house: gryffindog },
      { answer: 'My dog doesn’t get distracted', house: slobberin },
      { answer: 'SQUIRRELS!', house: ravenPaw },
      { answer: 'All the smells!', house: hufflepup },
    ],
  },
  {
    question:
      'When meeting new witches and wizards, which statement best describes your dog?',
    options: [
      {
        answer: 'They have never met a stranger, he loves everyone!',
        house: gryffindog,
      },
      {
        answer: 'They bark at them',
        house: slobberin,
      },
      {
        answer: 'They are timid at first, but warms up quickly',
        house: ravenPaw,
      },
      {
        answer: 'They avoid them at all costs',
        house: hufflepup,
      },
    ],
  },
  {
    question:
      'Which of these magical events would you most like to experience?',
    options: [
      { answer: 'The Triwizard Tournament', house: gryffindog },
      { answer: 'The Quidditch World Cup', house: slobberin },
      { answer: 'The Yule Ball', house: ravenPaw },
      { answer: 'Christmas at Hogwarts', house: hufflepup },
    ],
  },
  {
    question: 'Your dogs activity level is:',
    options: [
      {
        answer: 'Average',
        house: gryffindog,
      },
      {
        answer: 'HIGH',
        house: slobberin,
      },
      { answer: 'Low', house: ravenPaw },
      {
        answer: 'What activity?',
        house: hufflepup,
      },
    ],
  },
];

const PersonalityQuiz = () => {
  const [selectedHouse, setSelectedHouse] = useState('');
  const [questions, setQuestions] = useState();
  const [qNum, setQNum] = useState(0);
  const [options, setOptions] = useState([]);
  const [house, setHouse] = useState({
    GryffinDog: 0,
    Slobberin: 0,
    RavenPaw: 0,
    HufflePup: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const getQuiz = () => {
    setIsLoading(true);
    setQuestions(allQuestions);
    setOptions(allQuestions[0].options);
    setIsLoading(false);
  };

  useEffect(() => {
    getQuiz();
  }, []);

  const handlSelectedOption = (option) => {
    const selectedHouse = option.house;
    // console.log('house associated with selected answer: ', selectedHouse);

    let value = ++house[`${selectedHouse}`];
    // console.log(value);
    setHouse({ ...house, [`${selectedHouse}`]: value });
    // console.log('++ logging house ++', house);

    if (qNum !== 5) {
      setQNum(qNum + 1);
      setOptions(allQuestions[qNum + 1].options);
    }
    if (qNum === 5) {
      handleShowHouse();
    }
  };

  const handleShowHouse = async () => {
    let arr = Object.values(house);
    let max = Math.max(...arr);
    let selectedHouse = '';
    for (const [key, value] of Object.entries(house)) {
      if (value === max) {
        selectedHouse = key;
        setSelectedHouse(selectedHouse);
      }
    }
    const auth = getAuth();
    const currrentUser = auth.currentUser;
    const docRef = doc(db, 'users', currrentUser.uid);
    await updateDoc(docRef, { house: selectedHouse });

    console.log('your house is ', selectedHouse);
  };

  let [fontsLoaded] = useFonts({
    'Harry-Potter': require('../../assets/fonts/HarryPotter.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <ImageBackground
      blurRadius={3}
      style={styles.background}
      source={require('../../assets/BlueBackground.jpeg')}
    >
      <View style={styles.container}>
        {selectedHouse !== '' ? (
          <QuizResult house={selectedHouse} />
        ) : (
          // <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          //   <Text style={{ fontSize: 32, fontWeight: '700' }}>LOADING...</Text>
          // </View>
          questions && (
            <View style={styles.parent}>
              <View style={styles.top}>
                <Text style={styles.question}>
                  Answer the Following Questions to be placed in a house:{' '}
                </Text>
              </View>
              <View style={styles.top}>
                <Text style={styles.question}>
                  Q. {questions[qNum].question}
                </Text>
              </View>
              <View style={styles.options}>
                <TouchableOpacity
                  style={styles.optionButton}
                  onPress={() => handlSelectedOption(options[0])}
                >
                  <Text style={styles.option}>{options[0].answer}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.optionButton}
                  onPress={() => handlSelectedOption(options[1])}
                >
                  <Text style={styles.option}>{options[1].answer}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.optionButton}
                  onPress={() => handlSelectedOption(options[2])}
                >
                  <Text style={styles.option}>{options[2].answer}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.optionButton}
                  onPress={() => handlSelectedOption(options[3])}
                >
                  <Text style={styles.option}>{options[3].answer}</Text>
                </TouchableOpacity>
                {/* {selectedHouse !== "" ? <QuizResult house={selectedHouse} /> : <Text> {qNum + 1}/6 </Text>} */}
              </View>
              <View style={styles.bottom}>
                <Text style={styles.bottomText}> {qNum + 1}/6 </Text>
              </View>
            </View>
          )
        )}
      </View>
    </ImageBackground>
  );
};

export default PersonalityQuiz;

const styles = StyleSheet.create({
  container: {
    // paddingTop: 40,
    // paddingHorizontal: 20,
    height: '100%',
  },
  background: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
    paddingHorizontal: 20,
  },
  top: {
    marginVertical: 16,
    paddingTop: 80,
  },
  options: {
    marginVertical: 16,
    flex: 1,
  },
  bottom: {
    marginBottom: 12,
    paddingVertical: 16,
    flexDirection: 'column',
    alignItems: 'center',
  },
  bottomText: {
    color: 'white',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  question: {
    fontSize: 42,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Harry-Potter',
  },
  option: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
  },
  optionButton: {
    paddingVertical: 12,
    marginVertical: 6,
    backgroundColor: colors.purple,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  parent: {
    height: '100%',
  },
});
