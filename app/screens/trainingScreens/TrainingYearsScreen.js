import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const TrainingYearsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('TrainingCategories', { year: 'firstYears' })}>
        <Text style={styles.option}> First Year  </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('TrainingCategories', { year: 'secondYears' })}>
        <Text style={styles.option}> Second Year </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('TrainingCategories', { year: 'thirdYears' })}>
        <Text style={styles.option}> Third Year </Text>
      </TouchableOpacity>
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