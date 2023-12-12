import {
    Animated,
    Dimensions,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text, TouchableOpacity,
    View
} from 'react-native';
import React, {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import PostCard from "../PostsDisplayScreen/PostCard/PostCard";
import {getAnimatedValues} from "../ProfileScreen/Animated";
import {getHeightForElements} from "../ProfileScreen/Helpers";
import {Header} from "../ProfileScreen/Header";
import {Avatar} from "../ProfileScreen/Avatar";
import getProfile from "../../redux/actions/getUser";
import {getPosts} from "../../redux/actions/getPostsById";
import {getReplies} from "../../redux/actions/getRepliesById";
import {RootStackScreenProps} from "../../navigation/MainStack";
import {selectPostsID, selectProfileUser, selectReplies, selectUser} from "../../redux/selectors";

export const UserProfileScreen = ({route}: RootStackScreenProps<'UserProfileScreen'>) => {
    const [active, setActive] = useState(0);
    const {token} = useSelector(selectUser);
    const {userProfile} = useSelector(selectProfileUser);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const {posts} = useSelector(selectPostsID);
    const {replies} = useSelector(selectReplies);

    useEffect(() => {
        getProfile(route.params.id, token)(dispatch)
        getPosts(route.params.id, token)(dispatch)
        getReplies(route.params.id, token)(dispatch)
    }, []);

    const [scrollY] = useState(new Animated.Value(0));

    const {
        headerHeight,
        imageSize,
        imageMarginTop,
        headerZIndex,
        headerTitleBottom,
    } = getAnimatedValues(scrollY, Dimensions.get('window').height);

    const {headerFontSize, avatarFontSize} = getHeightForElements(Dimensions.get('window').height
    );

    return (
        <SafeAreaView style={styles.container}>
            {userProfile && posts && replies &&
                <View style={{backgroundColor: "white", flex: 1, marginHorizontal: 10}}>
                    <Header
                        userName={userProfile?.name}
                        animatedHeaderStyles={{height: headerHeight, zIndex: headerZIndex}}
                        animatedTextStyles={{bottom: headerTitleBottom}}
                        userNameFontSize={headerFontSize}
                    />

                    <ScrollView showsVerticalScrollIndicator={false}
                                style={{
                                    flex: 1,
                                    elevation: 1,

                                }}
                                scrollEventThrottle={1}
                                onScroll={
                                    Animated.event([
                                        {nativeEvent: {contentOffset: {y: scrollY}}}
                                    ])
                                }

                    >
                        <Avatar
                            user={userProfile}
                            username={userProfile.name}
                            containerStyles={styles.avatarContainer}
                            userNameFontSize={avatarFontSize}
                            animatedStyles={{width: imageSize, height: imageSize, marginTop: imageMarginTop}}
                        />

                        <TouchableOpacity
                        >
                            <View style={styles.statsContainer}>
                                <View style={styles.statsBox}>
                                    <Text
                                        style={[styles.text, {fontSize: 30}]}>{userProfile.targets?.length || 0}</Text>
                                    <Text style={[styles.text, styles.subText, {color: "#595959"}]}>Targets</Text>
                                </View>

                                <View style={{
                                    backgroundColor: "#0e1c4c",
                                    width: 10,
                                    alignSelf: "center",
                                    borderRadius: 20,
                                    height: 80
                                }}></View>

                                <Text style={[styles.text, {fontSize: 30}]}>{userProfile?.followers?.length}</Text>
                                <Text style={[styles.text, styles.subText, {color: "#595959"}]}>Followers</Text>

                                <View style={{
                                    backgroundColor: "#0e1c4c",
                                    width: 10,
                                    alignSelf: "center",
                                    borderRadius: 20,
                                    height: 80
                                }}></View>

                                <TouchableOpacity style={styles.statsBox} onPress={() =>
                                    navigation.navigate('FollowerCard', {
                                        followers: userProfile?.followers,
                                        following: userProfile?.following,
                                    })
                                }>
                                    <Text style={[styles.text, {fontSize: 30}]}>{userProfile?.following?.length}</Text>
                                    <Text style={[styles.text, styles.subText, {color: "#595959"}]}>Following</Text>
                                </TouchableOpacity>
                            </View>

                        </TouchableOpacity>

                        <View style={{margin: 10, marginTop: 20}}>
                            <View style={{}}>
                                <View style={{
                                    width: '100%',
                                    marginHorizontal: 'auto',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between'
                                }}>
                                    <TouchableOpacity onPress={() => setActive(0)} style={{
                                        flex: 1,
                                        backgroundColor: active === 0 ? '#3C1874' : '#00000060',
                                        borderRadius: 5,
                                        marginHorizontal: 1
                                    }}>
                                        <Text
                                            style={{
                                                textAlign: "center",
                                                fontSize: 18,
                                                marginLeft: 10,
                                                padding: 5,
                                                color: active === 0 ? 'white' : '#00000060',

                                            }}>
                                            Posts
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => setActive(1)} style={{
                                        flex: 1,
                                        backgroundColor: active === 1 ? '#3C1874' : '#00000060',
                                        borderRadius: 5,
                                        marginHorizontal: 1
                                    }}>
                                        <Text
                                            style={{
                                                textAlign: "center",
                                                fontSize: 18,
                                                marginLeft: 10,
                                                padding: 5,
                                                color: active === 1 ? 'white' : '#00000060'
                                            }}>
                                            Replies
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>

                        {active === 0 && (
                            <>
                                {posts && posts?.map((item) => (
                                    <PostCard postId={item._id} key={item._id} item={item}/>
                                ))}
                            </>
                        )}

                        {active === 1 && (
                            <>
                                {replies && Array.isArray(replies) && replies?.map((item) => (
                                    <PostCard postId={item._id} key={item._id} item={item} replies={true}></PostCard>
                                ))}
                            </>
                        )}

                        {active === 0 && (
                            <>
                                {posts.length === 0 && (
                                    <Text style={{color: 'black', fontSize: 14, marginTop: 8, textAlign: 'center'}}>
                                        {userProfile.name} has no posts yet!
                                    </Text>
                                )}
                            </>
                        )}

                        {active === 1 && (
                            <>
                                {replies?.length === 0 && (
                                    <Text style={{color: 'black', fontSize: 14, marginTop: 8, textAlign: 'center'}}>
                                        {userProfile.name} has no replies yet!
                                    </Text>
                                )}
                            </>
                        )}
                    </ScrollView>
                </View>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#3C1874",
    },
    avatarContainer: {
        marginLeft: '3%'
    },
    username: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: -3,
    },
    tweetsCount: {
        fontSize: 13,
    },
    header: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'flex-end',
        borderBottomWidth: 1,
        borderBottomColor: '#EAEAEA',
        borderRadius: 600,
    },
    text: {
        fontFamily: "HelveticaNeue",
        fontWeight: "bold",
        color: "#282b2d"
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginHorizontal: 16
    },
    subText: {
        fontSize: 12,
        color: "#2b2e2f",
        textTransform: "uppercase",
        fontWeight: "500"
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: "hidden"
    },
    dm: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    active: {
        backgroundColor: "#34FFB9",
        position: "absolute",
        bottom: 28,
        left: 10,
        padding: 4,
        height: 20,
        width: 20,
        borderRadius: 10
    },
    add: {
        backgroundColor: "#41444B",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 20
    },
    statsBox: {
        alignItems: "center",
        flex: 1,
        // backgroundColor: "#283747",
        // marginHorizontal: 30,
        paddingVertical: 10,
        // backgroundColor: "#afacef",
        // borderRadius: 20,
        // marginHorizontal: 20
    },
    mediaImageContainer: {
        width: 180,
        height: 200,
        borderRadius: 12,
        overflow: "hidden",
        marginHorizontal: 10
    },
    mediaCount: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: "50%",
        marginTop: -50,
        marginLeft: 30,
        width: 100,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        shadowColor: "rgba(0, 0, 0, 0.38)",
        shadowOffset: {width: 0, height: 10},
        shadowRadius: 20,
        shadowOpacity: 1
    },
    recent: {
        marginLeft: 78,
        marginTop: 32,
        marginBottom: 6,
        fontSize: 10
    },
    recentItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 16
    },
    activityIndicator: {
        backgroundColor: "#9894ef",
        padding: 4,
        height: 12,
        width: 12,
        borderRadius: 6,
        marginTop: 3,
        marginRight: 20
    }
});
