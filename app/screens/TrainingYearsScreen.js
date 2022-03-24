import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { db } from '../../firebase/firebase-config';
import { getDocs, collection, doc } from 'firebase/firestore';

import TrainingCategoriesScreen from './TrainingCategoriesScreen'

const TrainingYearsScreen = () => {
  const [trainingCategories, setTrainingCategories] = useState([]);
  const [year, setYear] = useState("")

  const getTrainingCategories = async (year) => {
    const yearCollectionRef = collection(db, year);
    const data = await getDocs(yearCollectionRef);
    const mappedData = data.docs.map((doc) => ({
      ...doc.data()
    }));
    console.log(`+++ ${year} categories +++`, mappedData);
    setTrainingCategories(mappedData);
    setYear(year);
    console.log("+++ yearCatorgies state variable.length+++", trainingCategories.length)
  }

  return (
    <View style={styles.container}>
      {trainingCategories.length !== 0 ? <TrainingCategoriesScreen categories={trainingCategories} year={year} /> : <View style={styles.options}>
        <TouchableOpacity style={styles.optionButton} onPress={() => getTrainingCategories("firstYears")}>
          <Text style={styles.option}> First Year </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton} onPress={() => getTrainingCategories("secondYears")}>
          <Text style={styles.option}> Second Year </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton} onPress={() => getTrainingCategories("thirdYears")}>
          <Text style={styles.option}> Third Year </Text>
        </TouchableOpacity>
      </View>}
    </View>
  );
};

export default TrainingYearsScreen;



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
    flexDirection: 'column',
    alignItems: 'center'
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