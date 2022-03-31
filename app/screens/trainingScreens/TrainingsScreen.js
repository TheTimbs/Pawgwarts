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
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TrainingCardCategories from '../../components/TrainingCardCategories';
import { ScrollView } from 'react-native-gesture-handler';

const TrainingsScreen = ({ navigation, route }) => {
  const { year, trainingCategory } = route.params;
  const [trainingsList, setTrainingsList] = useState([]);
  const [userDetails, setUserDetails] = useState({});

  const getTrainingsList = async (year, trainingCategory) => {
    const trainingCollectionRef = collection(
      db,
      year,
      trainingCategory,
      'trainings'
    );
    const trainingDocsRef = await getDocs(trainingCollectionRef);
    const trainings = trainingDocsRef.docs.map((doc) => ({ ...doc.data() }));
    setTrainingsList(trainings);
  };

  const getUserDetails = async () => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    const docRef = doc(db, 'users', userId);
    const userDoc = await getDoc(docRef);
    const userDetails = userDoc.data();
    setUserDetails(userDetails);
  };

  useEffect(() => {
    getUserDetails();
    getTrainingsList(year, trainingCategory);
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        {trainingsList.length === 0 ? (
          <Text> Loading... </Text>
        ) : (
          <View style={styles.options}>
            {trainingsList.map((training) => (
              <TrainingCardCategories
                key={training.title}
                navigation={navigation}
                navTarget={'SingleTraining'}
                imgSource={training.images[0]}
                title={training.title}
                dbYear={{
                  year: year,
                  trainingCategory: trainingCategory,
                  userDetails: userDetails,
                  title: training.title,
                }}
              />
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});
export default TrainingsScreen;
