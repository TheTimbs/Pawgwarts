import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/firebase-config';
import { getDocs, collection, doc, getDoc } from 'firebase/firestore';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function TrainingScreen() {
  return (
    <Text> Training will be displayed here </Text>
  )
}

export default TrainingScreen;