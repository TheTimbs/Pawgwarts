import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  ImageBackground,
} from 'react-native';

import { ListItemSeparator } from '../components/lists';
import ListItemAccount from '../components/lists/ListItemAccount';
import colors from '../config/colors';
import Icon from '../components/Icon';
import routes from '../navigation/routes';
import Screen from '../components/Screen';
import { SignOut } from './SignOut';
import { db } from '../../firebase/firebase-config';
import { getDoc, collection, doc } from 'firebase/firestore';
import { getAuth } from '@firebase/auth';
import { useNavigation } from '@react-navigation/native';

const menuItems = [
  {
    title: 'My Trainings',
    icon: {
      name: 'format-list-bulleted',
      backgroundColor: colors.blue,
    },
    targetScreen: routes.TRAININGS,
  },
  {
    title: 'My Pictures',
    icon: {
      name: 'image-area',
      backgroundColor: colors.secondary,
    },
    targetScreen: 'MyPictures',
  },
];

function AccountScreen(props) {
  const auth = getAuth();
  const user = auth.currentUser;
  const userRef = doc(db, 'users', user.uid);
  const [info, setInfo] = useState();
  const [pic, setPic] = useState();
  const navigation = useNavigation();

  useEffect(() => {
    getUserInfo();
  }, []);

  async function getUserInfo() {
    const userDoc = await getDoc(userRef);

    setInfo(userDoc.data());
    // console.log(info);
    setPic(userDoc.data().dog);
  }

  // below function will rerender component after navigation
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getUserInfo();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <ImageBackground
      blurRadius={1}
      style={styles.background}
      source={require('../assets/castle.jpeg')}
    >
      <View style={styles.container}>
        {pic && info ? (
          <ListItemAccount
            title={info.name}
            subTitle={info.email}
            image={{ uri: info.dog.image }}
            onPress={() => navigation.navigate('info')}
          />
        ) : info && !pic ? (
          <ListItemAccount
            title={info.name}
            subTitle={info.email}
            image={require('../assets/DogLogo.png')}
            onPress={() => navigation.navigate('info')}
          />
        ) : (
          <Text> Loading...</Text>
        )}
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItemAccount
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={() => navigation.navigate(item.targetScreen)}
            />
          )}
        />
      </View>

      <SignOut>SignOut</SignOut>
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
});

export default AccountScreen;
