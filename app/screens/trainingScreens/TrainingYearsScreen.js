import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { db } from '../../../firebase/firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import TrainingCard from '../../components/TrainingCard';
import colors from '../../config/colors';

const TrainingYearsScreen = ({ navigation }) => {
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const getUserDetails = async () => {
      const auth = getAuth();
      const userId = auth.currentUser.uid;
      const docRef = doc(db, 'users', userId);
      const userDoc = await getDoc(docRef);
      const userDetails = userDoc.data();
      setUserDetails(userDetails);
    };
    getUserDetails();
  }, []);

  const schoolYearImages = {
    firstYears: require('../../assets/GermanShepPuppy.webp'),
    secondYears: require('../../assets/GermanTeen.jpeg'),
    thirdYears: require('../../assets/GermanAdult.jpeg'),
  };
  const trainingTextStylings = {
    firstYearsText: {
      color: colors.white,
      fontWeight: 'bold',
      fontSize: 60,
      opacity: 1,
      position: 'absolute',
      top: '10%',
      left: '28%',
      fontFamily: 'Harry-Potter',
    },
    secondYearsText: {
      color: colors.white,
      fontWeight: 'bold',
      fontSize: 60,
      opacity: 1,
      position: 'absolute',
      top: '40%',
      left: '25%',
      fontFamily: 'Harry-Potter',
    },
    thirdYearsText: {
      color: colors.white,
      fontWeight: 'bold',
      fontSize: 60,
      opacity: 1,
      position: 'absolute',
      top: '70%',
      left: '25%',
      fontFamily: 'Harry-Potter',
    },
  };

  if (userDetails.completedTrainings) {
  return (
    <ScrollView>
      <View style={styles.container}>
        <TrainingCard
          navigation={navigation}
          navTarget={'TrainingCategories'}
          imgSource={schoolYearImages.firstYears}
          title={'First Years'}
          dbYear={{ year: 'firstYears' }}
          styling={trainingTextStylings.firstYearsText}
        />
        <TrainingCard
          navigation={navigation}
          navTarget={'TrainingCategories'}
          imgSource={schoolYearImages.secondYears}
          title={'Second Years'}
          dbYear={{ year: 'secondYears' }}
          styling={trainingTextStylings.secondYearsText}
          preReqsMet={userDetails.completedTrainings.length >= 3 ? true : false}
          alertMessage={`Please Complete ${
            3 - userDetails.completedTrainings.length
          } more trainings from First Year`}
        />
        <TrainingCard
          navigation={navigation}
          navTarget={'TrainingCategories'}
          imgSource={schoolYearImages.thirdYears}
          title={'Third Years'}
          dbYear={{ year: 'thirdYears' }}
          styling={trainingTextStylings.thirdYearsText}
          preReqsMet={userDetails.completedTrainings.length > 7 ? true : false}
          alertMessage={
            'Please Complete more trainings from previous years to proceed'
          }
        />
      </View>
    </ScrollView>
    );
  } else {
    return <Text>Loading...</Text>;
  }
};

export default TrainingYearsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
