import React, { useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import ListItemAccount from '../../components/lists/ListItemAccount';
import Icon from '../../components/Icon';
import { useNavigation } from '@react-navigation/native';

export const SignOut = () => {
  const [isSignedIn, setIsSignedIn] = useState(true);
  const navigation = useNavigation();
  const signOutUser = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setIsSignedIn(false);
        navigation.navigate('Welcome');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <ListItemAccount
      title="Log Out"
      IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
      onPress={() => signOutUser()}
    />
  );
};
