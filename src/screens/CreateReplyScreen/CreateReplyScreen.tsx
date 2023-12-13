import { URI } from '../../URI';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import getTimeDuration from '../PostsDisplayScreen/PostCard/timeGen';
import { SafeAreaView, ScrollView, TextInput, TouchableOpacity, View, Image, Text } from 'react-native';
import { getAllPosts } from '../../redux/actions/getAllPosts';
import { RootStackScreenProps } from '../../navigation/MainStack';
import { selectUser } from '../../redux/selectors';

function CreateRepliesScreen({ navigation, route }: RootStackScreenProps<'CreateReplies'>) {
  const post = route.params.item;
  const postId = route.params.postId;
  const { user, token } = useSelector(selectUser);
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  const ImageUpload = async () => {
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

  const createReplies = async () => {
    if (!postId) {
      await axios
        .put(
          `${URI}/add-replies`,
          {
            postId: post._id,
            title,
            image,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res: any) => {
          getAllPosts()(dispatch);
          navigation.navigate('PostDetails', {
            data: res.data.post,
            navigation: navigation,
          });
          setTitle('');
          setImage('');
        });
    } else {
      await axios
        .put(
          `${URI}/add-reply`,
          {
            postId,
            replyId: post._id,
            title,
            image,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res: any) => {
          navigation.navigate('PostDetails', {
            data: res.data.post,
            navigation: navigation,
          });
          setTitle('');
          setImage('');
        });
    }
  };

  return (
    <SafeAreaView>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 3 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/2961/2961937.png',
            }}
            style={{ width: 25, height: 25 }}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, marginLeft: 4, fontWeight: '600', color: '#000' }}>Reply</Text>
      </View>
      <View style={{ height: '95%', justifyContent: 'space-between', flexDirection: 'column' }}>
        <ScrollView style={{ position: 'relative' }} showsVerticalScrollIndicator={false}>
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 3 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={{ uri: post.user.avatar.url }} style={{ width: 40, height: 40, borderRadius: 100 }} />
              <View style={{ paddingLeft: 3 }}>
                <Text style={{ color: 'black', fontWeight: '500', fontSize: 18 }}>{post.user.name}</Text>
                <Text style={{ color: 'black', fontWeight: '500', fontSize: 16 }}>{post.title}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: '#000000b6' }}>{getTimeDuration(post.createdAt)}</Text>
              <TouchableOpacity>
                <Text style={{ color: '#000', paddingLeft: 4, fontWeight: '700', marginBottom: 8 }}>...</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ marginLeft: 50, marginTop: 3 }}>
            {post.image && (
              <Image
                source={{ uri: post.image.url }}
                style={{
                  width: '90%',
                  aspectRatio: 1,
                  borderRadius: 10,
                  zIndex: 1111,
                }}
                resizeMode="contain"
              />
            )}
          </View>
          {post.image ? (
            <View
              style={{ position: 'absolute', top: 125, left: 8, height: '75%', width: 1, backgroundColor: '#00000017' }}
            />
          ) : (
            <View
              style={{ position: 'absolute', top: 12, left: 5, height: '60%', width: 1, backgroundColor: '#00000017' }}
            />
          )}

          <View style={{ padding: 3 }}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={{ uri: user.avatar.url }} style={{ width: 40, height: 40, borderRadius: 100 }} />
              <View style={{ paddingLeft: 3 }}>
                <Text style={{ color: 'black', fontWeight: '500', fontSize: 18 }}>{user.name}</Text>
                <TextInput
                  placeholder={`Reply to ${post.user.name}...`}
                  placeholderTextColor={'#666'}
                  style={{ marginTop: -5, marginLeft: 1, color: 'black' }}
                  value={title}
                  onChangeText={setTitle}
                />
                <TouchableOpacity style={{ marginTop: 2 }} onPress={ImageUpload}>
                  <Image
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/512/10857/10857463.png',
                    }}
                    style={{
                      width: 20,
                      height: 20,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View>
              {image && (
                <Image
                  source={{ uri: image }}
                  style={{
                    width: '85%',
                    aspectRatio: 1,
                    borderRadius: 10,
                    zIndex: 1111,
                    marginLeft: 45,
                    marginVertical: 20,
                  }}
                />
              )}
            </View>
          </View>
        </ScrollView>
        <View>
          <View style={{ padding: 2 }}>
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity onPress={createReplies}>
                <Text style={{ color: '#1977f2', marginRight: 10 }}>Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default CreateRepliesScreen;
