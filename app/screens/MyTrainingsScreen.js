import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Button,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { ListItem, ListItemSeparator } from '../components/lists';
import colors from '../config/colors';
import Icon from '../components/Icon';
import Screen from '../components/Screen';
import { db, auth } from '../../firebase/firebase-config';
import { getDoc, collection, doc, getDocs } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';

function MyTrainings() {
  const [user, setUser] = useState({});
  const navigation = useNavigation();

  const getUser = async () => {
    const userId = auth.currentUser.uid;
    const currentUser = doc(db, 'users', userId);
    const userData = await getDoc(currentUser);
    setUser(userData.data());
  };
  useEffect(() => {
    console.log('!!! useeffect from Home.js ran !!!');
    const unsubscribe = navigation.addListener('focus', () => {
      getUser();
    });
    console.log('// [MyTraininsScreen/useEffect()] - user: ', user);
    return unsubscribe;
  }, [navigation]);

  console.log(
    '// [MyTrainingsScreen] - user.completedTrainings',
    user.completedTrainings
  );

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
        style={styles.background}
        source={require('../assets/BlueBackground.jpeg')}
      >
        <Text style={styles.WelcomeHeader}>Welcome, {user.name}! </Text>

        <View style={styles.trainings}>
          <Text style={styles.trainingsHeaderText}>
            {user.dog.dogName}'s Completed Trainings:
          </Text>
          {user.completedTrainings.map((training) => (
            <Text
              key={user.completedTrainings.indexOf(training)}
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
          <Text style={styles.totalTrainings}>
            {' '}
            Total: {user.completedTrainings.length}
          </Text>
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
          <Text style={styles.totalTrainings}>
            {' '}
            Total: {user.trainingsInProgress.length}
          </Text>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    height: '100%',
    alignItems: 'center',
    flex: 1,
  },
  WelcomeHeader: {
    fontSize: 40,
    color: colors.gold,
    marginBottom: 6,
    paddingTop: 30,
    paddingBottom: 10,
    fontFamily: 'Harry-Potter',
  },
  trainings: {
    marginTop: 5,
    marginBottom: 10,
    width: '85%',
    backgroundColor: '#871419',
    borderRadius: 15,
    paddingBottom: 5,
    padding: 5,
  },
  trainingsHeaderText: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingBottom: 5,
    paddingTop: 10,
    color: colors.gold,
    fontFamily: 'Harry-Potter',
  },
  trainingsText: {
    fontSize: 15,
    textAlign: 'center',
    color: 'black',
    textDecorationLine: 'underline',
  },
  totalTrainings: {
    paddingTop: 5,
    color: 'white',
    textAlign: 'center',
  },
});

export default MyTrainings;
