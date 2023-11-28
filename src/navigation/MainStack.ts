import {NavigationProp, RouteProp} from "@react-navigation/native";
import {StackScreenProps} from "@react-navigation/stack";
import {Post, User} from "../redux/reducers/User";

export type MainStackParamList = {
    HomeScreen: undefined;
    TargetScreen: undefined;
    ConcreteTargetScreen: undefined;
    UserProfile: {
        id: string;
    };
    CreateReplies: {
        route: CreateRepliesRouteProp,
        navigation: CreateRepliesNavigationProp,
        item: Post,
        postId: string
    };
    PostDetails: {
        navigation?: CreateRepliesNavigationProp,
        data: Post
    };
    FollowerCard: undefined;
    EditProfile: undefined;
    TargetsScreen: undefined;
    PostScreen: undefined;
    UserProfileScreen:  {
        id: string;
    };
};

type CreateRepliesRouteProp = RouteProp<MainStackParamList, 'CreateReplies'>;

type CreateRepliesNavigationProp = NavigationProp<MainStackParamList, 'CreateReplies'>;

export type RootStackScreenProps<T extends keyof MainStackParamList> =
    StackScreenProps<MainStackParamList, T>;
