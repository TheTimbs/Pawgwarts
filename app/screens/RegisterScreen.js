import React, { useState } from 'react';
import { StyleSheet, Image, View, Text, Platform } from 'react-native';
import * as Yup from 'yup';
import Button from '../components/Button';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { db, storage, auth } from '../../firebase/firebase-config';
import Screen from '../components/Screen';
import { Form, FormField, SubmitButton } from '../components/forms';
//import { AsyncStorage } from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-gesture-handler';
import { collection, addDoc, setDoc, doc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
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

  const navigation = useNavigation();

  const RegisterUser = async () => {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    const docRef = await setDoc(doc(db, 'users', `${user.user.uid}`), {
      name: name,
      email: email,
      likes: 0,

      house: house,
      // dog: [dogName, breed, DOB, image, taskCompleted],
      dog: { dogName: dogName, breed: breed, dob: DOB, image: image },
      completedTrainings: [],
      trainingsInProgress: [],
    });

    setEmail('');
    setName('');
    setPassword('');
    setDogName('');
    setBreed('');
    setDOB('');
    setImage('');
    navigation.navigate('Quiz');
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
       <View style={styles.buttonsContainer}>
        <Button title="Select Profile Picture" onPress={pickImage} color="blue" />
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
        <Button title="Confirm Profile Picture" onPress={uploadImage} color="blue" />
        <Button title="Register" onPress={() => RegisterUser()} color="blue" />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#587b7f"
  },
  TextInput: {
    height: 50,
    fontSize: 20,
    borderWidth:1,
    borderColor:"#CBBEB3",
    backgroundColor:'white',
    borderRadius:10,
  },
  buttonsContainer: {
    padding: 20,
    width: '100%',
  },
});

export default RegisterScreen;
