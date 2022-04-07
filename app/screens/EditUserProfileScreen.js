import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Image,
  ImageBackground,
} from 'react-native';
import colors from '../config/colors';
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
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import Button from '../components/Button';

const EditUserProfile = () => {
  const [user, setUser] = useState([]);
  const [image, setImage] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const getUserInfo = async () => {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setUser(userSnap.data());
      }
    };
    getUserInfo();
  }, []);


  const updatePhoto = async () => {
    const imageRef = doc(db, 'users', auth.currentUser.uid);
    await updateDoc(imageRef, {
      'dog.image': image,
    });
    navigation.navigate('info');
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

  let [fontsLoaded] = useFonts({
    'Harry-Potter': require('../assets/fonts/HarryPotter.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <ImageBackground
      blurRadius={1}
      style={styles.background}
      source={require('../assets/castle.jpeg')}
    >
      <View style={styles.container}>
        {user.dog ? (
          <View>
            <View style={styles.userContainer}>
              <Text style={styles.header}>User Info:</Text>
              <Text style={styles.text1}>Name: {user.name}</Text>
              <Text style={styles.text1}>Email: {user.email}</Text>
            </View>
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
                  marginTop: 15,
                }}
              />
            )}
            <View style={styles.buttonsContainer}>
              <Button
                title="Select New Profile Picture"
                onPress={pickImage}
                color="blue"
              />

              <Button
                title="Confirm New Profile Picture"
                onPress={uploadImage}
                color="blue"
              />
              <Button
                title="Update"
                color="purple"
                onPress={() => updatePhoto()}
              />
            </View>
          </View>
        ) : (
          <Text style={styles.header}>loading...</Text>
        )}
      </View>
    </ImageBackground>
  );
};

export default EditUserProfile;

const styles = StyleSheet.create({
  background: {
    height: '100%',
  },
  container: {
    marginVertical: 20,
  },
  header: {
    color: '#871419',
    fontSize: 45,
    fontWeight: '800',
    padding: 2,
    alignSelf: 'center',
    fontFamily: 'Harry-Potter',
    width: '70%',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 2,
  },
  text1: {
    color: colors.gold,
    fontSize: 30,
    fontWeight: '500',
    paddingVertical: 3,
    alignSelf: 'center',
    fontFamily: 'Harry-Potter',
  },
  buttonsContainer: {
    paddingTop: 15,
    paddingLeft: 35,
    paddingRight: 35,
    width: '100%',
  },
  userContainer: {
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: 'rgba(0, 0, 0, .7)',
    width: '75%',
    alignSelf: 'center',
    borderRadius: 15,
  },
});
