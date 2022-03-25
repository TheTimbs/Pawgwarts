import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Button, Text, Image } from 'react-native';
import { ListItem, ListItemSeparator } from '../components/lists';
import colors from '../config/colors';
import Icon from '../components/Icon';
import Screen from '../components/Screen';
import { db, auth } from '../../firebase/firebase-config';
import {
  getDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth } from '@firebase/auth';
import uuid from 'uuid';

const EditUserProfile = () => {
  const [user, setUser] = useState([]);
  const [image, setImage] = useState(null);

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

  const updatePhoto = async () => {
    const imageRef = doc(db, 'users', auth.currentUser.uid);
    // console.log('imageRef', imageRef.data);
    await updateDoc(imageRef, {
      'dog.image': image,
    });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  async function uploadImage() {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', image, true);
      xhr.send(null);
    });
    const fileRef = ref(getStorage(), uuid.v4());
    const result = await uploadBytes(fileRef, blob);
    blob.close();
    const downloadURL = await getDownloadURL(fileRef);
    setImage(downloadURL);
    return downloadURL;
  }

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        {user.dog ? (
          <View>
            <Text style={styles.header}>User Information:</Text>
            <Text style={styles.text1}>Name: {user.name}</Text>
            <Text style={styles.text1}>Email: {user.email}</Text>

            {image ? (
              <Image
                source={{ uri: image }}
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: 200 / 2,
                  alignSelf: 'center',
                  marginVertical: 20,
                }}
              />
            ) : (
              <Image
                source={{ uri: user.dog.image }}
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: 200 / 2,
                  alignSelf: 'center',
                  marginVertical: 20,
                }}
              />
            )}
            <Button title="Select New Profile Picture" onPress={pickImage} />
            {/* {image ? (
              <Image
                source={{ uri: image }}
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 150 / 2,
                  alignSelf: 'center',
                }}
              />
            ) : null} */}
            <Button title="Confirm New Profile Picture" onPress={uploadImage} />
            <Button title="Update" onPress={() => updatePhoto()} />
            {/* <Text style={styles.header}>Dog Information:</Text>
            <Text style={styles.text1}>Dog Name: {user.dog.dogName}</Text>
            <Text style={styles.text1}>Dog Breed: {user.dog.breed}</Text>
            <Text style={styles.text1}>Dog DOB: {user.dog.dob}</Text>

            <Text style={styles.text1}>House: {user.house}</Text>
            <Text style={styles.text1}>Current Likes: {user.likes}</Text>
            <Text style={styles.text1}>
              Task Completed: {user.completedTrainings.length}
            </Text> */}
          </View>
        ) : (
          <Text style={styles.header}>loading...</Text>
        )}
      </View>
    </Screen>
  );
};

export default EditUserProfile;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'grey',
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
