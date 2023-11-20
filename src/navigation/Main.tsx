import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Tabs from "../screens/Tabs";
import {CreateTargetScreen} from "../screens/CreateTargetScreen/CreateTargetScreen";
import {ConcreteTargetScreen} from "../screens/ConcreteTargetScreen/ConcreteTargetScreen";
import PostDetailsScreen from "../screens/PostDetailsScreen/PostDetailsScreen";
import {ProfileScreen} from "../screens/ProfileScreen/ProfileScreen";
import CreateRepliesScreen from "../screens/CreateReplyScreen/CreateReplyScreen";
import EditProfile from "../components/EditProfile/EditProfile";
import FollowerCard from "../components/FollowerCard/FollowerCard";
import {TargetsScreen} from "../screens/TargetsScreen/TargetsScreen";
import {UserProfileScreen} from "../screens/UserProfileScreen/UserProfileScreen";
import PostScreen from "../screens/CreatePostScreen/CreatePostScreen";

export const Main = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="HomeScreen" component={Tabs}/>
            <Stack.Screen name="TargetScreen" component={CreateTargetScreen}/>
            <Stack.Screen name="ConcreteTargetScreen" component={ConcreteTargetScreen}/>
            <Stack.Screen name="UserProfile" component={ProfileScreen} />
            <Stack.Screen name="CreateReplies" component={CreateRepliesScreen} />
            <Stack.Screen name="PostDetails" component={PostDetailsScreen} />
            {/*<Stack.Screen name="PostLikeCard" component={PostLikeCard} />*/}
            <Stack.Screen name="FollowerCard" component={FollowerCard} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="TargetsScreen" component={TargetsScreen} />
            <Stack.Screen name="PostScreen" component={PostScreen} />
            <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
        </Stack.Navigator>
    );
};
