import React, { useState } from 'react';
import { StyleSheet, Image, View, Text, Platform,ScrollView } from 'react-native';
import * as Yup from 'yup';
import { date, object } from "yup"
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

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label('Name'),
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(6).label('Password'),
  passwordConfirmation: Yup.string()
  .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  dogName: Yup.string().required().label('Dog Name'),
  DOB: Yup.date().required("DOB is Required").min(10),
  breed: Yup.string().required().label('Dog breed'),


});

function RegisterScreen() {

  const [house, setHouse] = useState('');
  const [image, setImage] = useState(null);
  const [confirmed, setCon] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const RegisterUser = async (value) => {
    console.log(value)
    const user = await createUserWithEmailAndPassword(auth, value.email, value.password);
    const docRef = await setDoc(doc(db, 'users', `${user.user.uid}`), {
      name: value.name,
      email: value.email,
      likes: 0,
      house: house,
      // dog: [dogName, breed, DOB, image, taskCompleted],
      dog: { dogName: value.dogName, breed: value.breed, dob: value.DOB, image: image },
      completedTrainings: [],
      trainingsInProgress: [],
    });


    setImage('');
    navigation.navigate('Quiz');
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
   function close(){
    setLoading(true);
    uploadImage()
    async function uploadImage() {
      console.log("done");
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
       <ScrollView>

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
         {!confirmed && !loading  ? <Button title="Confirm Profile Picture" onPress={() => close()} color="blue" />
         : loading && !confirmed  ? <Text style={styles.Con}>loading...</Text>
         : <Text style={styles.Con}>confirmed</Text> }
       </View>

       <Form
        initialValues={{ name: "", email: "", password: "",dogName: "", breed: "", DOB: "", passwordConfirmation:"" }}
        onSubmit={(value) => RegisterUser(value)}
        validationSchema={validationSchema}
      >
        <FormField
          autoCorrect={false}
          icon="account"
          name="name"
          placeholder="Name"
        />
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
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="passwordConfirmation"
          placeholder="Retype Password"
          secureTextEntry
          textContentType="password"
        />
         <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="dog"
          name="dogName"
          placeholder="Dog Name"
        />
       <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="dog-side"
          name="breed"
          placeholder="Dog breed"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="cake"
          name="DOB"
          placeholder="Date of birth ex:00/00/0000"
        />
        <SubmitButton title="Register" color="blue" />
      </Form>



      </ScrollView>
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
  TextError:{
    color:'red',
    fontSize:20
  },
  Text:{
    fontSize:20
  },
  Con:{
    textAlign:'center',
    justifyContent:'center',
    alignItems:'center',
    fontSize:30
  }
});

export default RegisterScreen;
