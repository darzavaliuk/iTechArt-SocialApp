import { useState } from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, View, Image, Text } from 'react-native';
import PostDetailsCard from '../PostsDisplayScreen/PostCard/PostDetailsCard';

type Props = {
  navigation: any;
  route: any;
};

export const PostDetailsScreen = ({ navigation, route }: Props) => {
  console.log(route.params.data);
  let item = route.params.data;
  // const posts = useSelector((state: any) => state.post.postsUser);
  const [data, setdata] = useState(item);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
        <View style={{ flex: 1, marginBottom: 80 }}>
          <View style={{ paddingHorizontal: 3 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/2223/2223615.png',
                }}
                style={{ height: 25, width: 25 }}
              />
            </TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
            <PostDetailsCard navigation={navigation} item={data} postId={data._id} />
            <View>
              {data?.replies?.map((i: any, index: number) => {
                return (
                  <PostDetailsCard navigation={navigation} item={i} key={index} isReply={true} postId={item._id} />
                );
              })}
              {/*<View style={{ marginBottom: 150 }}></View>*/}
            </View>
          </ScrollView>
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: 8,
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'center',
            backgroundColor: 'white',
            height: 70,
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            style={{
              width: '92%',
              backgroundColor: '#00000026',
              height: 45,
              borderRadius: 40,
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() =>
              navigation.replace('CreateReplies', {
                item: item,
                navigation: navigation,
              })
            }
          >
            <Image
              source={{ uri: item.user.avatar.url }}
              borderRadius={100}
              style={{ marginLeft: 3, marginRight: 3, width: 30, height: 30 }}
            />
            <Text style={{ fontSize: 16, color: '#0000009b' }}>Reply to {item.user.name} </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PostDetailsScreen;
