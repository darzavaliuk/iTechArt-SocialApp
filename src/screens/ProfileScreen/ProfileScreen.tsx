import {
  Animated,
  Button,
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers/rootReducer';
import { loadTargets } from '../../redux/actions/loadTargets';
import { Header } from './Header';
import { getAnimatedValues } from './Animated';
import { getHeightForElements } from './Helpers';
import { Avatar } from './Avatar';
import PostCard from '../PostsDisplayScreen/PostCard/PostCard';
import { StatsComponent } from './StatsComponent';
import { getPosts } from '../../redux/actions/getPosts';
import { getReplies } from '../../redux/actions/getReplies';
import { selectPosts, selectTargets, selectUser } from '../../redux/selectors';

export const ProfileScreen = () => {
  const [active, setActive] = useState(0);
  const [scrollY] = useState(new Animated.Value(0));
  const { postsUser, repliesUser, posts } = useSelector(selectPosts);
  const targets = useSelector(selectTargets);
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    getPosts()(dispatch);
    getReplies()(dispatch);
  }, [posts, user]);

  useFocusEffect(
    useCallback(() => {
      loadTargets()(dispatch);
    }, [])
  );

  const { headerHeight, imageSize, imageMarginTop, headerZIndex, headerTitleBottom } = getAnimatedValues(
    scrollY,
    Dimensions.get('window').height
  );

  const { headerFontSize, avatarFontSize } = getHeightForElements(Dimensions.get('window').height);

  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    // Загрузка постов с сервера
    // Ваш код для получения постов с сервера, используя текущую страницу (page)
    // Обновление списка постов
    // setPosts(prevPosts => [...prevPosts, ...newPosts]);
  };

  const fetchMorePosts = () => {
    const nextPage = page + 1;

    // Загрузка следующей страницы постов
    // Ваш код для получения новых постов с сервера, используя nextPage

    // Обновление списка постов и текущей страницы
    // setPosts(prevPosts => [...prevPosts, ...newPosts]);
    setPage(nextPage);
    console.log('fetch');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Header
          userName={user.name}
          animatedHeaderStyles={{ height: headerHeight, zIndex: headerZIndex }}
          animatedTextStyles={{ bottom: headerTitleBottom }}
          userNameFontSize={headerFontSize}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
            elevation: 1,
          }}
          scrollEventThrottle={1}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }])}
        >
          <Avatar
            user={user}
            username={user.name}
            containerStyles={styles.avatarContainer}
            userNameFontSize={avatarFontSize}
            animatedStyles={{ width: imageSize, height: imageSize, marginTop: imageMarginTop }}
          />

          <StatsComponent user={user} targets={targets} />

          <View style={styles.postContainer}>
            <View style={styles.tabContainer}>
              <TouchableOpacity
                onPress={() => setActive(0)}
                style={[styles.tabButton, { backgroundColor: active === 0 ? '#3C1874' : '#00000060' }]}
              >
                <Text style={[styles.tabButtonText, { color: active === 0 ? 'white' : '#00000060' }]}>Posts</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setActive(1)}
                style={[styles.tabButton, { backgroundColor: active === 1 ? '#3C1874' : '#00000060' }]}
              >
                <Text style={[styles.tabButtonText, { color: active === 1 ? 'white' : '#00000060' }]}>Replies</Text>
              </TouchableOpacity>
            </View>
          </View>

          {active === 0 ? (
            <FlatList
              data={postsUser}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => <PostCard key={item._id} item={item} />}
              ListEmptyComponent={<Text style={styles.message}>You have no posts yet!</Text>}
              onEndReached={fetchMorePosts}
              onEndReachedThreshold={0.5}
              ListFooterComponent={() => <Button title="Load More" onPress={fetchMorePosts} />}
            />
          ) : (
            <>
              <FlatList
                data={repliesUser}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <PostCard key={item._id} item={item} />}
                ListEmptyComponent={<Text style={styles.message}>You have no replies yet!</Text>}
                onEndReached={fetchMorePosts}
                onEndReachedThreshold={0.5}
                ListFooterComponent={() => <Button title="Load More" onPress={fetchMorePosts} />}
              />
            </>
          )}
        </ScrollView>

        <TouchableOpacity onPress={() => navigation.navigate('EditProfile' as never)} style={styles.editProfileButton}>
          <Text style={styles.editProfileButtonText}>Edit profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3C1874',
  },
  wrapper: {
    backgroundColor: 'white',
    flex: 1,
    marginHorizontal: 10,
  },
  separator: {
    backgroundColor: '#0e1c4c',
    width: 10,
    alignSelf: 'center',
    borderRadius: 20,
    height: 80,
  },
  message: {
    color: 'black',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  avatarContainer: {
    marginLeft: '3%',
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
  postContainer: {
    margin: 10,
    marginTop: 20,
  },
  tabContainer: {
    width: '100%',
    marginHorizontal: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tabButton: {
    flex: 1,
    borderRadius: 5,
    marginHorizontal: 1,
  },
  tabButtonText: {
    textAlign: 'center',
    fontSize: 18,
    marginLeft: 10,
    padding: 5,
  },
  text: {
    fontFamily: 'HelveticaNeue',
    fontWeight: 'bold',
    color: '#282b2d',
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  titleBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginHorizontal: 16,
  },
  subText: {
    fontSize: 12,
    color: '#2b2e2f',
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
  },
  dm: {
    backgroundColor: '#41444B',
    position: 'absolute',
    top: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  active: {
    backgroundColor: '#34FFB9',
    position: 'absolute',
    bottom: 28,
    left: 10,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  editProfileButton: {
    backgroundColor: 'red',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  editProfileButtonText: {
    color: 'white',
    fontSize: 18,
    padding: 10,
    alignSelf: 'center',
  },
  add: {
    backgroundColor: '#41444B',
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 16,
  },

  mediaImageContainer: {
    width: 180,
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 10,
  },
  mediaCount: {
    backgroundColor: '#41444B',
    position: 'absolute',
    top: '50%',
    marginTop: -50,
    marginLeft: 30,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    shadowColor: 'rgba(0, 0, 0, 0.38)',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    shadowOpacity: 1,
  },
  recent: {
    marginLeft: 78,
    marginTop: 32,
    marginBottom: 6,
    fontSize: 10,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  activityIndicator: {
    backgroundColor: '#9894ef',
    padding: 4,
    height: 12,
    width: 12,
    borderRadius: 6,
    marginTop: 3,
    marginRight: 20,
  },
});
