import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase/firebase-config';
import { getDocs, collection, doc, getDoc } from 'firebase/firestore';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TrainingCardCategories from '../../components/TrainingCardCategories';
import { ScrollView } from 'react-native-gesture-handler';
import {camelize} from '../../functions'

function TrainingCategoriesScreen({ navigation, route }) {
  const year = route.params.year;
  const [trainingCategories, setTrainingCategories] = useState([]);

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
    <ScrollView>
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
              />
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});
export default TrainingCategoriesScreen;
