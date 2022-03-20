import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDLWsJULBHcJV5BN833aAVhmlvYgN-aI-c',
  authDomain: 'pawgwarts-14be3.firebaseapp.com',
  projectId: 'pawgwarts-14be3',
  storageBucket: 'pawgwarts-14be3.appspot.com',
  messagingSenderId: '444278983769',
  appId: '1:444278983769:web:b2df15e7ca8dd067e27548',
  measurementId: 'G-QTLH9CS65N',
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
