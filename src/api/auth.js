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
  console.log(username);
  return new Promise((resolve, _reject) => {
    console.log(username);
    auth()
      .signInWithEmailAndPassword(`${username}@sobrio.com`, password)
      .then((response) => {
        console.log(response.user);
        resolve({ success: true, user: response.user });
      })
      .catch((error) => {
        console.log(error);
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
      .then((response) => {
        resolve({ success: true, user: response.user });
      })
      .catch((error) => {
        resolve({ success: false });
      });
  });
};
