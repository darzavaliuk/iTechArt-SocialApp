import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import HomeScreen from "../navigation/Home";
import OnboardingScreen from "../screens/OnboardingScreen/BoardScreen";
const Stack = createStackNavigator();
export const AppStack = () => {
    return (
        <>
            <HomeScreen />
            {/*<NavigationContainer>*/}
            {/*    <Stack.Navigator screenOptions={{headerShown: false}}>*/}
            {/*        { (*/}
            {/*            <Stack.Screen*/}
            {/*                name="OnboardingScreen"*/}
            {/*                component={OnboardingScreen}*/}
            {/*            />*/}
            {/*        )}*/}
            {/*        <Stack.Screen name="HomeScreen" component={HomeScreen}/>*/}
            {/*    </Stack.Navigator>*/}
            {/*</NavigationContainer>*/}
        </>
    )
}
