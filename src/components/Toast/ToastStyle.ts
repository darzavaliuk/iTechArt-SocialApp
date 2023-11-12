import {StyleSheet} from 'react-native';


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
})

export const toastStyles = {
    success: {
        container: styles.successToastContainer,
        text: styles.successToastText,
        icon: require('../../../assets/images/SuccessIcon.png'),
    },
    warning: {
        container: styles.warningToastContainer,
        text: styles.warningToastText,
        icon: require('../../../assets/images/WarningIcon.png'),
    },
    error: {
        container: styles.errorToastContainer,
        text: styles.errorToastText,
        icon: require('../../../assets/images/ErrorIcon.png'),
    },
};
