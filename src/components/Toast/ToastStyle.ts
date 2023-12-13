import { StyleSheet } from 'react-native';
const SuccessIcon = require('../../../assets/images/SuccessIcon.png').default;
const WarningIcon = require('../../../assets/images/WarningIcon.png').default;
const ErrorIcon = require('../../../assets/images/ErrorIcon.png').default;

const styles = StyleSheet.create({
  successToastContainer: {
    backgroundColor: '#def1d7',
    borderColor: '#1f8722',
  },
  warningToastContainer: {
    backgroundColor: '#fef7ec',
    borderColor: '#f08135',
  },
  errorToastContainer: {
    backgroundColor: '#fae1db',
    borderColor: '#d9100a',
  },
  successToastText: {
    color: '#1f8722',
  },
  warningToastText: {
    color: '#f08135',
  },
  errorToastText: {
    color: '#d9100a',
  },
});

type ToastStyle = {
  container: object;
  text: object;
  icon: number;
};

type ToastStyles = {
  success: ToastStyle;
  warning: ToastStyle;
  error: ToastStyle;
};

export const toastStyles = {
  success: {
    container: styles.successToastContainer,
    text: styles.successToastText,
    icon: SuccessIcon,
  },
  warning: {
    container: styles.warningToastContainer,
    text: styles.warningToastText,
    icon: WarningIcon,
  },
  error: {
    container: styles.errorToastContainer,
    text: styles.errorToastText,
    icon: ErrorIcon,
  },
};
