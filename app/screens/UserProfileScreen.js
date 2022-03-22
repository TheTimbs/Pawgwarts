import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';
import { ListItem, ListItemSeparator } from '../components/lists';
import colors from '../config/colors';
import Icon from '../components/Icon';
import Screen from '../components/Screen';
import { db, auth } from '../../firebase/firebase-config';
import { getDoc, collection, doc } from 'firebase/firestore';

function UserProfile() {
  const [user, setUser] = useState([]);

  useEffect(() => {
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
  }, []);
  // console.log('user', user);
  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        {user.dog ? (
          <ListItem
            title={user.dog[0]}
            subTitle={user.email}
            image={{ uri: user.dog[3] }}
          />
        ) : (
          console.log('loading')
        )}
      </View>
      <ListItem
        title="Log Out"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
      />
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

export default UserProfile;
