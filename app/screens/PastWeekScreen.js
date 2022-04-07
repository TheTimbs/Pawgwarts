import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/firebase-config';
import {
  doc,
  getDoc,
} from 'firebase/firestore';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import PastWeekCard from '../components/PastWeekCard';
import colors from '../config/colors';

function PastWeekScreen({ navigation }) {
  const [dates, setDates] = useState([]);

  async function getPastWeekDates() {
    const dayCollectionRef = doc(db, 'challenge', 'date');
    const data = await getDoc(dayCollectionRef);
    setDates(data.data().date);
  }
  useEffect(() => {
    getPastWeekDates();
  }, []);
  if (dates.length === 0) {
    return <Text>loading...</Text>;
  } else {
    return (
      <View style={styles.screen}>
        <ScrollView>
          {dates.map((date) => (
            <PastWeekCard title={date} key={date} navigation={navigation} />
          ))}
        </ScrollView>
      </View>
    );
  }
}

export default PastWeekScreen;
const styles = StyleSheet.create({
  screen: {
    paddingTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    flex: 1,
    height: '100%',
  },
});
