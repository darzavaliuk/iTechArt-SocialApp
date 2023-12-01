import {Platform} from 'react-native';

export const getMarginForAndroid = () => {
    if (Platform.OS === 'android') {
        return 24;
    }
    return 0;
};

export const getAvatarTopMargin = (height: number) => {
    return 4;
};

export const getHeightForElements = (screenHeight: number) => {
    return {
        headerMaxHeight: screenHeight * 0.14,
        headerMinHeight: screenHeight * 0.10,
        imageMaxHeight: screenHeight * 0.15,
        imageMinHeight: screenHeight * 0.10,
        headerFontSize: screenHeight * 0.022,
        avatarFontSize: screenHeight * 0.027
    };
};
