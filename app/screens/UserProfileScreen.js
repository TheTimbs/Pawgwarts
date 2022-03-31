import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Image,
  ImageBackground,
  Pressable,
  Button,
} from 'react-native';
import { ListItem, ListItemSeparator } from '../components/lists';
import colors from '../config/colors';
import Icon from '../components/Icon';
import Screen from '../components/Screen';
import { db, auth } from '../../firebase/firebase-config';
import { getDoc, collection, doc, getDocs } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { FontAwesome5 } from '@expo/vector-icons';

function UserProfile() {
  const [user, setUser] = useState([]);
  const [userPhoto, setUserPhoto] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const getUserInfo = async () => {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUser(userSnap.data());
        } else {
          console.log('No such document');
        }
      };
      getUserInfo();
    });
    console.log('userprofilescreen');
    return unsubscribe;
  }, [navigation]);

  const feedCollectionRef = collection(db, 'feed');
  useEffect(() => {
    const getPhotos = async () => {
      const data = await getDocs(feedCollectionRef);
      const mappedData = data.docs.map((document) => ({
        ...document.data(),
        id: document.id,
      }));
      const filteredData = mappedData.filter(
        (post) => post.email === auth.currentUser.email
      );
      setUserPhoto(filteredData);
    };
    getPhotos();
  }, []);
  // console.log(user.completedTrainings.length);

  let [fontsLoaded] = useFonts({
    'Harry-Potter': require('../assets/fonts/HarryPotter.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <ImageBackground
      blurRadius={3}
      style={styles.background}
      source={require('../assets/BlueBackground.jpeg')}
    >
      <View style={styles.container}>
        {user.dog ? (
          <View>
            <Text style={styles.header}>User Info:</Text>
            <View style={styles.userContainer}>
              <Text style={styles.text1}>Name: {user.name}</Text>
              <Text style={styles.text1}>Email: {user.email}</Text>
            </View>
            <Text style={styles.header}>Dog Info:</Text>
            <View style={styles.dogContainer}>
              <Image
                source={{ uri: user.dog.image }}
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 150 / 2,
                  alignSelf: 'center',
                }}
              />
              <Pressable
                style={styles.buttonContainer}
                onPress={() => navigation.navigate('EditUserProfile')}
              >
                <FontAwesome5
                  name="user-edit"
                  size={40}
                  color={colors.houseYellow}
                />
              </Pressable>
              <View style={styles.dogInfoContainer}>
                <Text style={styles.text1}>Dog Name: {user.dog.dogName}</Text>
                <Text style={styles.text1}>Dog Breed: {user.dog.breed}</Text>
                <Text style={styles.text1}>Dog DOB: {user.dog.dob}</Text>

                <Text style={styles.text1}>House: {user.house}</Text>
                <Text style={styles.text1}>Current Likes: {user.likes}</Text>
                <Text style={styles.text1}>
                  Task Completed: {user.completedTrainings.length}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <Text style={styles.header}>loading...</Text>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    height: '100%',
  },
  container: {
    marginVertical: 20,
  },
  userContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  dogContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  dogInfoContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    flex: 1,
    position: 'absolute',
    bottom: 260,
    right: 130,
  },
  header: {
    color: '#871419',
    fontSize: 50,
    fontWeight: '800',
    padding: 2,
    alignSelf: 'center',
    fontFamily: 'Harry-Potter',
    backgroundColor: 'black',
    width: '70%',
    textAlign: 'center',
    marginBottom: 10,
  },
  text1: {
    color: colors.gold,
    fontSize: 30,
    fontWeight: '500',
    paddingVertical: 3,
    alignSelf: 'center',
    fontFamily: 'Harry-Potter',
  },
});

export default UserProfile;
