import { View, Text, SafeAreaView, Image, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../redux/actions/getAllUsers';
import { Loader } from '../../components/Loader/Loader';
import { followUserAction, unfollowUserAction } from '../../redux/actions/followUser';
import { User } from '../../redux/reducers/User';
import { useNavigation } from '@react-navigation/native';

const SearchScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState<User[]>([]);
  const { users, user, isLoading } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllUsers()(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (users) {
      setData(users);
    }
  }, [users]);

  const handleSearchChange = (e: string) => {
    if (e.length !== 0) {
      const filteredUsers = users && users.filter((i: any) => i.name.toLowerCase().includes(e.toLowerCase()));
      setData(filteredUsers);
    } else {
      setData(users);
    }
  };

  const isUserFollowing = (item: User) => {
    return item.followers.some((follower) => follower.userId === user._id);
  };

  const handleFollowUnfollow = async (item: User) => {
    try {
      if (isUserFollowing(item)) {
        await unfollowUserAction({ userId: user._id, users, followUserId: item._id })(dispatch);
      } else {
        await followUserAction({ userId: user._id, users, followUserId: item._id })(dispatch);
      }
    } catch (error) {
      console.log(error, 'error');
    }
  };

  const navigateToUserProfile = (item: User) => {
    navigation.navigate('UserProfileScreen', {
      id: item._id,
    });
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>Search</Text>
          <View style={styles.searchContainer}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/2811/2811806.png',
              }}
              style={styles.searchIcon}
            />
            <TextInput
              onChangeText={handleSearchChange}
              placeholder="Search"
              placeholderTextColor="#000"
              style={styles.searchInput}
            />
          </View>
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => navigateToUserProfile(item)}>
                  <View style={styles.itemContainer}>
                    <Image source={{ uri: item?.avatar?.url }} style={styles.avatar} />
                    <View style={styles.itemContent}>
                      <View style={styles.nameContainer}>
                        <Text style={styles.name}>{item.name}</Text>
                        {item?.role === 'Admin' && (
                          <Image
                            source={{
                              uri: 'https://cdn-icons-png.flaticon.com/128/1828/1828640.png',
                            }}
                            style={styles.adminIcon}
                          />
                        )}
                      </View>
                      <Text style={styles.followerCount}>{item.followers.length} followers</Text>
                      <TouchableOpacity style={styles.followButton} onPress={() => handleFollowUnfollow(item)}>
                        <Text style={styles.followButtonText}>{isUserFollowing(item) ? 'Following' : 'Follow'}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item._id}
          />
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 3,
  },
  title: {
    fontSize: 30,
    color: '#000',
    fontWeight: '600',
  },
  searchContainer: {
    position: 'relative',
    marginTop: 12,
  },
  searchIcon: {
    height: 20,
    width: 20,
    position: 'absolute',
    top: 20,
    left: 2,
  },
  searchInput: {
    width: '100%',
    height: 38,
    backgroundColor: '#0000000e',
    borderRadius: 8,
    color: '#000',
    paddingLeft: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 100,
  },
  itemContent: {
    flex: 1,
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#00000020',
    paddingBottom: 2,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    color: 'black',
  },
  adminIcon: {
    width: 18,
    height: 18,
    marginLeft: 5,
  },
  followerCount: {
    marginTop: 1,
    fontSize: 16,
    color: '#444',
  },
  followButton: {
    borderRadius: 8,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    borderWidth: 1,
    borderColor: '#0000004b',
  },
  followButtonText: {
    color: 'black',
  },
});

export default SearchScreen;
