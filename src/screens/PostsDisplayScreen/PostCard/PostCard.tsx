import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {URI} from "../../../URI";
import {TouchableOpacity, View, Image, TouchableWithoutFeedback, Text, Modal, StyleSheet} from "react-native";
import {addLikes, removeLikes} from "../../../redux/actions/postActions";
import PostDetailsCard from "./PostDetailsCard";
import getTimeDuration from "./timeGen";
import {useNavigation} from "@react-navigation/native";
import {Post, User} from "../../../redux/reducers/User";
import {getPosts} from "../../../redux/actions/getPosts";

type Props = {
    item: Post;
    isReply?: boolean | null;
    postId?: string | null;
    replies?: boolean | null;
};

export const PostCard = ({item, isReply, postId, replies}: Props) => {
    const navigation = useNavigation();
    const {user, token, users} = useSelector((state: any) => state.user);
    const {posts} = useSelector((state: any) => state.post);
    const [openModal, setOpenModal] = useState(false);
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState({
        name: '',
        avatar: {
            url: 'https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png',
        },
    });

    const time = item?.createdAt;
    const formattedDuration = getTimeDuration(time!);

    const profileHandler = async (e: User) => {
        await axios
            .get(`${URI}/get-user/${e._id}`, {
                headers: {Authorization: `Bearer ${token}`},
            })
            .then(res => {
                if (res.data.user._id !== user._id) {
                    navigation.navigate('UserProfileScreen', {
                        id: res.data.user._id,
                    });
                } else {
                    navigation.navigate('ProfileScreen' as never);
                }
            });
    };

    const reactsHandler = (e: User) => {
        if (item?.likes?.length !== 0) {
            const isLikedBefore = item?.likes?.find((i: any) => i.userId === user._id);
            if (isLikedBefore) {
                removeLikes({postId: postId ? postId : e._id, posts, user})(dispatch);
            } else {
                addLikes({postId: postId ? postId : e._id, posts, user})(dispatch);
            }
        } else {
            addLikes({postId: postId ? postId : e._id, posts, user})(dispatch);
        }
    };

    const deletePostHandler = async (e: string) => {
        await axios
            .delete(`${URI}/delete-post/${e}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(res => {
                getPosts()(dispatch)
            });
    };

    useEffect(() => {
        if (users) {
            const updatedUsers = [...users, user];
            const userData = updatedUsers.find((user: User) =>
                user._id === item?.user?._id
            );
            setUserInfo(userData);
        }
    }, [users]);

    return (
        <TouchableOpacity onPress={() =>
            navigation.navigate('PostDetails', {
                data: item,
            })
        } style={styles.wrapper}>
            <View style={{position: "relative"}}>
                <View style={{flexDirection: "row", width: "100%"}}>
                    <View style={styles.container}>
                        <TouchableOpacity onPress={() => profileHandler(item.user)}>
                            <Image
                                source={{uri: userInfo?.avatar?.url}}
                                style={styles.avatar}
                            />
                        </TouchableOpacity>
                        <View style={styles.infoContainer}>
                            <TouchableOpacity
                                style={styles.userInfoContainer}
                                onPress={() => profileHandler(userInfo)}
                            >
                                <Text style={styles.userName}>
                                    {userInfo?.name}
                                </Text>
                                {userInfo?.role === 'Admin' && (
                                    <Text style={styles.adminLabel}>Admin</Text>
                                )}
                            </TouchableOpacity>
                            <Text style={styles.title}>{item.title}</Text>
                        </View>
                    </View>
                    <View style={styles.containerModal}>
                        <Text style={styles.durationText}>{formattedDuration}</Text>
                        {item?.user?._id === user._id && (
                            <TouchableOpacity onPress={() => setOpenModal(true)}>
                                <Text style={styles.moreText}>...</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
                <View style={styles.containerImage}>
                    {item.image && (
                        <Image
                            source={{uri: item.image.url}}
                            style={styles.image}
                            resizeMode="contain"
                        />
                    )}
                    <View style={item.image ? styles.lineWithImage : styles.lineWithoutImage}/>
                </View>
                <View style={styles.containerLike}>
                    <TouchableOpacity onPress={() => reactsHandler(item)}>
                        {item?.likes!.length > 0 && item?.likes?.find((i: any) => i.userId === user._id) ? (
                            <Image
                                source={{uri: 'https://cdn-icons-png.flaticon.com/512/2589/2589175.png'}}
                                style={styles.likeImage}
                            />
                        ) : (
                            <Image
                                source={{uri: 'https://cdn-icons-png.flaticon.com/512/2589/2589197.png'}}
                                style={styles.likeImage}
                            />
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate('CreateReplies', {
                                item: item,
                                navigation: navigation,
                                postId: postId,
                            })
                        }
                    >
                        <Image
                            source={{uri: 'https://cdn-icons-png.flaticon.com/512/5948/5948565.png'}}
                            style={styles.replyImage}
                        />
                    </TouchableOpacity>
                </View>
                {!isReply && (
                    <View style={{paddingLeft: 50, paddingTop: 4, flexDirection: "row"}}>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('PostDetails', {
                                    data: item,
                                })
                            }>
                            <Text style={{fontSize: 16, color: "#0000009b"}}>
                                {item?.replies?.length !== 0 &&
                                    `${item?.replies?.length} replies ·`}{' '}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() =>
                                item?.likes!.length !== 0 &&
                                navigation.navigate('PostLikeCard', {
                                    item: item.likes,
                                    navigation: navigation,
                                })
                            }>
                            <Text style={{fontSize: 16, color: "#0000009b"}}>
                                {item?.likes?.length} {item?.likes!.length > 1 ? 'likes' : 'like'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}


                {replies && (
                    <>
                        {item?.replies?.map((reply: any) => (
                            <PostDetailsCard
                                navigation={navigation}
                                key={reply._id}
                                item={reply}
                                isReply={true}
                                postId={item._id}
                            />
                        ))}
                    </>
                )}
                {openModal && (
                    <View style={styles.modalContainer}>
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={openModal}
                            onRequestClose={() => {
                                setOpenModal(!openModal);
                            }}
                        >
                            <TouchableWithoutFeedback onPress={() => setOpenModal(false)}>
                                <View style={styles.overlay}>
                                    <TouchableWithoutFeedback onPress={() => setOpenModal(true)}>
                                        <View style={styles.modalContent}>
                                            <TouchableOpacity
                                                style={styles.deleteButton}
                                                onPress={() => deletePostHandler(item._id)}
                                            >
                                                <Text style={styles.deleteText}>Delete</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </TouchableWithoutFeedback>
                        </Modal>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: "85%",
        alignItems: "center",
    },
    wrapper: {
        padding: 15,
        borderRadius: 30,
        margin: 5,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 1
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 100,
    },
    infoContainer: {
        paddingLeft: 10,
        width: "70%",
    },
    userInfoContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    userName: {
        color: "black",
        fontWeight: "500",
        fontSize: 16,
    },
    adminLabel: {
        marginLeft: 5,
        color: "black",
        fontSize: 16,
        fontWeight: "bold",
    },
    title: {
        color: "black",
        fontWeight: "500",
        fontSize: 13,
    },
    containerModal: {
        flexDirection: "row",
        alignItems: "center",
    },
    durationText: {
        color: "#000000b6",
    },
    moreText: {
        color: "#000",
        paddingLeft: 4,
        fontWeight: "700",
        marginBottom: 8,
    },
    containerImage: {
        marginLeft: 50,
        marginTop: 3,
    },
    image: {
        aspectRatio: 1,
        borderRadius: 10,
        zIndex: 1111,
    },
    lineWithImage: {
        position: "absolute",
        top: 12,
        left: 5,
        height: "90%",
        width: 1,
    },
    lineWithoutImage: {
        position: "absolute",
        top: 12,
        left: 5,
        height: "60%",
        width: 1,
    },
    containerLike: {
        flexDirection: 'row',
        alignItems: 'center',
        left: 50,
        top: 5,
    },
    likeImage: {
        width: 30,
        height: 30,
        marginRight: 5
    },
    replyImage: {
        width: 22,
        height: 22,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: '#00000059',
    },
    modalContent: {
        width: '100%',
        backgroundColor: '#fff',
        height: 120,
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 1,
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 5,
    },
    deleteButton: {
        width: '100%',
        backgroundColor: '#00000010',
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 5,
    },
    deleteText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#e24848',
    },
});

export default PostCard;
