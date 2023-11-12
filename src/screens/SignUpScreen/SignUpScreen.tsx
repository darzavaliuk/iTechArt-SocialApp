import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useCallback, useContext, useEffect, useState} from "react";
import {loadUser} from "../../redux/actions/loadUser";
import {useDispatch, useSelector} from "react-redux";
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import {registerUser} from "../../redux/actions/registerUser";
import {Formik} from "formik";
import {Easing, useSharedValue, withTiming} from "react-native-reanimated";
import {signUpValidationSchema} from "./signUpValidationScheme";
import {RootState} from "../../redux/reducers/rootReducer";
import {NavigationProp, useFocusEffect} from "@react-navigation/native";
import {AnimatedText} from "../LoginScreen/AnimatedText";
import {AnimatedBackground} from "./AnimatedBackground";
import {Loader} from "../../components/Loader/Loader";
import {resetErrorRequest} from "../../redux/actions/resetError";
import {COLORS} from "../../../constants/colors/colors";
import {FONT_FAMILY} from "../../../constants/fontFamily/fontFamily";
import toastType from "../../components/Toast/toastType";
import ToastContext from "../../context/toasterContext";

type Props = {
    navigation: NavigationProp<string>;
};

const selectLoading = (state: RootState) => state.user.loading;
const selectIsAuthenticated = (state: RootState) => state.user.isAuthenticated;
const selectError = (state: RootState) => state.user.error;

export const SignUpScreen: React.FC<Props> = ({navigation}) => {
    const [avatar, setAvatar] = useState('');
    const {showToast} = useContext(ToastContext);
    const dispatch = useDispatch();

    const error = useSelector(selectError);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const loading = useSelector(selectLoading);

    const uploadImage = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
            compressImageQuality: 0.8,
            includeBase64: true,
        }).then((image: ImageOrVideo | null) => {
            if (image) {
                if ("data" in image) {
                    setAvatar('data:image/jpeg;base64,' + image.data);
                }
            }
        });
    };

    useFocusEffect(
        useCallback(() => {
            if (error) {
                showToast(toastType.ERROR, error, 3000);
                dispatch(resetErrorRequest);
            }
            if (isAuthenticated) {
                loadUser()(dispatch);
            }

        }, [error, isAuthenticated])
    );

    const handleSubmit = (values: { name: string, email: string, password: string }) => {
        if (avatar === '' || values.name === '' || values.email === '') {
            showToast(toastType.WARNING, 'Please fill the all fields and upload avatar', 3000);
        } else {
            registerUser(values.name!, values.email!, values.password!, avatar!)(dispatch);
        }
    };

    const opacity = useSharedValue(0);

    useEffect(() => {
        startFadeInAnimation();
    }, []);

    const startFadeInAnimation = () => {
        opacity.value = withTiming(1, {
            duration: 800,
            easing: Easing.linear,
        });
    };

    return (
        <>
            {
                loading ? (
                    <Loader/>
                ) : (
                    <View style={styles.wrapper}>
                        <AnimatedBackground/>
                        <Formik
                            validationSchema={signUpValidationSchema}
                            initialValues={{email: '', password: '', name: '', passwordRepeat: ""}}
                            onSubmit={handleSubmit}
                        >
                            {({
                                  handleChange,
                                  handleBlur,
                                  handleSubmit,
                                  values,
                                  errors,
                                  isValid,
                              }) => (<>
                                <View style={styles.container}>
                                    <AnimatedText text={"Sign Up"} typingSpeed={200}/>
                                    <View style={{display: "flex", flexDirection: "row"}}>
                                        <Image source={require("../../../assets/images/mail.png")}
                                               style={styles.image}/>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Email"
                                            id="email"
                                            onChangeText={handleChange('email')}
                                            onBlur={handleBlur('email')}
                                            value={values.email}
                                            keyboardType="email-address"
                                        />
                                    </View>
                                    {errors.email &&
                                        <Text style={styles.error}>{errors.email}</Text>
                                    }
                                    <View style={{display: "flex", flexDirection: "row"}}>
                                        <Image source={require("../../../assets/images/user.png")}
                                               style={styles.image}/>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Name"
                                            id="name"
                                            onChangeText={handleChange('name')}
                                            onBlur={handleBlur('name')}
                                            value={values.name}
                                            keyboardType="default"
                                        />
                                    </View>
                                    {errors.name &&
                                        <Text style={styles.error}>{errors.name}</Text>
                                    }
                                    <View style={{display: "flex", flexDirection: "row"}}>
                                        <Image source={require("../../../assets/images/password.png")}
                                               style={styles.image}/>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Password"
                                            id="password"
                                            onChangeText={handleChange('password')}
                                            onBlur={handleBlur('password')}
                                            value={values.password}
                                            keyboardType="visible-password"
                                        />
                                    </View>
                                    {errors.password &&
                                        <Text style={styles.error}>{errors.password}</Text>
                                    }
                                    <View style={{display: "flex", flexDirection: "row"}}>
                                        <Image source={require("../../../assets/images/password.png")}
                                               style={styles.image}/>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Repeat password"
                                            id="passwordRepeat"
                                            onChangeText={handleChange('passwordRepeat')}
                                            onBlur={handleBlur('passwordRepeat')}
                                            value={values.passwordRepeat}
                                        />
                                    </View>
                                    {errors.passwordRepeat &&
                                        <Text style={styles.error}>{errors.passwordRepeat}</Text>
                                    }
                                    <TouchableOpacity
                                        onPress={uploadImage}>
                                        <Image style={{width: 80, height: 80}}
                                               source={{
                                                   uri: avatar
                                                       ? avatar
                                                       : 'https://cdn-icons-png.flaticon.com/128/568/568717.png',
                                               }}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity disabled={!isValid} style={styles.loginButton}
                                                      onPress={handleSubmit}>
                                        <Text style={styles.loginText}>
                                            Sign Up
                                        </Text>
                                    </TouchableOpacity>

                                </View>
                            </>)}
                        </Formik>
                        <Text style={styles.signUpText}
                              onPress={() => navigation.navigate('Login' as never)}>
                            Already have an account? <Text style={styles.signUpButton}>Sign in</Text>
                        </Text>
                    </View>)}
        </>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: COLORS.WHITEBLUE
    },
    container: {
        flex: 1,
        flexDirection: "column",
        paddingHorizontal: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        color: COLORS.DARKBLUE,
        fontFamily: FONT_FAMILY.EXTRABOLD,
        fontSize: 60,
    },
    input: {
        backgroundColor: COLORS.WHITE,
        borderRadius: 40,
        paddingLeft: 45,
        paddingRight: 10,
        marginRight: 0,
        marginHorizontal: -20,
        fontSize: 20,
        letterSpacing: -1,
        fontFamily: FONT_FAMILY.REGULAR,
        flex: 1,
        marginVertical: 5,

    },
    image: {
        height: 20,
        width: 20,
        zIndex: 1000,
        top: 18,
        left: 15,
    },
    error: {
        fontSize: 12,
        fontFamily: FONT_FAMILY.REGULAR,
        letterSpacing: -0.3,
        color: "red",
    },
    signUpText: {
        color: COLORS.DARKBLUE,
        fontSize: 14,
        marginBottom: 20,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center"
    },
    signUpButton: {
        borderStyle: "dotted",
        borderWidth: 2,
        borderColor: "black",
        fontFamily: FONT_FAMILY.EXTRABOLD,
        fontSize: 16,
        alignItems: "center",
        justifyContent: "center"
    },
    loginText: {
        fontFamily: FONT_FAMILY.REGULAR,
        fontWeight: "900",
        color: COLORS.WHITE,
        fontSize: 24
    },
    loginButton: {
        backgroundColor: COLORS.DARKBLUE,
        width: 160,
        borderRadius: 150,
        alignItems: "center",
        paddingVertical: 20,
        borderStyle: "dotted",
        borderWidth: 2,
        borderColor: COLORS.WHITEBLUE,
        margin: 10,
    },
    animatedContainer: {
        height: 80,
    },
})

