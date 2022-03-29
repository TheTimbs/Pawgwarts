import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';

import { ListItem, ListItemSeparator } from '../components/lists';
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
    title: 'My pictures',
    icon: {
      name: 'image-area',
      backgroundColor: colors.secondary,
    },
    targetScreen: 'MyPictures',
  },
  {
    title: 'My Dogs',
    icon: {
      name: 'dog',
      backgroundColor: colors.primary,
    },
    targetScreen: routes.MESSAGES,
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
    <Screen style={styles.screen}>
      <View style={styles.container}>
        {pic && info ? (
          <ListItem
            title={info.name}
            subTitle={info.email}
            image={{ uri: info.dog.image }}
            onPress={() => navigation.navigate('info')}
          />
        ) : info && !pic ? (
          <ListItem
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
            <ListItem
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
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.blue,
  },
  container: {
    marginVertical: 20,
  },
});

export default AccountScreen;
