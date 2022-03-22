import React, { useState } from 'react';
import { StyleSheet, Button, Image, View, Text } from 'react-native';
import * as Yup from 'yup';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { db, storage, auth } from '../../firebase/firebase-config';
import Screen from '../components/Screen';
import { Form, FormField, SubmitButton } from '../components/forms';
// import { AsyncStorage } from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-gesture-handler';
import { collection, addDoc, setDoc, doc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import uuid from 'uuid';
// const validationSchema = Yup.object().shape({
//   name: Yup.string().required().label('Name'),
//   email: Yup.string().required().email().label('Email'),
//   password: Yup.string().required().min(4).label('Password'),
// });

function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [house, setHouse] = useState('');
  const [dogName, setDogName] = useState('');
  const [breed, setBreed] = useState('');
  const [DOB, setDOB] = useState('');
  const [image, setImage] = useState(null);
  const [taskCompleted, setTaskCompleted] = useState(0);

  const RegisterUser = async () => {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    const docRef = await setDoc(doc(db, 'users', `${user.user.uid}`), {
      name: name,
      email: email,
      likes: 0,
      house: house,
      dog: [dogName, breed, DOB, image, taskCompleted],
    });

    setEmail('');
    setName('');
    setPassword('');
    setDogName('');
    setBreed('');
    setDOB('');
    setImage('');
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
    <Screen style={styles.container}>
      <TextInput
        style={styles.TextInput}
        autoCorrect={false}
        icon="account"
        name="name"
        placeholder="Name"
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.TextInput}
        autoCapitalize="none"
        autoCorrect={false}
        icon="email"
        keyboardType="email-address"
        name="email"
        placeholder="Email"
        textContentType="emailAddress"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.TextInput}
        autoCapitalize="none"
        autoCorrect={false}
        icon="lock"
        name="password"
        placeholder="Password"
        secureTextEntry
        textContentType="password"
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.TextInput}
        autoCapitalize="none"
        autoCorrect={false}
        icon="account"
        name="dogName"
        placeholder="Dog Name"
        onChangeText={(text) => setDogName(text)}
      />
      <TextInput
        style={styles.TextInput}
        autoCapitalize="none"
        autoCorrect={false}
        icon="account"
        name="breed"
        placeholder="Dog Breed"
        onChangeText={(text) => setBreed(text)}
      />
      <TextInput
        style={styles.TextInput}
        autoCapitalize="none"
        autoCorrect={false}
        icon="account"
        name="DOB"
        placeholder="Date of Birth (mm-dd-yyyy)"
        onChangeText={(text) => setDOB(text)}
      />
      <Button title="Select Profile Picture" onPress={pickImage} />
      {image ? (
        <Image
          source={{ uri: image }}
          style={{
            width: 150,
            height: 150,
            borderRadius: 150 / 2,
            alignSelf: 'center',
          }}
        />
      ) : null}
      <Button title="Confirm Profile Picture" onPress={uploadImage} />
      <Button title="Register" onPress={() => RegisterUser()} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  TextInput: {
    height: 50,
    fontSize: 20,
  },
});

export default RegisterScreen;
