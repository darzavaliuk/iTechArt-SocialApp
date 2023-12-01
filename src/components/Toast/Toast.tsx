import {Image, Platform, StyleSheet, Text} from 'react-native';
import React, {
    useState,
    useCallback,
    useImperativeHandle,
    forwardRef, useContext,
} from 'react';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    useAnimatedGestureHandler,
    withSequence,
    withDelay,
    withTiming,
    withSpring,
    runOnJS,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import ToastContext from "../../context/toasterContext";
import {toastStyles} from "./ToastStyle";

type ToastType =
    'success' | 'error' | 'warning';

type ToastOptions = {
    type: ToastType;
    text: string;
    duration: number;
};

const Toast = forwardRef(({}, ref) => {
    const toastTopAnimation = useSharedValue(-100);
    const [showing, setShowing] = useState(false);
    const [toastType, setToastType] = useState<ToastType>();
    const [toastText, setToastText] = useState('');
    const [toastDuration, setToastDuration] = useState(0);
    const TOP_VALUE = Platform.OS === 'ios' ? 60 : 20;
    const {showToast} = useContext(ToastContext);

    const setToastConfig = useCallback((config: ToastOptions) => {
        setShowing(true);
        setToastType(config.type);
        setToastText(config.text);
        setToastDuration(config.duration);
    }, [setToastType, setToastText, setToastDuration]);

    const show = useCallback(
        ({type, text, duration}: ToastOptions) => {
            setToastConfig({ type, text, duration });
            toastTopAnimation.value = withSequence(
                withTiming(TOP_VALUE),
                withDelay(
                    duration!,
                    withTiming(-100, null, finish => {
                        if (finish) {
                            runOnJS(setShowing)(false);
                        }
                    }),
                ),
            );
        },
        [TOP_VALUE, toastTopAnimation],
    );

    useImperativeHandle(
        ref,
        () => ({
            show,
        }),
        [show],
    );


    const animatedTopStyles = useAnimatedStyle(() => {
        return {
            top: toastTopAnimation.value,
        };
    });

    const gestureHandler = useAnimatedGestureHandler({
        onStart: (_, ctx) => {
            ctx.startY = toastTopAnimation.value;
        },
        onActive: (event, ctx) => {
            if (event.translationY < 100) {
                toastTopAnimation.value = withSpring(ctx.startY + event.translationY, {
                    damping: 600,
                    stiffness: 100,
                });
            }
        },
        onEnd: event => {
            if (event.translationY < 0) {
                toastTopAnimation.value = withTiming(-100, null, finish => {
                    if (finish) {
                        runOnJS(setShowing)(false);
                    }
                });
            } else if (event.translationY > 0) {
                toastTopAnimation.value = withSequence(
                    withTiming(TOP_VALUE),
                    withDelay(
                        toastDuration,
                        withTiming(-100, null, finish => {
                            if (finish) {
                                runOnJS(setShowing)(false);
                            }
                        }),
                    ),
                );
            }
        },
    });

    return (
        <>
            {showing && (
                <PanGestureHandler onGestureEvent={gestureHandler}>
                    <Animated.View
                        style={[
                            styles.toastContainer,
                            toastStyles[toastType!]?.container,
                            animatedTopStyles,
                        ]}
                    >
                        <Image source={toastStyles[toastType!]?.icon} style={styles.toastIcon}/>
                        <Text style={[styles.toastText, toastStyles[toastType!]?.text]}>
                            {toastText}
                        </Text>
                    </Animated.View>
                </PanGestureHandler>
            )}
        </>
    );
});

export default Toast;

const styles = StyleSheet.create({
    toastContainer: {
        position: 'absolute',
        top: 0,
        width: '90%',
        padding: 10,
        borderRadius: 18,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        zIndex: 1000000
    },
    toastText: {
        marginLeft: 14,
        fontSize: 16,
    },
    toastIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },

});
