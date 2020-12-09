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
  return auth().onAuthStateChanged((user) => callback(user));
};

export const signIn = (username, password) => {
  return new Promise((resolve, _reject) => {
    console.log(username);
    auth()
      .signInWithEmailAndPassword(`${username}@gmail.com`, password)
      .then((response) => {
        console.log(response.user);
        resolve({ success: true, user: response.user });
      })
      .catch((error) => {
        if ((error.code = 'auth/user-not-found')) {
          signUp(username, password).then((response) => {
            console.log(response.user);
            resolve({ success: true, user: response.user });
          });
        } else {
          resolve({ success: false });
        }
      });
  });
};

export const signUp = (username, password) => {
  return new Promise((resolve) => {
    auth()
      .createUserWithEmailAndPassword(`${username}@gmail.com`, password)
      .then((response) => {
        resolve({ success: true, user: response.user });
      })
      .catch((error) => {
        console.log(error);
        resolve({ success: false });
      });
  });
};
