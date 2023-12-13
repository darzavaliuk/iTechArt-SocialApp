import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';

export const AnimatedBackground = () => {
  const circleSizeLittleCircle = useSharedValue(0);

  useEffect(() => {
    animateCircles();
  }, []);

  const animateCircles = () => {
    circleSizeLittleCircle.value = withTiming(200, {
      duration: 500,
      easing: Easing.linear,
    });
  };

  const animatedStyleLittleCircle = useAnimatedStyle(() => {
    return {
      width: circleSizeLittleCircle.value,
      height: circleSizeLittleCircle.value,
      borderRadius: circleSizeLittleCircle.value / 2,
    };
  });

  return (
    <>
      <Animated.View style={styles.circleBig} />
      <Animated.View style={[styles.circleDown, animatedStyleLittleCircle]} />
    </>
  );
};

const styles = StyleSheet.create({
  circleBig: {
    width: 300,
    height: 300,
    borderRadius: 300,
    backgroundColor: '#0a1e51',
    position: 'absolute',
    top: 250,
    left: -170,
  },
  circleLittle: {
    width: 200,
    height: 200,
    borderRadius: 300,
    backgroundColor: '#52d3fc',
    position: 'absolute',
    top: -0,
    right: -100,
  },
  circleDown: {
    width: 200,
    height: 200,
    borderRadius: 300,
    backgroundColor: '#4b37bc',
    position: 'absolute',
    top: 750,
    right: 50,
  },
});
