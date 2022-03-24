import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/firebase-config';
import { getDocs, collection, doc, getDoc } from 'firebase/firestore';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function yearsScreen(props) {
  return (<View style={styles.container}>
    <View style={styles.options}>
      {props.categories.map(category => (<TouchableOpacity key={category.title} style={styles.optionButton}>
        <Text style={styles.option}> {category.title} </Text>
      </TouchableOpacity>))}
    </View>
  </View>)
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
export default yearsScreen;