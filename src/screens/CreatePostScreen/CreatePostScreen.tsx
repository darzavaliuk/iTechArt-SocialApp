import {
    Image,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    StyleSheet
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import {useNavigation} from "@react-navigation/native";
import {RootState} from "../../redux/reducers/rootReducer";
import {createPostAction} from "../../redux/actions/createPost";
import {getAllPosts} from "../../redux/actions/getAllPosts";

const selectUser = (state: RootState) => state.user;

const selectPost = (state: RootState) => state.post;

const PostScreen = () => {
    const navigation = useNavigation();
    const {user} = useSelector(selectUser);
    const {isSuccess, isLoading} = useSelector(selectPost);
    const [activeIndex, setActiveIndex] = useState(0);
    const [active, setActive] = useState(false);
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        if (
            replies.length === 1 &&
            replies[0].title === '' &&
            replies[0].image === ''
        ) {
            setReplies([]);
        }
        if (isSuccess) {
            navigation.goBack();
            getAllPosts()(dispatch);
        }
        setReplies([]);
        setTitle('');
        setImage('');
    }, [isSuccess]);

    const [replies, setReplies] = useState([
        {
            title: '',
            image: '',
            user,
        },
    ]);

    const handleTitleChange = (index: number, text: string) => {
        setReplies(prevPost => {
            const updatedPost = [...prevPost];
            updatedPost[index] = {...updatedPost[index], title: text};
            return updatedPost;
        });
    };

    const uploadImage = (index: number) => {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
            compressImageQuality: 0.9,
            includeBase64: true,
        }).then((image: ImageOrVideo | null) => {
            if (image) {
                setReplies(prevPost => {
                    const updatedPost = [...prevPost];
                    updatedPost[index] = {
                        ...updatedPost[index],
                        image: 'data:image/jpeg;base64,' + image?.data,
                    };
                    return updatedPost;
                });
            }
        });
    };

    const addNewThread = () => {
        if (
            replies[activeIndex].title !== '' ||
            replies[activeIndex].image !== ''
        ) {
            setReplies(prevPost => [...prevPost, {title: '', image: '', user}]);
            setActiveIndex(replies.length);
        }
    };

    const removeThread = (index: number) => {
        if (replies.length > 0) {
            const updatedPost = [...replies];
            updatedPost.splice(index, 1);
            setReplies(updatedPost);
            setActiveIndex(replies.length - 1);
        } else {
            setReplies([{title: '', image: '', user}]);
        }
    };

    const addFreshNewThread = () => {
        if (title !== '' || image !== '') {
            setActive(true);
            setReplies(prevPost => [...prevPost, {title: '', image: '', user}]);
            setActiveIndex(replies.length);
        }
    };

    const postImageUpload = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
            compressImageQuality: 0.8,
            includeBase64: true,
        }).then((image: ImageOrVideo | null) => {
            if (image) {
                setImage('data:image/jpeg;base64,' + image.data);
            }
        });
    };

    const createPost = () => {
        if (title !== '' || (image !== '' && !isLoading)) {
            createPostAction(title, image, user, replies)(dispatch);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text>X</Text>
                </TouchableOpacity>
                <Text style={styles.headerText}>New Post</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.postContainer}>
                    {/* create post */}
                    <View style={styles.userRow}>
                        <Image source={{uri: user?.avatar.url}} style={styles.userImage}/>
                        <View style={styles.userInfoContainer}>
                            <View style={styles.userInfoRow}>
                                <Text style={styles.userName}>{user?.name}</Text>
                                <TouchableOpacity>
                                    <Text>X</Text>
                                </TouchableOpacity>
                            </View>
                            <TextInput
                                placeholder="Start a post..."
                                placeholderTextColor="#000"
                                value={title}
                                onChangeText={(text) => setTitle(text)}
                                style={styles.addPostText}
                            />
                            <TouchableOpacity style={styles.addImageText} onPress={postImageUpload}>
                                <Text>Add</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {image && (
                        <View style={styles.imageContainer}>
                            <Image source={{uri: image}} style={styles.image}/>
                        </View>
                    )}
                    {replies.length === 0 && (
                        <View style={styles.addPostContainer}>
                            <Image source={{uri: user?.avatar.url}} style={styles.userImage}/>
                            <Text style={styles.addPostText} onPress={addFreshNewThread}>
                                Add to post ...
                            </Text>
                        </View>
                    )}
                    {replies.map((item, index) => (
                        <View key={index}>
                            <View style={styles.userRow}>
                                <Image source={{uri: user?.avatar.url}} style={styles.userImage}/>
                                <View style={styles.userInfoContainer}>
                                    <View style={styles.userInfoRow}>
                                        <Text style={styles.userName}>{user?.name}</Text>
                                        <TouchableOpacity onPress={() => removeThread(index)}>
                                            <Text>Close</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TextInput
                                        placeholder="Start a post..."
                                        placeholderTextColor="#000"
                                        value={item.title}
                                        onChangeText={(text) => handleTitleChange(index, text)}
                                        style={styles.addPostText}
                                    />
                                    <TouchableOpacity style={styles.addImageText} onPress={() => uploadImage(index)}>
                                        <Text>Add</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {item.image && (
                                <View style={styles.imageContainer}>
                                    <Image source={{uri: item.image}} style={styles.image}/>
                                </View>
                            )}
                            {index === activeIndex && (
                                <View style={styles.addPostContainer}>
                                    <Image source={{uri: user?.avatar.url}} style={styles.userImage}/>
                                    <Text style={styles.addPostText} onPress={addNewThread}>
                                        Add to post ...
                                    </Text>
                                </View>
                            )}
                        </View>
                    ))}
                </View>
            </ScrollView>
            <View style={styles.postButtonContainer}>
                <TouchableOpacity style={styles.postButton} onPress={createPost}>
                    <Text style={styles.postButtonText}>Post</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        margin: 3,
    },
    backButton: {
        marginRight: 10,
    },
    headerText: {
        paddingLeft: 4,
        fontSize: 20,
        fontWeight: '500',
        color: '#000',
    },
    postContainer: {
        margin: 3,
        flex: 1,
        justifyContent: 'space-between',
    },
    userRow: {
        marginTop: 3,
        flexDirection: 'row',
    },
    userImage: {
        width: 40,
        height: 40,
        borderRadius: 100,
    },
    userInfoContainer: {
        paddingLeft: 3,
    },
    userInfoRow: {
        width: '78%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    userName: {
        fontSize: 20,
        fontWeight: '400',
        color: 'black',
    },
    addPostText: {
        marginTop: 1,
        color: '#000',
        fontSize: 16,
    },
    addImageText: {
        marginTop: 2,
    },
    imageContainer: {
        margin: 2,
    },
    image: {
        width: 200,
        height: 300,
    },
    addPostContainer: {
        flexDirection: 'row',
        margin: 3,
        width: '100%',
        alignItems: 'flex-start',
        marginTop: 5,
        opacity: 0.7,
    },
    postButtonContainer: {
        padding: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    postButton: {
        backgroundColor: '#3C1874',
        flex: 1,
        height: 40,
    },
    postButtonText: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 20,
    },
});

export default PostScreen;
