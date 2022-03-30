import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Button,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { ListItem, ListItemSeparator } from '../components/lists';
import colors from '../config/colors';
import Icon from '../components/Icon';
import Screen from '../components/Screen';
import { db, auth } from '../../firebase/firebase-config';
import { getDoc, collection, doc, getDocs } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

function MyTrainings() {
  const [user, setUser] = useState({});
  const navigation = useNavigation();


  const getUser = async () => {
    const userId = auth.currentUser.uid;
    const currentUser = doc(db, 'users', userId);
    const userData = await getDoc(currentUser);
    setUser(userData.data());
  }
  useEffect(() => {
    console.log("!!! useeffect from Home.js ran !!!")
    const unsubscribe = navigation.addListener('focus', () => {
      getUser();
    })
    console.log("// [MyTraininsScreen/useEffect()] - user: ", user)
    return unsubscribe;
  }, [navigation])

  console.log('// [MyTrainingsScreen] - user.completedTrainings', user.completedTrainings);

  if (!user.dog) {
    return (
      <Text>loading..</Text>
    )
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.WelcomeHeader}>Welcome, {user.name}! </Text>

        <View style={styles.trainings}>
          <Text style={styles.trainingsHeaderText}>{user.dog.dogName}'s Completed Trainings:</Text>
          {user.completedTrainings.map(training => (
            <Text key={user.completedTrainings.indexOf(training)} style={styles.trainingsText}
            > {training} </Text>))}
          <Text style={styles.totalTrainings}> Total: {user.trainingsInProgress.length}</Text>
        </View>

        <View style={styles.trainings}>
          <Text style={styles.trainingsHeaderText}>{user.dog.dogName}'s Trainings in Progress:</Text>
          {user.trainingsInProgress.map(training => (
            <Text key={user.trainingsInProgress.indexOf(training)} style={styles.trainingsText}
              onPress={() =>
                navigation.navigate('SingleTraining', {
                  year: training.year,
                  trainingCategory: training.category,
                  title: training.title,
                  userDetails: user,
                })}
            > {training.title} </Text>))}
          <Text style={styles.totalTrainings}> Total: {user.trainingsInProgress.length}</Text>

        </View>
      </View>

    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#587B7F',
    alignItems: 'center',
  },
  WelcomeHeader: {
    fontSize: 30,
    color: "white",
    marginBottom: 6,
    paddingTop: 6,
  },
  trainings: {
    marginTop: 5,
    width: '85%',
    backgroundColor: '#76b5c5',
    borderRadius: 15,
    paddingBottom: 5,
  },
  trainingsHeaderText: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingBottom: 5,
    paddingTop: 10,
  },
  trainingsText: {
    fontSize: 15,
    textAlign: 'center',
    color: 'blue',
  },
  totalTrainings: {
    paddingTop: 5,
    textAlign: 'center'
  }
});

export default MyTrainings;
