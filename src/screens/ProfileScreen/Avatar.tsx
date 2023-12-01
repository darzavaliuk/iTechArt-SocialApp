import React from 'react';
import {StyleSheet, Image, Animated, View, Text, ViewStyle} from 'react-native';
import {User} from "../../redux/reducers/User";

interface PropsType {
    user: User;
    username: string;
    containerStyles?: ViewStyle;
    animatedStyles: any;
    userNameFontSize: number;
}

export const Avatar = (props: PropsType) => {
    const {user, containerStyles, animatedStyles, username, userNameFontSize} = props;

    console.log(user)

    return (
        <View style={containerStyles}>
            <View style={{flexDirection: "row"}}>
                <Animated.View style={[styles.imageContainer, animatedStyles]}>
                    <Image
                        source={{uri: user?.avatar?.url}}
                        style={styles.image}
                    />

                </Animated.View>
                <Text style={{color: "#3d3d3d", marginTop: 10}}>"{user?.bio ? user?.bio : ""}"</Text>
            </View>
            <Text
                style={[styles.headerText,
                    {fontSize: userNameFontSize}]}
            >
                {username}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        borderRadius: 100,
        borderColor: "grey",
        borderWidth: 3,
        overflow: 'hidden',
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined,
    },
    headerText: {
        fontWeight: 'bold',
        color: "black",

    },
});
