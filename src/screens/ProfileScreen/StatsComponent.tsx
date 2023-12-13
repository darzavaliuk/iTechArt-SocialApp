import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TargetSchema, User } from '../../redux/reducers/User';

interface StatsComponentProps {
  targets: TargetSchema[];
  user: User;
}

export const StatsComponent: React.FC<StatsComponentProps> = ({ targets, user }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('TargetsScreen' as never)}>
      <View style={styles.statsContainer}>
        <View style={styles.statsBox}>
          <Text style={[styles.text, styles.largeText]}>{targets?.length}</Text>
          <Text style={[styles.text, styles.subText]}>Targets</Text>
        </View>

        <View style={styles.separator} />

        <TouchableOpacity
          style={styles.statsBox}
          onPress={() =>
            navigation.navigate('FollowersScreen', {
              followers: user?.followers,
            })
          }
        >
          <Text style={[styles.text, styles.largeText]}>{user?.followers?.length}</Text>
          <Text style={[styles.text, styles.subText]}>Followers</Text>
        </TouchableOpacity>

        <View style={styles.separator} />

        <TouchableOpacity
          style={styles.statsBox}
          onPress={() =>
            navigation.navigate('FollowingScreen', {
              following: user?.following,
            })
          }
        >
          <Text style={[styles.text, styles.largeText]}>{user?.following?.length}</Text>
          <Text style={[styles.text, styles.subText]}>Following</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20,
  },
  statsBox: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 10,
  },
  largeText: {
    fontSize: 30,
  },
  subText: {
    fontSize: 12,
    color: '#2b2e2f',
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  text: {
    fontFamily: 'HelveticaNeue',
    fontWeight: 'bold',
    color: '#282b2d',
  },
  separator: {
    backgroundColor: '#0e1c4c',
    width: 10,
    alignSelf: 'center',
    borderRadius: 20,
    height: 80,
  },
});
