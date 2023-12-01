import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {SafeAreaView, TouchableOpacity, View, Text, Image, FlatList} from "react-native";
import {followUserAction, unfollowUserAction} from "../../redux/actions/followUser";
import {loadUser} from "../../redux/actions/loadUser";

type Props = {
    route: any;
    navigation: any;
};

const FollowerCard = ({navigation, route}: Props) => {
    const followers = route.params.followers;
    const item = route.params.item;
    const following = route.params.following;
    const [data, setData] = useState(followers);
    const [active, setActive] = useState(0);
    const {user, users} = useSelector((state: any) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (users) {
            if (followers) {
                const updatedUsers = [...users, user];
                const fullUsers = updatedUsers.filter((user: any) =>
                    followers.some((item: any) => item.userId === user._id),
                );
                setData(fullUsers);
            }
            if (active === 1) {
                if (following) {
                    const updatedUsers = [...users, user];
                    const fullUsers = updatedUsers.filter((user: any) =>
                        following.some((item: any) => item.userId === user._id),
                    );
                    setData(fullUsers);
                }
            }
        }
    }, [followers, following, active, users]);

    return (
        <SafeAreaView>
            <View style={{ padding: 3, marginBottom: 2, position: 'relative' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image
                            source={{
                                uri: 'https://cdn-icons-png.flaticon.com/512/2961/2961937.png',
                            }}
                            style={{height: 25, width: 25}}
                        />
                    </TouchableOpacity>
                    <Text style={{ paddingLeft: 3, fontSize: 20, fontWeight: '600', color: '#000' }}>
                        {item?.name}
                    </Text>
                </View>
                <View style={{ width: '80%', paddingTop: 5, marginHorizontal: 'auto', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => setActive(0)}>
                        <Text
                            style={{ fontSize: 18, paddingLeft: 3, color: '#000', opacity: active === 0 ? 1 : 0.6 }}>
                            Followers
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setActive(1)}>
                        <Text
                            style={{ fontSize: 18, paddingLeft: 3, color: '#000', opacity: active === 1 ? 1 : 0.6 }}>
                            Following
                        </Text>
                    </TouchableOpacity>
                </View>

                {active === 0 ? (
                    <View style={{ width: '40%', position: 'absolute', height: 1, backgroundColor: 'black', left: -10, bottom: 0 }} />
                ) : active === 1 ? (
                    <View style={{ width: '30%', position: 'absolute', height: 1, backgroundColor: 'black', right: '31%', bottom: 0 }} />
                ) : (
                    <View style={{ width: '32%', position: 'absolute', height: 1, backgroundColor: 'black', right: 0, bottom: 0 }} />
                )}
            </View>

            {active === 0 && (
                <Text style={{ paddingVertical: 2, textAlign: 'center', color: 'black', fontSize: 16 }}>
                    {followers?.length} followers
                </Text>
            )}

            {active === 1 && (
                <Text style={{ paddingVertical: 2, textAlign: 'center', color: 'black', fontSize: 16 }}>
                    {following?.length} following
                </Text>
            )}

            {active !== 2 && (
                <FlatList
                    data={data}
                    renderItem={({item}) => {
                        const handleFollowUnfollow = async (e: any) => {
                            try {
                                if (e.followers.find((i: any) => i.userId === user._id)) {
                                    await unfollowUserAction({
                                        userId: user._id,
                                        users,
                                        followUserId: e._id,
                                    })(dispatch);
                                } else {
                                    await followUserAction({
                                        userId: user._id,
                                        users,
                                        followUserId: e._id,
                                    })(dispatch);
                                }
                            } catch (error) {
                                console.log(error, 'error');
                            }
                            loadUser()(dispatch);
                        };

                        return (
                            <TouchableOpacity
                                style={{ width: '95%', marginHorizontal: 'auto', paddingVertical: 3, flexDirection: 'row', justifyContent: 'space-between' }}
                                onPress={() =>
                                    navigation.navigate('UserProfile', {
                                        item,
                                    })
                                }>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image
                                        source={{ uri: item?.avatar?.url }}
                                        style={{ width: 40, height: 40, borderRadius: 100 }}
                                    />
                                    <View style={{ paddingLeft: 3 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', position: 'relative' }}>
                                            <Text style={{ fontSize: 18, color: 'black' }}>
                                                {item?.name}
                                            </Text>
                                            {item.role === 'Admin' && (
                                                <Image
                                                    source={{
                                                        uri: 'https://cdn-icons-png.flaticon.com/128/1828/1828640.png',
                                                    }}
                                                    style={{ width: 15, height: 15, marginLeft: 1 }}
                                                />
                                            )}
                                        </View>
                                        <Text style={{ fontSize: 16, color: '#000000ba' }}>
                                            {item?.userName}
                                        </Text>
                                    </View>
                                </View>
                                {user._id !== item._id && (
                                    <TouchableOpacity
                                        style={{ borderRadius: 8, width: 100, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 35, borderWidth: 1, borderColor: '#0000004b' }}
                                        onPress={() => handleFollowUnfollow(item)}>
                                        <Text style={{ color: 'black' }}>
                                            {item?.followers?.find((i: any) => i.userId === user._id)
                                                ? 'Following'
                                                : 'Follow'}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </TouchableOpacity>
                        );
                    }}
                />
            )}

            {active === 2 && (
                <Text style={{ fontSize: 18, textAlign: 'center', paddingTop: 10, color: 'black' }}>No Pending</Text>
            )}
        </SafeAreaView>
    );
};

export default FollowerCard;
