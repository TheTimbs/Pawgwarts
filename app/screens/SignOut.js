import React, { useEffect, useState } from 'react';
import { View, Button } from 'react-native';
// import { auth } from '../../firebase/firebase-config';
import { getAuth, signOut } from 'firebase/auth';

export const SignOut = () => {
  const [isSignedIn, setIsSignedIn] = useState(true);
  const signOutUser = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setIsSignedIn(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Button title="Sign Out" onPress={signOutUser} />
    </View>
  );
};
