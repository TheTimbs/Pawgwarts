import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  TextInput,
  Button,
  Image,
  View,
  Platform,
  Text,
  TouchableOpacity,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth, storage } from '../../firebase/firebase-config';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import uuid from 'uuid';

export default function UploadImageScreen() {
  const [image, setImage] = useState(null);

  const feedCollectionRef = collection(db, 'feed');

  const createPost = async () => {
    await addDoc(feedCollectionRef, {
      likes: 0,
      image: image,
      name: auth.currentUser.email
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
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <TouchableOpacity>
        <Button title="Select Image" onPress={pickImage} />
      </TouchableOpacity>

      {image && (
        <Image
          source={{ uri: image }}
          style={{
            width: 500,
            height: 350,
            alignSelf: 'center',
          }}
        />
      )}

      <TouchableOpacity>
        <Button title="Confirm Image" onPress={uploadImage} />
      </TouchableOpacity>

      <TouchableOpacity>
        <Button title="Submit Post" onPress={createPost} />
      </TouchableOpacity>
    </View>
  );
}
