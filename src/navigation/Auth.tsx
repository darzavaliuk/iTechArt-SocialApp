import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen} from "../screens/LoginScreen/Login";
import {ForgetPasswordScreen} from "../screens/ForgetPasswordScreen/ForgetPasswordScreen";
import {SignUpScreen} from "../screens/SignUpScreen/SignUpScreen";
import {CodeVerify} from "../screens/CodeVerifyScreen/CodeVerify";
import {ResetPasswordScreen} from "../screens/ResetPasswordScreen/ResetPasswordScreen";
import OnboardingScreen from "../screens/OnboardingScreen/BoardScreen";

const Stack = createNativeStackNavigator();

const Auth = () => {
    return (
            <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{
                    headerShown: false,
                }}>
                <Stack.Screen
                    name="OnboardingScreen"
                    component={OnboardingScreen}
                />
                <Stack.Screen name="Login" component={LoginScreen}/>
                <Stack.Screen name="Signup" component={SignUpScreen} options={{animation: "slide_from_left"}}/>
                <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} options={{animation: "slide_from_right"}}/>
                <Stack.Screen name="CodeVerify" component={CodeVerify} options={{animation: "slide_from_right"}}/>
                <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{animation: "slide_from_right"}}/>
            </Stack.Navigator>
    );
};

export default Auth;
