import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import getTimeDuration from './timeGen';
import axios from 'axios';
import { URI } from '../../../URI';
import {
  addLikes,
  addLikesToRepliesReply,
  addLikesToReply,
  removeLikes,
  removeLikesFromRepliesReply,
  removeLikesFromReply,
} from '../../../redux/actions/postActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { getPosts } from '../../../redux/actions/getPosts';
import { getReplies } from '../../../redux/actions/getReplies';

type Props = {
  navigation: any;
  item: any;
  isReply?: boolean | null;
  postId?: string | null;
  isRepliesReply?: boolean;
};

const PostDetailsCard = ({ item, isReply, navigation, postId, isRepliesReply }: Props) => {
  const { user, token, users } = useSelector((state: any) => state.user);
  const { posts } = useSelector((state: any) => state.post);
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '',
    userName: '',
    avatar: {
      url: 'https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png',
    },
  });

  const time = item?.createdAt;
  const formattedDuration = getTimeDuration(time);

  const profileHandler = async (e: any) => {
    await axios
      .get(`${URI}/get-user/${e._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.user._id !== user._id) {
          navigation.navigate('UserProfile', {
            item: res.data.user,
          });
        } else {
          navigation.navigate('Profile');
        }
      });
  };

  const reactsHandler = (e: any) => {
    console.log('replu');
    if (item.likes.length !== 0) {
      const isLikedBefore = item.likes.find((i: any) => i.userId === user._id);
      if (isLikedBefore) {
        removeLikes({ postId: postId ? postId : e._id, posts, user })(dispatch).then(() => {
          getPosts()(dispatch);
          getReplies()(dispatch);
        });
      } else {
        addLikes({ postId: postId ? postId : e._id, posts, user })(dispatch).then(() => {
          getPosts()(dispatch);
          getReplies()(dispatch);
        });
      }
    } else {
      addLikes({ postId: postId ? postId : e._id, posts, user })(dispatch).then(() => {
        getPosts()(dispatch);
        getReplies()(dispatch);
      });
    }
  };

  const replyReactHanlder = (e: any) => {
    console.log('replu 1');
    console.log(e.likes);
    if (e.likes.length !== 0) {
      const isLikedBefore = e.likes.find((i: any) => i.userId === user._id);
      if (isLikedBefore) {
        removeLikesFromReply({
          postId: postId ? postId : e._id,
          posts,
          replyId: e._id,
          user,
          title: e.title,
        })(dispatch);
      } else {
        addLikesToReply({
          postId: postId ? postId : e._id,
          posts,
          replyId: e._id,
          user,
          title: e.title,
        })(dispatch);
      }
    } else {
      addLikesToReply({
        postId: postId ? postId : e._id,
        posts,
        replyId: e._id,
        user,
        title: e.title,
      })(dispatch);
    }
    getPosts()(dispatch);
  };

  const handlePress = async (e: any) => {
    setActive(!active);
    await AsyncStorage.setItem('replyId', e._id);
  };

  const repliesReplyReactHandler = async (e: any) => {
    const replyId = await AsyncStorage.getItem('replyId');
    if (e.likes.length !== 0) {
      const isLikedBefore = e.likes.find((i: any) => i.userId === user._id);
      if (isLikedBefore) {
        removeLikesFromRepliesReply({
          postId: postId,
          posts,
          replyId,
          singleReplyId: e._id,
          user,
          title: e.title,
        })(dispatch);
      } else {
        addLikesToRepliesReply({
          postId: postId,
          posts,
          replyId,
          singleReplyId: e._id,
          user,
          title: e.title,
        })(dispatch);
      }
    } else {
      addLikesToRepliesReply({
        postId: postId,
        posts,
        replyId,
        singleReplyId: e._id,
        user,
        title: e.title,
      })(dispatch);
    }
  };

  useEffect(() => {
    if (users) {
      const updatedUsers = [...users, user];
      const userData = updatedUsers.find((user: any) => user._id === item.user._id);
      setUserInfo(userData);
    }
  }, [users]);

  return (
    <View
      style={{
        padding: 15,
        borderBottomWidth: !isReply ? 1 : 0,
        borderBottomColor: '#00000017',
        width: isReply ? '95%' : '100%',
        left: isReply ? 20 : 0,
      }}
    >
      <View style={{ position: 'relative' }}>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => profileHandler(userInfo)}>
              <Image source={{ uri: userInfo.avatar.url }} style={{ width: 40, height: 40, borderRadius: 100 }} />
            </TouchableOpacity>
            <View style={{ paddingLeft: 3 }}>
              <TouchableOpacity onPress={() => profileHandler(userInfo)}>
                <View style={{ position: 'relative', flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ color: 'black', fontWeight: '500', fontSize: 16 }}>{userInfo.name}</Text>
                  {item.role === 'Admin' && (
                    <Image
                      source={{
                        uri: 'https://cdn-icons-png.flaticon.com/128/1828/1828640.png',
                      }}
                      style={{ width: 15, height: 15, marginLeft: 1, position: 'absolute', bottom: 0, left: 0 }}
                    />
                  )}
                </View>
                <Text style={{ color: 'black', fontSize: 13 }}>{userInfo?.userName}</Text>
              </TouchableOpacity>
              <Text style={{ color: 'black', fontWeight: '500', fontSize: 13 }}>{item.title}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: '#000000b6' }}>{formattedDuration}</Text>
            <TouchableOpacity>
              <Text style={{ color: '#000', paddingLeft: 4, fontWeight: '700', marginBottom: 8 }}>...</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginLeft: 50, marginTop: 3 }}>
          {item.image && (
            <Image
              source={{ uri: item.image.url }}
              style={{ aspectRatio: 1, borderRadius: 10, zIndex: 1111 }}
              resizeMode="contain"
            />
          )}
        </View>
        <View
          style={
            item.image
              ? { position: 'absolute', top: 14, left: 5, height: '90%', width: 1, backgroundColor: '#00000017' }
              : { position: 'absolute', top: 12, left: 5, height: '60%', width: 1, backgroundColor: '#00000017' }
          }
        />
        <View style={{ flexDirection: 'row', alignItems: 'center', left: 50, top: 5 }}>
          <TouchableOpacity
            onPress={() =>
              !isRepliesReply
                ? !isReply
                  ? reactsHandler(item)
                  : replyReactHanlder(item)
                : repliesReplyReactHandler(item)
            }
          >
            {item.likes.length > 0 ? (
              <>
                {item.likes.find((i: any) => i.userId === user._id) ? (
                  <Image
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/512/2589/2589175.png',
                    }}
                    style={{ width: 30, height: 30 }}
                  />
                ) : (
                  <Image
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/512/2589/2589197.png',
                    }}
                    style={{ width: 30, height: 30 }}
                  />
                )}
              </>
            ) : (
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/2589/2589197.png',
                }}
                style={{ width: 30, height: 30 }}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('CreateReplies', {
                item: item,
                navigation: navigation,
                postId: postId,
              });
            }}
          >
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/5948/5948565.png',
              }}
              style={{ width: 22, height: 22, marginLeft: 5 }}
            />
          </TouchableOpacity>
        </View>

        <View style={{ paddingLeft: 50, paddingTop: 4, flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('PostDetails', {
                data: item,
              })
            }
          />
          <Text style={{ fontSize: 16, color: '#0000009b' }}>
            {item.likes.length} {item.likes.length > 1 ? 'likes' : 'like'}
          </Text>
        </View>

        {isRepliesReply && (
          <View style={{ paddingLeft: 50, paddingTop: 4, flexDirection: 'row' }}>
            <Text style={{ fontSize: 16, color: '#0000009b' }}>
              {item.likes.length} {item.likes.length > 1 ? 'likes' : 'like'}
            </Text>
          </View>
        )}
      </View>
      {item.reply && (
        <>
          {item.reply.length !== 0 && (
            <>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => handlePress(item)}>
                  <Text style={{ marginLeft: 50, marginTop: 20, color: 'black', fontSize: 16 }}>
                    {active ? 'Hide Replies' : 'View Replies'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={{ marginLeft: 10, marginTop: 20, color: 'black', fontSize: 16 }}>
                    {item.likes.length} {item.likes.length > 1 ? 'likes' : 'like'}
                  </Text>
                </TouchableOpacity>
              </View>
              {active && (
                <>
                  {item.reply.map((i: any) => (
                    <PostDetailsCard
                      navigation={navigation}
                      item={i}
                      key={i._id}
                      isReply={true}
                      postId={postId}
                      isRepliesReply={true}
                    />
                  ))}
                </>
              )}
            </>
          )}
        </>
      )}
    </View>
  );
};

export default PostDetailsCard;
