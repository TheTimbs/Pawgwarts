import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase/firebase-config';
import { getDocs, collection, doc, getDoc } from 'firebase/firestore';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function TrainingCategoriesScreen({ navigation, route }) {
  const year = route.params.year
  const [trainingCategories, setTrainingCategories] = useState([]);

  function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
      if (+match === 0) return "";
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
  }

  const getTrainingCategories = async (trainingYear) => {
    const yearCollectionRef = collection(db, trainingYear);
    const data = await getDocs(yearCollectionRef);
    const mappedData = data.docs.map((doc) => ({
      ...doc.data()
    }));
    setTrainingCategories(mappedData);
  }
  useEffect(() => { getTrainingCategories(year) }, []);


  return (
    <View style={styles.container}>
      {trainingCategories.length === 0 ? <Text> Loading... </Text> :
        <View style={styles.options}>
          {trainingCategories.map(category => (<TouchableOpacity key={category.title} style={styles.optionButton} onPress={() => navigation.navigate('Trainings', { year: year, trainingCategory: camelize(category.title) })}>
            <Text style={styles.option}> {category.title} </Text>
          </TouchableOpacity>))}
        </View>
      }
    </View>
  )
}

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
export default TrainingCategoriesScreen;