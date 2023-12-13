import React from 'react';
import { StyleSheet, Animated } from 'react-native';

interface PropsType {
  animatedHeaderStyles: any;
  animatedTextStyles: any;
  userName: string;
  userNameFontSize: number;
}

export const Header = (props: PropsType) => {
  const { animatedHeaderStyles, animatedTextStyles, userName, userNameFontSize } = props;

  return (
    <Animated.View style={[styles.header, animatedHeaderStyles]}>
      <Animated.View style={styles.semiCircle} />
      <Animated.Text style={[styles.username, { fontSize: userNameFontSize }, animatedTextStyles]}>
        {userName}
      </Animated.Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: '#3C1874',
    paddingHorizontal: 10,
  },
  usernameContainer: {
    position: 'absolute',
  },
  username: {
    position: 'absolute',
    fontWeight: 'bold',
    color: 'white',
    zIndex: 100000,
    opacity: 1,
  },
  semiCircle: {
    width: '110%',
    height: 40,
    top: 0,
    zIndex: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Полупрозрачный цвет полукруга
    borderBottomStartRadius: 200,
  },
});
