import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Button, Pressable } from 'react-native';
import {
  getDocs,
  doc,
  getDoc,
  collection,
  updateDoc,
  query,
  where,
  increment,
  arrayRemove,
  arrayUnion,
} from 'firebase/firestore';
import { db } from '../../firebase/firebase-config';
import Text from './Text';
import colors from '../config/colors';
import { getAuth } from 'firebase/auth';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function FeedCard({ title, likes, image, email }) {
  const [like, setLike] = useState(likes);
  const [userLike, setUserLike] = useState(false);

  async function addLike(email) {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    const post = query(
      collection(db, 'feed'),
      where('email', '==', `${email}`),
      where('image', '==', `${image.uri}`)
    );
    const docs = await getDocs(post);

    docs.forEach(async (document) => {
      const feedPost = doc(db, 'feed', document.id);
      const feedData = await getDoc(feedPost);
      const house = feedData.data().house;
      const houseRef = doc(db, 'houses ', house);

      const user = query(
        collection(db, 'users'),
        where('email', '==', `${email}`)
      );
      const userDocs = await getDocs(user);
      let userPost = '';

      userDocs.forEach((document) => {
        userPost = doc(db, 'users', document.id);
      });

      const arr = document.data().UsersLikes;
      if (arr.includes(currentUser.email)) {
        updateDoc(feedPost, {
          likes: increment(-1),
          UsersLikes: arrayRemove(currentUser.email),
        });
        updateDoc(houseRef, { points: increment(-1) });
        updateDoc(userPost, { likes: increment(-1) });
        setLike(document.data().likes - 1);
      } else {
        updateDoc(feedPost, {
          likes: increment(1),
          UsersLikes: arrayUnion(currentUser.email),
        });
        updateDoc(houseRef, { points: increment(1) });
        updateDoc(userPost, { likes: increment(1) });
        setLike(document.data().likes + 1);
      }
      userLike ? setUserLike(false) : setUserLike(true);
    });
  }

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Image style={styles.image} source={image} />
      {/* <View style={styles.detailsContainer}>
        <Button title={`${like}`} onPress={() => addLike(email)}></Button>
      </View> */}
      <View style={styles.rowContainer}>
        <Text style={styles.currLikes}> Likes: {like}</Text>
        <Pressable
          style={styles.detailsContainer}
          onPress={() => addLike(email)}
        >
          <MaterialCommunityIcons
            name="bone"
            size={38}
            color={userLike ? 'red' : 'black'}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    height: 360,
    marginBottom: 20,
    overflow: 'hidden',
  },
  rowContainer: {
    flexDirection: 'row',
  },
  detailsContainer: {
    padding: 5,
    marginBottom: 5,
  },
  image: {
    width: '100%',
    height: 280,
  },
  subTitle: {
    fontWeight: '400',
  },
  title: {
    paddingTop: 7,
    paddingLeft: 10,
    marginBottom: 7,
    color: colors.houseBlue,
    fontWeight: 'bold',
  },
  currLikes: {
    paddingTop: 11,
    paddingRight: 10,
    paddingLeft: 10,
    marginBottom: 7,
    color: colors.houseBlue,
    fontWeight: 'bold',
  },
});

export default FeedCard;
