import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Button, Text, Image } from 'react-native';
import { ListItem, ListItemSeparator } from '../components/lists';
import colors from '../config/colors';
import Icon from '../components/Icon';
import Screen from '../components/Screen';
import { db, auth } from '../../firebase/firebase-config';
import { getDoc, collection, doc, getDocs } from 'firebase/firestore';

function UserProfile() {
  const [user, setUser] = useState([]);
  const [userPhoto, setUserPhoto] = useState([]);

  useEffect(() => {
    const getUserInfo = async () => {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setUser(userSnap.data());
      } else {
        console.log('No such document');
      }
    };
    getUserInfo();
  }, []);
  // console.log('user', user);

  const feedCollectionRef = collection(db, 'feed');
  useEffect(() => {
    const getPhotos = async () => {
      const data = await getDocs(feedCollectionRef);
      const mappedData = data.docs.map((document) => ({
        ...document.data(),
        id: document.id,
      }));
      const filteredData = mappedData.filter(
        (post) => post.email === auth.currentUser.email
      );
      setUserPhoto(filteredData);
    };
    getPhotos();
  }, []);
  // console.log('userPhoto', userPhoto);
  // console.log('auth', auth.currentUser);
  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        {user.dog ? (

          <View>
            <Text style={styles.header}>User Information:</Text>
            <Text style={styles.text1}>Name: {user.name}</Text>
            <Text style={styles.text1}>Email: {user.email}</Text>

            <Image
              source={{ uri: user.dog[3] }}
              style={{
                width: 200,
                height: 200,
                borderRadius: 200 / 2,
                alignSelf: 'center',
                marginVertical: 20,
              }}
            />
            <Text style={styles.header}>Dog Information:</Text>
            <Text style={styles.text1}>Dog Name: {user.dog[0]}</Text>
            <Text style={styles.text1}>Dog Breed: {user.dog[1]}</Text>
            <Text style={styles.text1}>Dog DOB: {user.dog[2]}</Text>

            <Text style={styles.text1}>House: {user.house}</Text>
            <Text style={styles.text1}>Current Likes: {user.likes}</Text>
            <Text style={styles.text1}>Task Completed: {user.dog[4]}</Text>
          </View>
        ) : (
          <Text style={styles.header}>loading...</Text>
        )}
        <View>
          <Text style={styles.header}>Photos:</Text>
          {userPhoto.map((post) => (
            <View key={post.image}>
              <Image
                source={{ uri: post.image }}
                style={{ width: 200, height: 150, alignSelf: 'center' }}
              />
            </View>
          ))}
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.blue,
  },
  container: {
    marginVertical: 20,
  },
  header: {
    color: colors.primary,
    fontSize: 25,
    fontWeight: '800',
    paddingVertical: 9,
    alignSelf: 'center',
  },
  text1: {
    color: colors.gold,
    fontSize: 20,
    fontWeight: '500',
    paddingVertical: 3,
    alignSelf: 'center',
  },
});

export default UserProfile;
