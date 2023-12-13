import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TargetItem } from './TargetItem';

export const TargetCard = ({ row }) => {
  const navigation = useNavigation();

  return (
    <ScrollView style={{ flex: 1 }}>
      {row.map((item, itemIndex) => (
        <TargetItem item={item} itemIndex={itemIndex} />
      ))}
      <TouchableOpacity
        style={{
          marginVertical: 10,

          height: 60,
          width: undefined,
          backgroundColor: '#3C1874',
          borderRadius: 12,
          alignItems: 'center',
          marginHorizontal: 10,
        }}
        onPress={() => navigation.navigate('TargetScreen' as never)}
      >
        <Text style={{ color: 'white', fontSize: 48 }}>+</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
