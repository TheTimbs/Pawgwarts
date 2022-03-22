import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { doc, setDoc, updateDoc } from 'firebase/firestore'

import { db } from '../../firebase/firebase-config'

import { getAuth } from 'firebase/auth'

// house constants
const gryffindog = "GryffinDog"
const sloberin = "Sloberin"
const ravenPaw = "RavenPaw"
const hufflepup = "HufflePup"

const allQuestions = [
  {
    question: "What’s your favorite color?",
    options: [{ answer: "Red", house: gryffindog }, { answer: "Green", house: sloberin }, { answer: "Blue", house: ravenPaw }, { answer: "Yellow", house: hufflepup }],
  },
  {
    question: "You're locked in a duel with a skilled opponent. They fire an unknown spell at you, and you shout…",
    options: [{ answer: "Expelliarmus!", house: gryffindog }, { answer: "Protego!", house: sloberin }, { answer: "Stupefy!", house: ravenPaw }, { answer: "Crucio!", house: hufflepup }],
  },
  {
    question: "Which of your skills are you most proud of?",
    options: [{ answer: "My Ability to Absorb new Information", house: gryffindog }, { answer: "My ability to make new friends", house: sloberin }, { answer: "My ability to get what I want", house: ravenPaw }, { answer: "My ability to keep secrets", house: hufflepup }],
  },
  {
    question: "What would you see in the Mirror of Erised?",
    options: [{ answer: "Myself, surrounded by riches", house: gryffindog }, { answer: "Myself, surrounded by my lovign family and friends", house: sloberin }, { answer: "Myself, knowledgable above all", house: ravenPaw }, { answer: "Myself, experiencign a marvellous adventure", house: hufflepup }],
  },
  {
    question: "Which of these magical events would you most like to experience?",
    options: [{ answer: "The Triwizard Tournament", house: gryffindog }, { answer: "The Quidditch World Cup", house: sloberin }, { answer: "The Yule Ball", house: ravenPaw }, { answer: "Christmas at Hogwarts", house: hufflepup }],
  }
]

const PersonalityQuiz = () => {
  const [questions, setQuestions] = useState();
  const [qNum, setQNum] = useState(0);
  const [options, setOptions] = useState([])
  const [house, setHouse] = useState({ GryffinDog: 0, Sloberin: 0, RavenPaw: 0, HufflePup: 0 })
  const [isLoading, setIsLoading] = useState(false)

  const getQuiz = () => {
    setIsLoading(true)
    setQuestions(allQuestions);
    setOptions(allQuestions[0].options)
    setIsLoading(false)
  };

  useEffect(() => {
    getQuiz();
  }, []);

  const handlSelectedOption = (option) => {
    const selectedHouse = option.house;
    console.log("house associated with selected answer: ", selectedHouse)

    let value = ++house[`${selectedHouse}`]
    console.log(value)
    setHouse({ ...house, [`${selectedHouse}`]: value })
    console.log("++ logging house ++", house)

    if (qNum !== 4) {
      setQNum(qNum + 1)
      setOptions(allQuestions[qNum + 1].options)
    }
    // if (qNum === 4) {
    //   handleShowHouse()
    // }
  }

  const handleShowHouse = async () => {
    let arr = Object.values(house);
    let max = Math.max(...arr);
    let selectedHouse = ''
    for (const [key, value] of Object.entries(house)) {
      if (value === max) {
        selectedHouse = key;
      }
    }
    const auth = getAuth()
    const currrentUser = auth.currentUser
    const docRef = doc(db, "users", currrentUser.uid)
    await updateDoc(docRef, { house: selectedHouse })

    console.log("your house is ", selectedHouse)
  }

  return (
    <View style={styles.container}>
      {isLoading ? <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Text style={{ fontSize: 32, fontWeight: '700' }}>LOADING...</Text>
      </View> : questions && (
        <View style={styles.parent}>
          <View style={styles.top}>
            <Text style={styles.question}>Q. {(questions[qNum].question)}</Text>
          </View>
          <View style={styles.options}>

            <TouchableOpacity style={styles.optionButtom} onPress={() => handlSelectedOption(options[0])}>
              <Text style={styles.option}>{(options[0].answer)}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButtom} onPress={() => handlSelectedOption(options[1])}>
              <Text style={styles.option}>{(options[1].answer)}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButtom} onPress={() => handlSelectedOption(options[2])}>
              <Text style={styles.option}>{(options[2].answer)}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButtom} onPress={() => handlSelectedOption(options[3])}>
              <Text style={styles.option}>{(options[3].answer)}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottom}>
            {qNum === 4 && <TouchableOpacity style={styles.button} onPress={handleShowHouse}>
              <Text style={styles.buttonText}> Show My House </Text>
            </TouchableOpacity>}
          </View>
        </View>
      )}
    </View>
  );
};

export default PersonalityQuiz;

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 20,
    height: '100%',
  },
  top: {
    marginVertical: 16,
  },
  options: {
    marginVertical: 16,
    flex: 1,
  },
  bottom: {
    marginBottom: 12,
    paddingVertical: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#1A759F',
    padding: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  question: {
    fontSize: 28,
  },
  option: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
  },
  optionButtom: {
    paddingVertical: 12,
    marginVertical: 6,
    backgroundColor: '#34A0A4',
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  parent: {
    height: '100%',
  },
});
