import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import {
  Animated,
  FlatList,
  Platform,
  RefreshControl,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Loader } from '../../components/Loader/Loader';
import { getAllUsers } from '../../redux/actions/getAllUsers';
import PostCard from './PostCard/PostCard';
import { useNavigation } from '@react-navigation/native';
import { RootState } from '../../redux/reducers/rootReducer';
import { getAllPosts } from '../../redux/actions/getAllPosts';

const selectPost = (state: RootState) => state.post;

export const PostsDisplayScreen = () => {
  const { posts, isLoading } = useSelector(selectPost);
  const dispatch = useDispatch();
  const [offsetY, setOffsetY] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [extraPaddingTop] = useState(new Animated.Value(0));
  const refreshingHeight = 100;
  const navigation = useNavigation();

  if (offsetY < 0 && !isRefreshing) {
    const maxOffsetY = -refreshingHeight;
    Math.min(offsetY / maxOffsetY, 1);
  }

  function onScroll(event: any) {
    const { nativeEvent } = event;
    const { contentOffset } = nativeEvent;
    const { y } = contentOffset;
    setOffsetY(y);
  }

  function onRelease() {
    if (offsetY <= -refreshingHeight && !isRefreshing) {
      setIsRefreshing(true);
      setTimeout(() => {
        // getAllPosts()(dispatch);
        setIsRefreshing(false);
      }, 3000);
    }
  }

  function onScrollEndDrag(event: any) {
    const { nativeEvent } = event;
    const { contentOffset } = nativeEvent;
    const { y } = contentOffset;
    setOffsetY(y);

    if (y <= -refreshingHeight && !isRefreshing) {
      setIsRefreshing(true);
      setTimeout(() => {
        // getAllPosts()(dispatch);
        setIsRefreshing(false);
      }, 3000);
    }
  }

  useEffect(() => {
    getAllPosts()(dispatch);
    getAllUsers()(dispatch);
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <SafeAreaView>
          <View style={styles.headerContainer}>
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerText}>Posts</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('PostScreen' as never)}>
              <Text style={styles.newText}>New</Text>
            </TouchableOpacity>
          </View>
          {Platform.OS === 'ios' ? (
            <FlatList
              data={posts}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => <PostCard item={item} />}
              onScroll={onScroll}
              onScrollEndDrag={onScrollEndDrag}
              onResponderRelease={onRelease}
              ListHeaderComponent={<Animated.View style={{ paddingTop: extraPaddingTop }} />}
            />
          ) : (
            <FlatList
              data={posts}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => <PostCard item={item} />}
              onScroll={onScroll}
              onScrollEndDrag={onScrollEndDrag}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={async () => {
                    setRefreshing(true);
                    await Promise.all([getAllPosts()(dispatch), getAllUsers()(dispatch)]);
                    setRefreshing(false);
                  }}
                  progressViewOffset={refreshingHeight}
                />
              }
              onResponderRelease={onRelease}
              ListHeaderComponent={<Animated.View style={{ paddingTop: extraPaddingTop }} />}
            />
          )}
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 3,
  },
  headerTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
    color: '#000',
    fontWeight: '600',
  },
  newText: {
    fontSize: 20,
    color: 'black',
  },
});
