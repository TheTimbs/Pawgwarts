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
          // <ListItem
          //   title={user.dog[0]}
          //   subTitle={user.email}
          //   image={{ uri: user.dog[3] }}
          // />
          <View>
            <Text>User Information:</Text>
            <Text>Name: {user.name}</Text>
            <Text>Email: {user.email}</Text>

            <Image
              source={{ uri: user.dog[3] }}
              style={{
                width: 200,
                height: 200,
                borderRadius: 200 / 2,
                alignSelf: 'center',
              }}
            />
            <Text>Dog Information:</Text>
            <Text>Dog Name: {user.dog[0]}</Text>
            <Text>Dog Breed: {user.dog[1]}</Text>
            <Text>Dog DOB: {user.dog[2]}</Text>

            <Text>House: {user.house}</Text>
            <Text>Current Likes: {user.likes}</Text>
            <Text>Task Completed: {user.dog[4]}</Text>
          </View>
        ) : (
          console.log('loading')
        )}
        <View>
          <Text>Photos:</Text>
          {userPhoto.map((post) => (
            <View key={post.image}>
              <Image
                source={{ uri: post.image }}
                style={{ width: 200, height: 150 }}
              />
            </View>
          ))}
        </View>
      </View>
      <ListItem
        title="Log Out"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
      />
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
});

export default UserProfile;
