import React from 'react';
import { View, Image, Modal, StyleSheet, Text, Pressable } from 'react-native';
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from 'react-native-responsive-screen';
import appStyles, { colorSet } from '../../appStyles';

export default function ConfirmResetModal({
  close,
  done,
  imageSource,
  imageTitle,
  confirmQuestion,
  modalInfo,
  cancelText,
  buttonTitle,
}) {
  return (
    <Modal transparent style={styles.modal} visible={false}>
      <View style={styles.container}>
        <Image style={styles.image} source={imageSource} />
        <Text style={styles.imageCaption}>{imageTitle}</Text>
        {confirmQuestion && (
          <Text style={styles.confirmQuestion}>{confirmQuestion}</Text>
        )}
        <Text style={styles.modalInfo}>{modalInfo}</Text>
        <Pressable>
          <Text style={[appStyles.button, styles.button]}>{buttonTitle}</Text>
        </Pressable>

        {cancelText && <Text style={styles.cancelText}>{cancelText}</Text>}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    alignSelf: 'center',
    height: 200,
    justifyContent: 'center',
    flex: 1,
    opacity: 0.3,
  },
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: w(30),
    padding: w(7),
    width: w(90),
    borderRadius: w(3),
    backgroundColor: colorSet.mainBackgroundColor,
    shadowColor: '#fff',
    shadowOffset: { height: 5, width: 5 },
    shadowRadius: 5,
    elevation: 4,
  },
  image: {
    width: w(50),
    height: w(30),
  },
  imageCaption: {
    color: colorSet.lightText,
    fontSize: w(3.5),
    textAlign: 'center',
    marginTop: w(1),
    marginBottom: w(6),
  },
  confirmQuestion: {
    color: '#3F414E',
    fontSize: w(3),
    fontWeight: '700',
  },
  modalInfo: {
    color: colorSet.lightText,
    fontSize: w(3),
    marginBottom: w(7),
    marginTop: w(5),
  },
  cancelText: {
    color: '#3F414E',
    fontSize: w(3.5),
    marginTop: w(2),
  },
  button: {
    width: w(60),
  },
});
