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
  increment,
  arrayRemove,
  arrayUnion
} from 'firebase/firestore';
import { db} from '../../firebase/firebase-config';
import Text from './Text';
import colors from '../config/colors';
import {getAuth} from 'firebase/auth'

function FeedCard({ title, likes, image, email }) {
  const [like, setLike] = useState(likes);

  async function addLike(email) {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    const post = query(
      collection(db, 'feed'),
      where('email', '==', `${email}`),
      where('image', '==', `${image.uri}`)
    );
    const docs = await getDocs(post);

   docs.forEach(async(document) => {
      const feedPost = doc(db, 'feed', document.id);
      const feedData = await getDoc(feedPost);
      const house = feedData.data().house;
      const houseRef = doc(db, 'houses ',house)

      const user = query(
        collection(db, 'users'),
        where('email', '==', `${email}`)
      );
      const userDocs = await getDocs(user);
      let userPost = "";

      userDocs.forEach((document) => {
         userPost = doc(db, 'users', document.id);

      });

      const arr = document.data().UsersLikes;
      if(arr.includes(currentUser.email)){
        updateDoc(feedPost,{likes: increment(-1), UsersLikes: arrayRemove(currentUser.email)})
        updateDoc(houseRef, {points:increment(-1)})
        updateDoc(userPost, { likes: increment(-1) });
        setLike(document.data().likes  -1);
      }else {
      updateDoc(feedPost, { likes: increment(1), UsersLikes: arrayUnion(currentUser.email)});
      updateDoc(houseRef, {points:increment(1)});
      updateDoc(userPost, { likes: increment(1) });
      setLike(document.data().likes + 1);
      }
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
