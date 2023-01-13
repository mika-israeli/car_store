import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2uSv8VtHka0llJvr7FjBmaUB6KIAupJk",
  authDomain: "carusers-d1acb.firebaseapp.com",
  projectId: "carusers-d1acb",
  storageBucket: "carusers-d1acb.appspot.com",
  messagingSenderId: "986803051169",
  appId: "1:986803051169:web:7d3757b50c009aba97aee0",
  measurementId: "G-XQN4W6R33K"
  };


firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const firestore = firebase.firestore();

export const createUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`Users/${user.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email } = user;
    const { username } = additionalData;

    try {
      await userRef.set({
        username,
        email,
        createdAt: new Date(),
      });
    } catch (error) {
      console.log('Error in creating user', error);
    }
  }
};

export const getDocumentByUid = async (uid) =>{
  if(!uid)
    return;
    const snapshot =  (await firestore.collection('Users').doc(uid).get()).data();

    return snapshot;
}

export default firebase;