import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Button } from 'react-native';
import {
  getDocs,
  doc,
  getDoc,
  collection,
  updateDoc,
  query,
  where,
  setDoc,
  increment,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '../../firebase/firebase-config';
import Text from './Text';
import colors from '../config/colors';

function FeedCard({ title, likes, image, email }) {
  const [like, setLike] = useState(likes);
  const feedScreenRef = collection(db, 'feed');
  async function addLike(email) {
    const post = query(
      collection(db, 'feed'),
      where('email', '==', `${email}`),
      where('image', '==', `${image.uri}`)
    );
    const docs = await getDocs(post);

    docs.forEach((document) => {
      const feedPost = doc(db, 'feed', document.id);
      updateDoc(feedPost, { likes: increment(1) });
      setLike(document.data().likes + 1);
    });
  }

  return (
    <View style={styles.card}>
      <Image style={styles.image} source={image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Button title={`${like}`} onPress={() => addLike(email)}></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: 'hidden',
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200,
  },
  subTitle: {
    fontWeight: '400',
  },
  title: {
    marginBottom: 7,
    color: colors.secondary,
    fontWeight: 'bold',
  },
});

export default FeedCard;
