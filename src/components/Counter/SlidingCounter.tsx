import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {
    PanGestureHandler,
    PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
    interpolate,
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';

const ICON_SIZE = 20;

const clamp = (value: number, min: number, max: number) => {
    'worklet';
    return Math.min(Math.max(value, min), max);
};

const BUTTON_WIDTH = 150;

const SlidingCounter = ({setValue, map, id}) => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const [count, setCount] = useState(0);

    const MAX_SLIDE_OFFSET = BUTTON_WIDTH * 0.3;

    const incrementCount = () => {
        map.set(id, count + 1 + "")
        setCount((currentCount) => currentCount + 1)
        setValue((currentCount) => currentCount + 1)
    }

    const decrementCount = useCallback(() => {
        map.set(id, count - 1 + "")
        setCount((currentCount) => currentCount - 1);
        setValue(count)
    }, []);

    const resetCount = useCallback(() => {
        setCount(0);
    }, []);

    const onPanGestureEvent =
        useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
            onActive: (event) => {
                translateX.value = clamp(
                    event.translationX,
                    -MAX_SLIDE_OFFSET,
                    MAX_SLIDE_OFFSET
                );

                translateY.value = clamp(event.translationY, 0, MAX_SLIDE_OFFSET);
            },
            onEnd: () => {
                if (translateX.value === MAX_SLIDE_OFFSET) {
                    runOnJS(incrementCount)();

                } else if (translateX.value === -MAX_SLIDE_OFFSET) {
                    runOnJS(decrementCount)();
                } else if (translateY.value === MAX_SLIDE_OFFSET) {
                    runOnJS(resetCount)();
                }

                translateX.value = withSpring(0);
                translateY.value = withSpring(0);
            },
        });

    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {translateX: translateX.value},
                {translateY: translateY.value},
            ],
        };
    }, []);

    const rPlusMinusIconStyle = useAnimatedStyle(() => {
        const opacityX = interpolate(
            translateX.value,
            [-MAX_SLIDE_OFFSET, 0, MAX_SLIDE_OFFSET],
            [0.4, 0.8, 0.4]
        );

        const opacityY = interpolate(
            translateY.value,
            [0, MAX_SLIDE_OFFSET],
            [1, 0]
        );

        return {
            opacity: opacityX * opacityY,
        };
    }, []);

    const rCloseIconStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            translateY.value,
            [0, MAX_SLIDE_OFFSET],
            [0, 0.8]
        );

        return {
            opacity,
        };
    }, []);

    const rButtonStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: translateX.value * 0.1,
                },
                {translateY: translateY.value * 0.1},
            ],
        };
    }, []);

    const [editing, setEditing] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleLongPress = () => {
        setEditing(true);
    };

    const handlePress = () => {
        if (!editing) {

        }
    };

    const handleChangeText = (text) => {
        setInputValue(text);

    };

    const handleSubmit = () => {
        const newValue = parseInt(inputValue, 10);
        if (!isNaN(newValue)) {
            setCount(newValue);
            map.set(id, newValue + "")
        }
        setEditing(false);
        setInputValue('');
    };

    return (
        <Animated.View style={[styles.button, rButtonStyle]}>
            <Animated.View style={rPlusMinusIconStyle}>
                <Text>-</Text>
            </Animated.View>
            <Animated.View style={rCloseIconStyle}>
                <Text>x</Text>
            </Animated.View>
            <Animated.View style={rPlusMinusIconStyle}>
                <Text>+</Text>
            </Animated.View>
            <View
                style={{
                    ...StyleSheet.absoluteFillObject,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <PanGestureHandler onGestureEvent={onPanGestureEvent}>

                    <Animated.View style={[styles.circle, rStyle]}>
                        <TouchableOpacity
                            onPress={handlePress}
                            onLongPress={handleLongPress}
                        >
                            {editing ? (
                                <TextInput
                                    style={styles.input}
                                    value={inputValue}
                                    onChangeText={handleChangeText}
                                    onSubmitEditing={handleSubmit}
                                    autoFocus={true}
                                    keyboardType="numeric"
                                />
                            ) : (
                                <Text style={styles.countText}>{count}</Text>
                            )}
                        </TouchableOpacity>
                    </Animated.View>

                </PanGestureHandler>
            </View>
        </Animated.View>
    );
};

export default SlidingCounter;

const styles = StyleSheet.create({
    button: {
        height: 40,
        width: BUTTON_WIDTH,
        backgroundColor: '#111111',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        marginTop: 10
    },
    countText: {
        fontSize: 25,
        color: 'white',
    },
    circle: {
        height: 30,
        width: 120,
        backgroundColor: '#232323',
        borderRadius: 25,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
