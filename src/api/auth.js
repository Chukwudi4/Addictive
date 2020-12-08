import auth from '@react-native-firebase/auth';

export const signInAnonymously = () => {
  return new Promise((resolve, _reject) => {
    auth()
      .signInAnonymously()
      .then(() => {
        resolve({ success: true });
      })
      .catch((error) => {
        resolve({ success: false });
      });
  });
};

export const checkSignedIn = (callback) => {
  auth().onAuthStateChanged((user) => callback(user));
};

export const signIn = (username, password) => {
  return new Promise((resolve, _reject) => {
    auth()
      .signInWithEmailAndPassword(`${username}@sobrio.com`, password)
      .then(async (user) => {
        resolve({ success: true, user });
      })
      .catch((error) => {
        if ((error.code = 'auth/user-not-found')) {
          return signUp(username, password);
        }
        resolve({ success: false });
      });
  });
};

export const signUp = (username, password) => {
  return new Promise((resolve) => {
    auth()
      .createUserWithEmailAndPassword(`${username}@sobrio.com`, password)
      .then((user) => {
        resolve({ success: true, user });
      })
      .catch((error) => {
        resolve({ success: false });
      });
  });
};
