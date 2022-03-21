import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const allQuestions = [
  {
    question: "What’s your favorite color?",
    options: ["Red", "Green", "Blue", "Yellow"],
  },
  {
    question: "You're locked in a duel with a skilled opponent. They fire an unknown spell at you, and you shout…",
    options: ["Expelliarmus!", "Protego!", "Stupefy!", "Crucio!"],
  },
  {
    question: "Which of your skills are you most proud of?",
    options: ["My Ability to Absorb new Information", "My ability to make new friends", "My ability to get what I want", "My ability to keep secrets"],
  },
  {
    question: "What would you see in the Mirror of Erised?",
    options: ["Myself, surrounded by riches", "Myself, surrounded by my lovign family and friends", "Myself, knowledgable above all", "Myself, experiencign a marvellous adventure"],
  },
  {
    question: "Which of these magical events would you most like to experience?",
    options: ["The Triwizard Tournament", "The Quidditch World Cup", "The Yule Ball", "Christmas at Hogwarts"],
  }
]

const PersonalityQuiz = () => {
  const [questions, setQuestions] = useState();
  const [qNum, setQNum] = useState(0);
  const [options, setOptions] = useState([])
  const [house, setHouse] = useState({ GryffinDog: 0, Slobberin: 0, RavenPaw: 0, HufflePup: 0 })
  const [isLoading, setIsLoading] = useState(false)

  // const getQuiz = () => {
  //   setIsLoading(true)
  //   // const url = 'https://opentdb.com/api.php?amount=10&type=multiple&encode=url3986';
  //   // const res = await fetch(url);
  //   // const data = await res.json();
  //   setQuestions(allQuestions);
  //   setOptions(generateOptions(allQuestions[0]))
  //   setIsLoading(false)
  // };

  const getQuiz = () => {
    setIsLoading(true)
    setQuestions(allQuestions);
    setOptions(generateOptions(allQuestions[0]))
    setIsLoading(false)
  };

  useEffect(() => {
    getQuiz();
  }, []);

  const generateOptions = (_question) => {
    const options = [..._question.options]
    return options
  }

  const handlSelectedOption = (_option) => {
    const selectedHouse = "GryffinDog";
    setHouse(house[`${selectedHouse}`]++)
    if (qNum !== 4) {
      setQNum(qNum + 1)
      setOptions(generateOptions(questions[qNum + 1]))
    }
    if (qNum === 4) {
      handleShowHouse()
    }
  }

  const handleShowHouse = () => {
    return <Text> Your House is: </Text>
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
              <Text style={styles.option}>{(options[0])}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButtom} onPress={() => handlSelectedOption(options[1])}>
              <Text style={styles.option}>{(options[1])}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButtom} onPress={() => handlSelectedOption(options[2])}>
              <Text style={styles.option}>{(options[2])}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButtom} onPress={() => handlSelectedOption(options[3])}>
              <Text style={styles.option}>{(options[3])}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottom}>
            {/* <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>PREV</Text>
            </TouchableOpacity> */}

            {/* {qNum !== 4 && <TouchableOpacity style={styles.button} onPress={handleNextPress}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>} */}

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
