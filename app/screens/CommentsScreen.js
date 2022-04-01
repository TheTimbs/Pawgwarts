import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
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
import colors from '../config/colors';
import { getAuth } from 'firebase/auth';

function CommentsScreen({ route }) {
  const { email, image } = route.params;
  const [comments, setComments] = useState([]);
  const [userComment, setUserComment] = useState('')
  const dummyComments = [
    { userName: "yaazi1", comment: "nice dog you got there" },
    { userName: "yaazi2", comment: "what a cute pup!" },
    { userName: "yaazi3", comment: "she nailed the trick!" },
    { userName: "yaazi4", comment: "she did this challenge perfectly! more points to Gryffindog" },
    { userName: "yaazi5", comment: "time to level up!" }
  ]


  async function getComments(email) {
    const post = query(
      collection(db, 'feed'),
      where('email', '==', `${email}`),
      // where('image', '==', `${image.uri}`)
    );
    const docs = await getDocs(post);
    docs.forEach(async (document) => {
      const feedPost = doc(db, 'feed', document.id);
      const feedData = await getDoc(feedPost);
      // console.log("// [CommentsScreen/getComments()] - feedData: ", feedData)
      const commentsFromPost = feedData.data().comments;
      // console.log("// [CommentsScreen/getComments()] - comments from post: ", commentsFromPost)
      setComments(commentsFromPost);
      console.log("// [CommentsScreen/getComments()] - comments: ", comments)
    });
    setUserComment('');
  };

  const addComment = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    const user = doc(db, "users", currentUser.uid);
    let userDetails = await getDoc(user);
    userDetails = userDetails.data();

    const post = query(
      collection(db, 'feed'),
      where('email', '==', `${email}`),
      // where('image', '==', `${image.uri}`)
    );
    const docs = await getDocs(post);
    docs.forEach(async (document) => {
      const feedPost = doc(db, 'feed', document.id);
      await updateDoc(feedPost, { comments: arrayUnion({ username: userDetails.name, comment: userComment }) })
    });
    getComments(email);
  }

  useEffect(() => (getComments(email)), [])


  return (
    <View syle={styles.parentContainer}>
      <Text style={styles.header}>Comments</Text>
      <View style={styles.commentsContainer}>
        <ScrollView>
          {comments.map(comment => (<Text style={styles.commentText} key={comments.indexOf(comment)}> {comment.username}: {comment.comment} </Text>))}
        </ScrollView>
      </View>

      <View style={styles.addCommentContainer}>
        <TextInput
          style={{ height: 40 }}
          placeholder="Add a Comment"
          onChangeText={text => setUserComment(text)}
          defaultValue={userComment}
          value={userComment}
        />
        <Button onPress={() => addComment()} style={styles.submitComment} title="Post"></Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  parentContainer: {
    height: '100%',
  },
  header: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  commentsContainer: {
    borderWidth: 3,
    borderColor: "red",
    height: '50%',
    padding: 10,
  },
  commentText: {
    fontSize: 20,
    paddingBottom: 3,
  },
  addCommentContainer: {
    height: '40%',
    borderWidth: 3,
    borderColor: 'blue',
    display: 'flex',
  },
});

export default CommentsScreen;