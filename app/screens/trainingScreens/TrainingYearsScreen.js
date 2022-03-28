import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TrainingCard from '../../components/TrainingCard';
import colors from '../../config/colors';

const TrainingYearsScreen = ({ navigation }) => {
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
  return (
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
      />
      <TrainingCard
        navigation={navigation}
        navTarget={'TrainingCategories'}
        imgSource={schoolYearImages.thirdYears}
        title={'Third Years'}
        dbYear={{ year: 'thirdYears' }}
        styling={trainingTextStylings.thirdYearsText}
      />
    </View>
  );
};

export default TrainingYearsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingTop: 40,
    //paddingHorizontal: 20,
    //height: '100%',
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
    flexDirection: 'column',
    alignItems: 'center',
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
  optionButton: {
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
