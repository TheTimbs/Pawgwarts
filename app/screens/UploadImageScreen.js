import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  TextInput,
  Image,
  View,
  Platform,
  Text,
  TouchableOpacity,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { addDoc, collection, doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db, auth, storage } from '../../firebase/firebase-config';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import uuid from 'uuid';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/Button';
import Screen from '../components/Screen';

export default function UploadImageScreen() {
  const [image, setImage] = useState(null);
  const [confirmed, setCon] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const feedCollectionRef = collection(db, 'feed');
  const weekCollectionRef = doc(db, 'challenge', 'weeksChallenge');
  const userCollectionRef = doc(db, 'users', auth.currentUser.uid);

  const createPost = async () => {
    const user = await getDoc(userCollectionRef);
    const date = new Date();
    if (user.exists()) {
      console.log(user.data());
    } else {
      console.log('user not here');
    }
    await addDoc(feedCollectionRef, {
      likes: 0,
      image: image,
      name: user.data().name,
      email: auth.currentUser.email,
      UsersLikes: [],
      house: user.data().house,
      date: date.toDateString()
    });
     await updateDoc(weekCollectionRef, {userPost:arrayUnion(auth.currentUser.email)});
    navigation.navigate('MyFeed');
  };

  const pickImage = async () => {
    setCon(false);
    setLoading(false);
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

  function close() {
    setLoading(true);
    uploadImage();
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
      setCon(true);
      return downloadURL;
    }
  }

  return (
    <Screen style={styles.container}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View style={styles.buttonsContainer}>
          <Button title="Select Image" onPress={pickImage} color="blue" />

          {image ? (
            <Image
              source={{ uri: image }}
              style={{
                width: 360,
                height: 280,
                alignSelf: 'center',
              }}
            />
          ) : null}

          {!confirmed && !loading ? (
            <Button
              title="Confirm Profile Picture"
              onPress={() => close()}
              color="blue"
            />
          ) : loading && !confirmed ? (
            <Text style={styles.Con}>loading...</Text>
          ) : (
            <Text style={styles.Con}>confirmed</Text>
          )}

          <Button title="Submit Post" color="blue" onPress={createPost} />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#587b7f',
  },
  TextInput: {
    height: 50,
    fontSize: 20,
    borderWidth: 1,
    borderColor: '#CBBEB3',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  buttonsContainer: {
    padding: 20,
    width: '100%',
  },
  Text: {
    fontSize: 20,
  },
  Con: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    paddingTop: 5,
  },
});
