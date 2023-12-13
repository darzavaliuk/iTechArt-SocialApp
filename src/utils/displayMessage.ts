import { Platform, ToastAndroid, Alert } from 'react-native';

export const displayMessage = (message: string) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.LONG);
  } else {
    Alert.alert(message);
  }
};
