import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import AddAComment from '../components/AddAComment';

function CommentsScreen() {
  const dummyComments = [
    { userName: "yaazi1", comment: "nice dog you got there" },
    { userName: "yaazi2", comment: "what a cute pup!" },
    { userName: "yaazi3", comment: "she nailed the trick!" },
    { userName: "yaazi4", comment: "she did this challenge perfectly! more points to Gryffindog" },
    { userName: "yaazi5", comment: "time to level up!" }
  ]
  return (
    <View syle={styles.parentContainer}>
      <Text style={styles.header}>Comments</Text>
      <View style={styles.commentsContainer}>
        <ScrollView>
          {dummyComments.map(comment => (<Text style={styles.commentText}> {comment.userName}: {comment.comment} </Text>))}
        </ScrollView>
      </View>
      <View style={styles.addCommentContainer}>
        <AddAComment style={styles.commentInput} />
        <Button style={styles.submitComment} title="Post"></Button>
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
    paddingTop: 45,
    fontWeight: 'bold',
    fontSize: 20,
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