import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase/firebase-config';
import { getDocs, collection, doc, getDoc } from 'firebase/firestore';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import TrainingCard from '../../components/TrainingCard';
import TrainingCardCategories from '../../components/TrainingCardCategories';

function TrainingCategoriesScreen({ navigation, route }) {
  const year = route.params.year;
  const [trainingCategories, setTrainingCategories] = useState([]);

  // o: export into utility function since its being used in multiple places
  function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
      if (+match === 0) return '';
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
  }

  // o: consider moving into useEffect
  const getTrainingCategories = async (trainingYear) => {
    const yearCollectionRef = collection(db, trainingYear);
    const data = await getDocs(yearCollectionRef);
    const mappedData = data.docs.map((doc) => ({
      ...doc.data(),
    }));
    setTrainingCategories(mappedData);
  };
  useEffect(() => {
    getTrainingCategories(year);
  }, []);

  return (
    <View style={styles.container}>
      {trainingCategories.length === 0 ? (
        <Text> Loading... </Text>
      ) : (
        <View style={styles.options}>
          {trainingCategories.map((category) => (
            <TrainingCardCategories
              key={category.title}
              navigation={navigation}
              navTarget={'Trainings'}
              imgSource={category.image}
              title={category.title}
              dbYear={{
                year: year,
                trainingCategory: camelize(category.title),
              }}
              // o: remove if not used
            //styling={trainingTextStylings.firstYearsText}
            />
          ))}
        </View>
        // o: remove if not used
        // <View style={styles.options}>
        //   {trainingCategories.map((category) => (
        //     <TouchableOpacity
        //       key={category.title}
        //       style={styles.optionButton}
        //       onPress={() =>
        //         navigation.navigate('Trainings', {
        //           year: year,
        //           trainingCategory: camelize(category.title),
        //         })
        //       }
        //     >
        //       <Text style={styles.option}> {category.title} </Text>
        //     </TouchableOpacity>
        //   ))}
        // </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});
export default TrainingCategoriesScreen;
