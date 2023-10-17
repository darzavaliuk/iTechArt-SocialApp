import {Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import {loadUser} from "../../redux/actions/loadUser";
import {useDispatch, useSelector} from "react-redux";
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import {registerUser} from "../../redux/actions/registerUser";
import {Formik} from "formik";
import {Easing, useSharedValue, withTiming} from "react-native-reanimated";
import {styles} from "./style";
import {signUpValidationSchema} from "./signUpValidationScheme";
import {RootState} from "../../redux/reducers/rootReducer";
import {NavigationProp} from "@react-navigation/native";
import {displayErrorMessage} from "../../utils/displayMessage";
import {AnimatedText} from "../LoginScreen/AnimatedText";
import {AnimatedBackground} from "./AnimatedBackground";

type Props = {
    navigation: NavigationProp<string>;
};
export const SignUpScreen: React.FC<Props> = ({navigation}) => {
    const [avatar, setAvatar] = useState('');
    const dispatch = useDispatch();
    const selectError = (state: RootState) => state.user.error;
    const selectIsAuthenticated = (state: RootState) => state.user.isAuthenticated;
    const error = useSelector(selectError);
    const isAuthenticated = useSelector(selectIsAuthenticated);

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

    useEffect(() => {
        if (error) {
            displayErrorMessage(error)
        }
        if (isAuthenticated) {
            loadUser()(dispatch);
        }
    }, [error, isAuthenticated]);

    const handleSubmit = (values: { name: string, email: string, password: string }) => {
        if (avatar === '' || values.name === '' || values.email === '') {
            displayErrorMessage('Please fill the all fields and upload avatar')
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
                            <Image source={require("../../../assets/images/mail.png")} style={styles.image}/>
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
                            <Image source={require("../../../assets/images/user.png")} style={styles.image}/>
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
                            <Image source={require("../../../assets/images/password.png")} style={styles.image}/>
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
                            <Image source={require("../../../assets/images/password.png")} style={styles.image}/>
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
                        <TouchableOpacity disabled={!isValid} style={styles.loginButton} onPress={handleSubmit}>
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
        </View>
    )
}
