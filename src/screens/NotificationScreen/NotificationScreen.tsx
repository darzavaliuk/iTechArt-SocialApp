import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    Image,
    RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Loader} from "../../components/Loader/Loader";
import getTimeDuration from "../PostsDisplayScreen/PostCard/timeGen";
import axios from "axios";
import {URI} from "../../URI";
import {getNotifications} from "../../redux/actions/notificationAction";
import {useNavigation} from "@react-navigation/native";

const NotificationScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const {notifications, isLoading} = useSelector(
        (state: any) => state.notification,
    );
    const [refreshing, setRefreshing] = useState(false);
    const {posts} = useSelector((state: any) => state.post);
    const {token, users} = useSelector((state: any) => state.user);
    const [active, setActive] = useState(0);
    const refreshingHeight = 100;

    const labels = ['All', 'Replies'];

    const handleTabPress = (index: number) => {
        setActive(index);
    };

    useEffect(() => {
        getNotifications()(dispatch);
    }, []);


    return (
        <>
            {isLoading ? (
                <Loader/>
            ) : (
                <>
                    <SafeAreaView>
                        <View style={{padding: 16, marginBottom: 190}}>
                            <Text style={{fontSize: 24, fontWeight: 'bold', color: 'black'}}>Activity</Text>

                            <View style={{flexDirection: 'row', marginTop: 12, justifyContent: 'space-between'}}>
                                {labels.map((label, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={{
                                            width: 105,
                                            height: 38,
                                            borderRadius: 8,
                                            backgroundColor: active === index ? 'black' : '#fff',
                                            borderWidth: active === index ? 1 : 0,
                                            borderColor: 'rgba(0,0,0,0.29)',
                                        }}
                                        onPress={() => handleTabPress(index)}>
                                        <Text
                                            style={{
                                                fontSize: 20,
                                                fontWeight: active !== index ? 'normal' : 'bold',
                                                color: active !== index ? 'black' : '#fff',
                                                textAlign: 'center',
                                                paddingTop: 6,
                                            }}>
                                            {label}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            {active === 0 && notifications.length === 0 && (
                                <View
                                    style={{width: '100%', height: 80, alignItems: 'center', justifyContent: 'center'}}>
                                    <Text style={{fontSize: 16, color: 'black', marginTop: 5}}>You have no activity
                                        yet!</Text>
                                </View>
                            )}

                            {active === 1 && (
                                <View
                                    style={{width: '100%', height: 80, alignItems: 'center', justifyContent: 'center'}}>
                                    <Text style={{fontSize: 16, color: 'black', marginTop: 5}}>You have no replies
                                        yet!</Text>
                                </View>
                            )}

                            {active === 2 && (
                                <View
                                    style={{width: '100%', height: 80, alignItems: 'center', justifyContent: 'center'}}>
                                    <Text style={{fontSize: 16, color: 'black', marginTop: 5}}>You have no mentions
                                        yet!</Text>
                                </View>
                            )}

                            {active === 0 && (
                                <FlatList
                                    data={notifications}
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={refreshing}
                                            onRefresh={() => {
                                                setRefreshing(true);
                                                getNotifications()(dispatch).then(() => {
                                                    setRefreshing(false);
                                                });
                                            }}
                                            progressViewOffset={refreshingHeight}
                                        />
                                    }
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({item}) => {
                                        const time = item.createdAt;
                                        const formattedDuration = getTimeDuration(time);


                                        const handleNavigation = async (e: any) => {
                                            const id = item.creator._id;

                                            await axios
                                                .get(`${URI}/get-user/${id}`, {
                                                    headers: {Authorization: `Bearer ${token}`},
                                                })
                                                .then(res => {
                                                    if (item.type === "Follow") {
                                                        navigation.navigate('UserProfile', {
                                                            item: res.data.user,
                                                        });
                                                    } else {
                                                        navigation.navigate('PostDetails', {
                                                            data: posts.find((i: any) => i._id === item.postId)
                                                        });
                                                    }
                                                });
                                        };

                                        return (
                                            <TouchableOpacity onPress={() => handleNavigation(item)}>
                                                <View style={{flexDirection: 'row'}} key={item._id}>
                                                    <View style={{position: 'relative'}}>
                                                        <Image
                                                            source={{
                                                                uri: users.find(
                                                                    (user: any) => user._id === item.creator._id,
                                                                )?.avatar.url,
                                                            }}
                                                            style={{width: 40, height: 40, borderRadius: 100}}
                                                            borderRadius={100}
                                                        />
                                                        {item.type === 'Like' && (
                                                            <View style={{
                                                                position: 'absolute',
                                                                bottom: 5,
                                                                right: -5,
                                                                borderWidth: 2,
                                                                borderColor: '#fff',
                                                                height: 25,
                                                                width: 25,
                                                                backgroundColor: '#eb4545',
                                                                borderRadius: '50%',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                flexDirection: 'row'
                                                            }}>
                                                                <Image
                                                                    source={{
                                                                        uri: 'https://cdn-icons-png.flaticon.com/512/2589/2589175.png',
                                                                    }}
                                                                    style={{tintColor: '#fff', width: 15, height: 15}}
                                                                />
                                                            </View>
                                                        )}

                                                        {item.type === 'Follow' && (
                                                            <View style={{
                                                                position: 'absolute',
                                                                bottom: 5,
                                                                right: -5,
                                                                borderWidth: 2,
                                                                borderColor: '#fff',
                                                                height: 25,
                                                                width: 25,
                                                                backgroundColor: '#5a49d6',
                                                                borderRadius: '50%',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                flexDirection: 'row'
                                                            }}>
                                                                <Image
                                                                    source={{
                                                                        uri: 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png',
                                                                    }}
                                                                    style={{tintColor: '#fff', width: 12, height: 12}}
                                                                />
                                                            </View>
                                                        )}


                                                    </View>
                                                    <View style={{paddingLeft: 16, marginTop: 2}}>
                                                        <View style={{
                                                            flexDirection: 'row',
                                                            width: '100%',
                                                            alignItems: 'center',
                                                            borderBottomWidth: 1,
                                                            paddingBottom: 3,
                                                            borderColor: '#0000003b'
                                                        }}>
                                                            <View style={{flex: 1}}>
                                                                <View style={{
                                                                    flexDirection: 'row',
                                                                    alignItems: 'center'
                                                                }}>
                                                                    <Text style={{
                                                                        fontSize: 18,
                                                                        color: 'black',
                                                                        fontWeight: '600'
                                                                    }}>
                                                                        {item.creator.name}
                                                                    </Text>
                                                                    <Text style={{
                                                                        paddingLeft: 2,
                                                                        fontSize: 16,
                                                                        color: '#000000b3',
                                                                        fontWeight: '600'
                                                                    }}>
                                                                        {formattedDuration}
                                                                    </Text>
                                                                </View>
                                                                <Text style={{
                                                                    fontSize: 16,
                                                                    color: '#000000b3',
                                                                    fontWeight: '600'
                                                                }}>
                                                                    {item.title}
                                                                </Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        );
                                    }}
                                />
                            )}
                        </View>
                    </SafeAreaView>
                </>
            )}
        </>
    );
};

export default NotificationScreen;
