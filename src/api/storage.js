import firestore from '@react-native-firebase/firestore';

export const saveUserDataOnDB = (user) => {
  try {
    firestore().collection('users').doc(user.uid).add({
      uid: user.uid,
      username: username,
    });
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

export const saveAddictionsOnDB = (userId, addictions) => {
  try {
    firestore().collection('addictions').doc(userId).set({
      addictions,
    });
  } catch (error) {}
};

export const fetchAddictionsFromDB = (userId) => {
  try {
    const data = firestore().collection('addictions').doc(userId).get();
    if (data) {
      return data.addictions;
    }
    return [];
  } catch (error) {
    return [];
  }
};
