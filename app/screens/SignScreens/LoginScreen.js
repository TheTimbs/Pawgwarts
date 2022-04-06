import React, { useState } from 'react';
import { StyleSheet, Image, Alert, View, ImageBackground } from 'react-native';
import * as Yup from 'yup';
import { Form, FormField, SubmitButton } from '../../components/forms';
import Button from '../../components/Button';
import Screen from '../../components/Screen';
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';
import { auth } from '../../../firebase/firebase-config';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import FeedNavigator from '../../navigation/FeedNavigator';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(6).label('Password'),
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

        Alert.alert(err.message);
      });
  };

  return (
    <ImageBackground
      blurRadius={3}
      style={styles.background}
      source={require('../../assets/BlueBackground.jpeg')}
    >

      <Image style={styles.logo} source={require('../../assets/DogLogo.png')} />
      <Form
        initialValues={{ email: '', password: '' }}
        onSubmit={(value) => SignUser(value)}
        validationSchema={validationSchema}
      >

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

        <View style={styles.buttonsContainer}>
          <SubmitButton title="Sign in" color="blue" />
        </View>
      </Form>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   padding: 10,
  //   backgroundColor: '#587b7f',
  // },
  background: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
    paddingHorizontal: 20,
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
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: '#CBBEB3',
  },
  buttonsContainer: {
    padding: 20,
    width: '100%',
  },
});

export default LoginScreen;
