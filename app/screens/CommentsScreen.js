import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  getDocs,
  doc,
  getDoc,
  collection,
  updateDoc,
  query,
  where,
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
    { username: "yaazi1", comment: "nice dog you got there" },
    { username: "yaazi2", comment: "what a cute pup!" },
    { username: "yaazi3", comment: "she nailed the trick!" },
    { username: "yaazi4", comment: "she did this challenge perfectly! more points to Gryffindog" },
    { username: "yaazi5", comment: "time to level up!" }
  ]


  async function getComments(email) {
    const post = query(
      collection(db, 'feed'),
      where('email', '==', `${email}`),
      where('image', '==', `${image.uri}`),
    );
    const docs = await getDocs(post);
    docs.forEach(async (document) => {
      const feedPost = doc(db, 'feed', document.id);
      const feedData = await getDoc(feedPost);
      const commentsFromPost = feedData.data().comments;
      setComments(commentsFromPost);
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
      where('image', '==', `${image.uri}`)
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
        <View style={styles.addCommentField}>
          <TextInput
            style={styles.textInputBox}
            placeholder="Add a Comment"
            onChangeText={text => setUserComment(text)}
            defaultValue={userComment}
            value={userComment}
            multiline
          />
          <Button onPress={() => addComment()} style={styles.submitComment} title="Post"></Button>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  parentContainer: {
    height: '100%',
  },
  header: {
    height: '10%',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 22,
    paddingTop: 25,
  },
  commentsContainer: {
    borderTopColor: '#3eb0d4',
    borderTopWidth: 3,
    height: '65%',
    padding: 10,
  },
  commentText: {
    fontSize: 20,
    paddingBottom: 3,
  },
  addCommentContainer: {
    height: '25%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    borderTopColor: '#3eb0d4',
    borderTopWidth: 1,
  },
  textInputBox: {
    height: 80,
    fontSize: 20,
  },
  addCommentField: {
    borderBottomColor: '#3eb0d4',
    borderBottomWidth: 12,
    width: '100%',
    borderWidth: 1,
    borderColor: '#3eb0d4',
    alignSelf: 'flex-end',
    borderRadius: 10,
  }
});

export default CommentsScreen;