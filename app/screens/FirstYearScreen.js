import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/firebase-config';
import { getDocs, collection, doc } from 'firebase/firestore';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function FirstYearScreen() {
  const [tricks, setTricks] = useState([]);
  const yearOneCollectionRef = collection(db, 'year1');

  useEffect(() => {
    const getTricks = async () => {
      const data = await getDocs(yearOneCollectionRef);
      const mappedData = data.docs.map((doc) => ({
        ...doc.data()
      }));
      console.log("+++ year one mapped data +++", mappedData);
      setTricks(mappedData);
      console.log("+++ year 1 tricks +++ ", mappedData)
    };
    getTricks();
  }, []);

  return (
    <Text> First Year Trick Categories </Text>
  )

}

export default FirstYearScreen;