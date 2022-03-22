import React, { useState } from 'react';
import { StyleSheet, Button } from 'react-native';
import * as Yup from 'yup';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { db, storage, auth } from '../../firebase/firebase-config';
import Screen from '../components/Screen';
import { Form, FormField, SubmitButton } from '../components/forms';
import { asyncstorage } from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-gesture-handler';
import { collection, addDoc, setDoc, doc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// const validationSchema = Yup.object().shape({
//   name: Yup.string().required().label('Name'),
//   email: Yup.string().required().email().label('Email'),
//   password: Yup.string().required().min(4).label('Password'),
// });

function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const RegisterUser = async () => {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    const docRef = await setDoc(doc(db, 'users', `${user.user.uid}`), {
      name: name,
      email: email,
      likes: 0,
      house: '',
    });

    setEmail('');
    setName('');
    setPassword('');
  };
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