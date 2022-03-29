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

const TrainingsScreen = ({ navigation, route }) => {
  const { year, trainingCategory } = route.params;
  const [trainingsList, setTrainingsList] = useState([]);
  const [userDetails, setUserDetails] = useState({});

  function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
      if (+match === 0) return '';
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
  }

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

  console.log('userDetails from the trainings screen', userDetails);

  return (
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
                year: 'firstYears',
                trainingCategory: trainingCategory,
                trainingTitle: camelize(training.title),
              }}
              //styling={trainingTextStylings.firstYearsText}
            />
          ))}
        </View>
        // <View style={styles.options}>
        //   {trainingsList.map((training) => (
        //     <TouchableOpacity
        //       key={training.title}
        //       style={styles.optionButton}
        //       onPress={() =>
        //         navigation.navigate('SingleTraining', {
        //           year: year,
        //           trainingCategory: trainingCategory,
        //           trainingTitle: camelize(training.title),
        //         })
        //       }
        //     >
        //       <Text style={styles.option}> {training.title} </Text>
        //     </TouchableOpacity>
        //   ))}
        // </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});
export default TrainingsScreen;
