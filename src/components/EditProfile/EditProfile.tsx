import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import axios from "axios";
import {URI} from "../../URI";
import {loadUser} from "../../redux/actions/loadUser";
import ImagePicker, {ImageOrVideo} from "react-native-image-crop-picker";
import {SafeAreaView, TouchableOpacity, View, Text, Image, TextInput, StyleSheet} from "react-native";

type Props = {
    navigation: any;
};

const EditProfile = ({navigation}: Props) => {
    const {user, token} = useSelector((state: any) => state.user);
    const [avatar, setAvatar] = useState(user?.avatar?.url);
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({
        name: user.name,
        userName: user?.userName,
        bio: user?.bio,
    });

    const handleSubmitHandler = async () => {
        if (userData.name.length !== 0 && userData.userName.length !== 0) {
            await axios.put(`${URI}/update-profile`, {
                name: userData.name,
                bio: userData.bio,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((res: any) => {
                loadUser()(dispatch);
            })
        }
    };

    const ImageUpload = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
            compressImageQuality: 0.8,
            includeBase64: true,
        }).then((image: ImageOrVideo | null) => {
            if (image) {
                // setImage('data:image/jpeg;base64,' + image.data);
                axios
                    .put(
                        `${URI}/update-avatar`,
                        {
                            avatar: 'data:image/jpeg;base64,' + image?.data,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        },
                    )
                    .then((res: any) => {
                        loadUser()(dispatch);
                    });
            }
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.backButton}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image
                            source={{uri: 'https://cdn-icons-png.flaticon.com/512/2961/2961937.png'}}
                            style={styles.backButtonImage}
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={handleSubmitHandler}>
                    <Text style={styles.doneButton}>Save</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <View style={styles.innerContainer}>
                    <View style={styles.nameContainer}>
                        <View style={{flex: 1}}>
                            <Text style={styles.nameLabel}>Name</Text>
                            <TextInput
                                value={userData.name}
                                onChangeText={e => setUserData({...userData, name: e})}
                                placeholder="Enter your name..."
                                placeholderTextColor="#000"
                                style={styles.nameInput}
                            />
                        </View>
                        <TouchableOpacity onPress={ImageUpload}>
                            <Image
                                source={{uri: avatar}}
                                style={styles.avatarImage}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bioContainer}>
                        <Text style={styles.bioLabel}>Bio</Text>
                        <TextInput
                            value={userData.bio}
                            onChangeText={e => setUserData({...userData, bio: e})}
                            placeholder="Enter your bio..."
                            placeholderTextColor="#000"
                            style={styles.bioInput}
                            multiline
                            numberOfLines={4}
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 3,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButtonImage: {
        width: 25,
        height: 25,
    },
    title: {
        fontSize: 20,
        marginLeft: 4,
        fontWeight: '600',
        color: '#000',
    },
    doneButton: {
        fontSize: 20,
        color: 'black',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3C1874',
    },
    innerContainer: {
        width: '90%',
        padding: 3,
        minHeight: 200,
        maxHeight: '100%',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#0000002e',
        backgroundColor: 'white',
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    nameLabel: {
        fontSize: 18,
        fontWeight: '600',
        color: 'black',
    },
    nameInput: {
        fontSize: 16,
        color: '#000000b0',
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
        marginRight: 10
    },
    avatarImage: {
        width: 60,
        height: 60,
        borderRadius: 100,
    },
    bioContainer: {
        width: '100%',
        borderTopWidth: 1,
        borderTopColor: '#00000015',
        paddingTop: 2,
    },
    bioLabel: {
        fontSize: 18,
        fontWeight: '600',
        color: 'black',
    },
    bioInput: {
        fontSize: 16,
        color: '#000000b0',
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 10,
    },
});

export default EditProfile;
