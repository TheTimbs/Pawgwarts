import { ImageBackground, StyleSheet, View, Image, Text } from 'react-native';
import React from 'react';
import { db, auth } from '../../firebase/firebase-config';
import { getDoc, collection, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import colors from '../config/colors';

function Home(props) {
  const userId = auth.currentUser.uid;
  const currentUser = doc(db, 'users', userId);
  const gRef = doc(db, 'houses ', 'GryffinDog');
  const hRef = doc(db, 'houses ', 'HufflePup');
  const rRef = doc(db, 'houses ', 'RavenPaw');
  const sRef = doc(db, 'houses ', 'Slobberin');
  const [points, setPoints] = useState([]);
  const [user, setUser] = useState({});
  const [randomDogFact, setRandomDogFact] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getPoints();
      getUser();
      getRandomFact();
    });
    return unsubscribe;
  }, [navigation]);

  const getUser = async () => {
    const userData = await getDoc(currentUser);
    setUser(userData.data());
  };

  const getPoints = async () => {
    const dataG = await getDoc(gRef);
    const dataH = await getDoc(hRef);
    const dataR = await getDoc(rRef);
    const dataS = await getDoc(sRef);
    setPoints([
      dataG.data().points,
      dataH.data().points,
      dataR.data().points,
      dataS.data().points,
    ]);
  };

  const getRandomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const getRandomFact = async () => {
    const docRef = doc(db, 'dogFacts', 'allFacts');
    const docSnap = await getDoc(docRef);
    const allFacts = docSnap.data().facts;
    const randomFact = allFacts[getRandomNum(0, allFacts.length - 1)];
    setRandomDogFact(randomFact);
  };


  let [fontsLoaded] = useFonts({
    'Harry-Potter': require('../assets/fonts/HarryPotter.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }

  if (!user.dog) {
    return <Text>loading..</Text>;
  } else {
    return (
      <ImageBackground
        blurRadius={3}
        style={styles.container}
        source={require('../assets/BlueBackground.jpeg')}
      >
        <View style={styles.top}>
          <Text style={styles.WelcomeHeader}>
            Welcome, {user.name} and {user.dog.dogName}!
          </Text>

          <View style={styles.dogFactContainer}>
            <Text style={styles.dogFactHeaderText}>
              {' '}
              DumbleDog's Random Dog Fact{' '}
            </Text>
            <Text style={styles.dogFactText}> {randomDogFact}</Text>
          </View>

          <View style={styles.trainings}>
            <Text style={styles.trainingsHeaderText}>
              {user.dog.dogName}'s Trainings in Progress:
            </Text>
            {user.trainingsInProgress.map((training) => (
              <Text
                key={user.trainingsInProgress.indexOf(training)}
                style={styles.trainingsText}
                onPress={() =>
                  navigation.navigate('SingleTraining', {
                    year: training.year,
                    trainingCategory: training.category,
                    title: training.title,
                    userDetails: user,
                  })
                }
              >
                {' '}
                {training.title}{' '}
              </Text>
            ))}
          </View>
        </View>
        <View style={styles.center}>
          <Text style={styles.textHeader}>Houses Current Points</Text>
        </View>

        <View style={styles.bottom}>
          <View style={styles.box}>
            <Image
              style={styles.houseImages}
              source={require('../assets/hufflepuffportrait.jpg')}
            />
            <Text style={styles.text}>HufflePup: {points[0]}</Text>
          </View>
          <View style={styles.box}>
            <Image
              style={styles.houseImages}
              source={require('../assets/ravenclawportrait.jpg')}
            />
            <Text style={styles.text}>RavenPaw: {points[1]}</Text>
          </View>
          <View style={styles.box}>
            <Image
              style={styles.houseImages}
              source={require('../assets/slytherinportrait.jpg')}
            />
            <Text style={styles.text}>Slobberin: {points[2]}</Text>
          </View>
          <View style={styles.box}>
            <Image
              style={styles.houseImages}
              source={require('../assets/gryffindorportrait.jpg')}
            />
            <Text style={styles.text}>GryffinDog: {points[3]}</Text>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#587B7F',
  },
  top: {
    marginTop: 65,
    height: '45%',
    alignItems: 'center',
  },
  WelcomeHeader: {
    fontSize: 45,
    color: colors.gold,
    marginBottom: 6,
    paddingTop: 6,
    fontFamily: 'Harry-Potter',
    textAlign: 'center',
  },
  dogFactContainer: {
    backgroundColor: '#871419',
    borderRadius: 15,
    padding: 8,
    paddingBottom: 6,
    marginBottom: 6,
    width: '85%',
  },
  dogFactHeaderText: {
    color: colors.gold,
    textAlign: 'center',
    fontSize: 34,
    fontFamily: 'Harry-Potter',
  },
  dogFactText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  trainings: {
    marginTop: 5,
    width: '85%',
    backgroundColor: colors.gold,
    borderRadius: 15,
    paddingBottom: 5,
  },
  trainingsHeaderText: {
    fontSize: 34,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingBottom: 5,
    paddingTop: 10,
    fontFamily: 'Harry-Potter',
    color: '#871419',
  },
  trainingsText: {
    fontSize: 15,
    textAlign: 'center',
    color: 'black',
    textDecorationLine: 'underline',
  },
  bottom: {
    height: '42%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#0D1321',
  },
  center: {
    height: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0D1321',
  },
  box: {
    width: '50%',
    height: '50%',
  },
  houseImages: {
    flex: 1,
    width: '100%',
    height: '100%',
    left: '5%',
    borderRadius: 10,
  },
  text: {
    fontSize: 23,
    color: colors.gold,
    textAlign: 'center',
    fontFamily: 'Harry-Potter',
  },
  background: {
    height: '100%',
  },
  textHeader: {
    fontSize: 36,
    color: colors.gold,
    fontFamily: 'Harry-Potter',
  },
  text2: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
  },
});

export default Home;
