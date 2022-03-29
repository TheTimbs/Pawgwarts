import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Button, Text, Image } from 'react-native';
import { ListItem, ListItemSeparator } from '../components/lists';
import colors from '../config/colors';
import Icon from '../components/Icon';
import Screen from '../components/Screen';
import { db, auth } from '../../firebase/firebase-config';
import { getDoc, collection, doc, getDocs } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

function MyTrainings() {
  const [user, setUser] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const getUserInfo = async () => {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUser(userSnap.data());
        } else {
          console.log('No such document');
        }
      };
      getUserInfo();
    });
    console.log('userprofilescreen');
    return unsubscribe;
  }, [navigation]);
  // console.log('usercompletedtraining', user.completedTrainings);
  // console.log('userpendingtrainings', user.trainingsInProgress);
  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        {user.dog ? (
          <View>
            <Text style={styles.header}>My Trainings</Text>
            <Text style={styles.text1}>Welcome, {user.dog.dogName}</Text>
            <Image
              source={{ uri: user.dog.image }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 100 / 2,
                alignSelf: 'center',
                marginVertical: 10,
              }}
            />
            <Text style={styles.header}>
              Completed Trainings: {user.completedTrainings.length}
            </Text>
            {user.completedTrainings.map((training, i) => (
              <View key={i}>
                <Text style={styles.text1}>{training}</Text>
              </View>
            ))}

            <Text style={styles.header}>
              Trainings in Progress: {user.trainingsInProgress.length}
            </Text>
            {user.trainingsInProgress.map((training, i) => (
              <View key={i}>
                <Text style={styles.text1}>{training}</Text>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.header}>loading...</Text>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'grey',
  },
  container: {
    marginVertical: 20,
  },
  header: {
    color: colors.primary,
    fontSize: 25,
    fontWeight: '800',
    paddingVertical: 9,
    alignSelf: 'center',
  },
  text1: {
    color: colors.gold,
    fontSize: 20,
    fontWeight: '500',
    paddingVertical: 3,
    alignSelf: 'center',
  },
});

export default MyTrainings;
