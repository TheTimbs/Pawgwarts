import { getDocs, collection, doc, getDoc, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore';

import { db } from '../../firebase/firebase-config';


export function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
    if (+match === 0) return '';
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
}
export const getTrainingsListChallenge = async (year, trainingCategory) => {
  const trainingCollectionRef = collection(
    db,
    year,
    trainingCategory,
    'trainings'
  );
  const trainingDocsRef = await getDocs(trainingCollectionRef);
    return trainingDocsRef.docs
}

export const getTrainingCategoriesChallenge = async (trainingYear) => {
  const yearCollectionRef = collection(db, trainingYear);
  const data = await getDocs(yearCollectionRef);
  return data.docs;
}

export function random(max){
 return Math.floor(Math.random() * max)
}
