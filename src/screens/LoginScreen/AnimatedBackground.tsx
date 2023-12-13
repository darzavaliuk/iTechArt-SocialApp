import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';

export const AnimatedBackground = () => {
  const circleSizeLittleCircle = useSharedValue(0);
  const circleSizeBigCircle = useSharedValue(0);
  const circleSizeDownCircle = useSharedValue(0);

  useEffect(() => {
    animateCircles();
  }, []);

  const animateCircles = () => {
    circleSizeLittleCircle.value = withTiming(200, {
      duration: 1000,
      easing: Easing.linear,
    });

    circleSizeBigCircle.value = withTiming(300, {
      duration: 1000,
      easing: Easing.linear,
    });

    circleSizeDownCircle.value = withTiming(200, {
      duration: 1000,
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

  const animatedStyleBigCircle = useAnimatedStyle(() => {
    return {
      width: circleSizeBigCircle.value,
      height: circleSizeBigCircle.value,
      borderRadius: circleSizeBigCircle.value / 2,
    };
  });

  const animatedStyleDownCircle = useAnimatedStyle(() => {
    return {
      width: circleSizeDownCircle.value,
      height: circleSizeDownCircle.value,
      borderRadius: circleSizeDownCircle.value / 2,
    };
  });

  return (
    <>
      <Animated.View style={[styles.circleLittle, animatedStyleLittleCircle]} />
      <Animated.View style={[styles.circleBig, animatedStyleBigCircle]} />
      <Animated.View style={[styles.circleDown, animatedStyleDownCircle]} />
    </>
  );
};

const styles = StyleSheet.create({
  circleLittle: {
    width: 200,
    height: 200,
    borderRadius: 300,
    backgroundColor: '#4b37bc',
    position: 'absolute',
    top: -40,
    left: -40,
  },
  circleBig: {
    width: 300,
    height: 300,
    borderRadius: 300,
    backgroundColor: '#0a1e51',
    position: 'absolute',
    top: 250,
    right: -130,
  },
  circleDown: {
    width: 200,
    height: 200,
    borderRadius: 300,
    backgroundColor: '#52d3fc',
    position: 'absolute',
    top: 600,
    left: -120,
  },
});
