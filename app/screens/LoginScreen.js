import React, { useState } from 'react';
import { StyleSheet, Image, Alert, View } from 'react-native';
import * as Yup from 'yup';
import { Form, FormField, SubmitButton } from '../components/forms';
import Button from '../components/Button';
import Screen from '../components/Screen';

import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';
import { auth } from '../../firebase/firebase-config';
import { TextInput } from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native'
import FeedNavigator from '../navigation/FeedNavigator';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password'),
});

function LoginScreen(props) {
  const [isSignedIn, setIsSignedIn] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const SignUser = (value) => {
    signInWithEmailAndPassword(auth, value.email, value.password)
      .then(() => {
        setIsSignedIn(true);
        navigation.navigate('App');
      })
      .catch((err) => {
        console.log(err);
        Alert.alert(err.message);
      });
  };

  return (
    <Screen style={styles.container}>

      <Image style={styles.logo} source={require('../assets/DogLogo.png')} />
      <Form
        initialValues={{email: "", password: "", }}
        onSubmit={(value) => SignUser(value)}
        validationSchema={validationSchema}
      >
      {/* <TextInput
        style={styles.TextInput}
        autoCapitalize="none"
        autoCorrect={false}
        icon="email"
        keyboardType="email-address"
        name="email"
        placeholder="Email"
        textContentType="emailAddress"
        inlineImageLeft="email"
        inlineImagePadding={20}
        onChangeText={(text) => setEmail(text)}
      /> */}
       <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
      {/* <TextInput
        style={styles.TextInput}
        autoCapitalize="none"
        autoCorrect={false}
        icon="lock"
        name="password"
        placeholder="Password"
        secureTextEntry={true}
        textContentType="password"
        onChangeText={(text) => setPassword(text)}
      /> */}
       <View style={styles.buttonsContainer}>
       <SubmitButton title="Sign in" color="blue" />
      </View>
     </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#587b7f"
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
    backgroundColor:"white",
    borderRadius:10,
    margin:10,
    borderWidth:1,
    borderColor:"#CBBEB3"
  },
  buttonsContainer: {
    padding: 20,
    width: '100%',
  },
});

export default LoginScreen;
