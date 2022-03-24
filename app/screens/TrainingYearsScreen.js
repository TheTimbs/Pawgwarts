import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { db } from '../../firebase/firebase-config';
import { getDocs, collection, doc } from 'firebase/firestore';

import YearsScreen from './YearsScreen'

const TrainingYearsScreen = () => {
  const [yearCategories, setYearCategories] = useState([]);
  console.log("+++ logging yearCategories.length +++", yearCategories.length);

  const getYearCategories = async (year) => {
    const yearCollectionRef = collection(db, year);
    const data = await getDocs(yearCollectionRef);
    const mappedData = data.docs.map((doc) => ({
      ...doc.data()
    }));
    console.log(`+++ ${year} categories +++`, mappedData);
    setYearCategories(mappedData);
    console.log("+++ yearCatorgies state variable.length+++", yearCategories.length)
  }



  return (
    <View style={styles.container}>
      {yearCategories.length !== 0 ? <YearsScreen categories={yearCategories} /> : <View style={styles.options}>
        <TouchableOpacity style={styles.optionButton} onPress={() => getYearCategories("firstYears")}>
          <Text style={styles.option}> First Year </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton} onPress={() => getYearCategories("secondYears")}>
          <Text style={styles.option}> Second Year </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton} onPress={() => getYearCategories("thirdYears")}>
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