import React, { useState } from 'react';
import { StyleSheet, Image, Button } from 'react-native';
import * as Yup from 'yup';
import Screen from '../components/Screen';
import { Form, FormField, SubmitButton } from '../components/forms';
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';
import { auth } from '../../firebase/firebase-config';
import { TextInput } from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native'
import FeedNavigator from '../navigation/FeedNavigator';

// const validationSchema = Yup.object().shape({
//   email: Yup.string().required().email().label('Email'),
//   password: Yup.string().required().min(4).label('Password'),
// });

function LoginScreen(props) {
  const [isSignedIn, setIsSignedIn] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const SignUser = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setIsSignedIn(true);
        navigation.navigate('App');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Screen style={styles.container}>
      <Image style={styles.logo} source={require('../assets/DogLogo.png')} />

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
        secureTextEntry={true}
        textContentType="password"
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Sign In" onPress={() => SignUser()} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 75,
    height: 150,
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  TextInput: {
    height: 50,
    fontSize: 20,
  },
});

export default LoginScreen;
