import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import Card from '../components/Card';
import colors from '../config/colors';
import Screen from '../components/Screen';

const listings = [
  {
    id: 1,
    title: 'First years',
    price: 'Everyone has to start somewhere',
    image: require('../assets/GermanShepPuppy.webp'),
  },
  {
    id: 2,
    title: 'Second years',
    price: 'Ready for the next level?',
    image: require('../assets/GermanTeen.jpeg'),
  },
  {
    id: 3,
    title: 'Third years',
    price: "Let's get serious!",
    image: require('../assets/GermanAdult.jpeg'),
  },
];

function ListingsScreen(props) {
  return (
    <Screen style={styles.screen}>
      <FlatList
        data={listings}
        keyExtractor={(listing) => listing.id.toString()}
        renderItem={({ item }) => (
          <Card title={item.title} subTitle={item.price} image={item.image} />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.lightGreen,
  },
});

export default ListingsScreen;
