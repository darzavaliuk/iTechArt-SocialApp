import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from '../screens/Tabs';
import { CreateTargetScreen } from '../screens/CreateTargetScreen/CreateTargetScreen';
import { ConcreteTargetScreen } from '../screens/ConcreteTargetScreen/ConcreteTargetScreen';
import PostDetailsScreen from '../screens/PostDetailsScreen/PostDetailsScreen';
import { ProfileScreen } from '../screens/ProfileScreen/ProfileScreen';
import CreateRepliesScreen from '../screens/CreateReplyScreen/CreateReplyScreen';
import EditProfile from '../components/EditProfile/EditProfile';
import FollowerCard from '../components/FollowerCard/FollowerCard';
import { TargetsScreen } from '../screens/TargetsScreen/TargetsScreen';
import { UserProfileScreen } from '../screens/UserProfileScreen/UserProfileScreen';
import PostScreen from '../screens/CreatePostScreen/CreatePostScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { MainStackParamList } from './MainStack';

const RootStack = createStackNavigator<MainStackParamList>();

export const Main = () => {
  const Stack = createNativeStackNavigator();
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <RootStack.Screen name="HomeScreen" component={Tabs} />
      <RootStack.Screen name="TargetScreen" component={CreateTargetScreen} />
      <RootStack.Screen name="ConcreteTargetScreen" component={ConcreteTargetScreen} />
      <RootStack.Screen name="UserProfile" component={ProfileScreen} />
      <RootStack.Screen name="CreateReplies" component={CreateRepliesScreen} />
      <RootStack.Screen name="PostDetails" component={PostDetailsScreen} />
      {/*<Stack.Screen name="PostLikeCard" component={PostLikeCard} />*/}
      <RootStack.Screen name="FollowerCard" component={FollowerCard} />
      <RootStack.Screen name="EditProfile" component={EditProfile} />
      <RootStack.Screen name="TargetsScreen" component={TargetsScreen} />
      <RootStack.Screen name="PostScreen" component={PostScreen} />
      <RootStack.Screen name="UserProfileScreen" component={UserProfileScreen} />
    </RootStack.Navigator>
  );
};
