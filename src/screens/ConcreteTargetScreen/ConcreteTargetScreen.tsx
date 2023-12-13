import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useState } from 'react';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import RNDateTimeSelector from '../../components/TimePicker/countDownTimeSelector';
import SlidingCounter from '../../components/Counter/SlidingCounter';
import { TimeCounter } from '../../components/TimeCounter/TimeCounter';
import { useDispatch } from 'react-redux';
import { createTarget } from '../../redux/actions/createTarget';
import { setTarget } from '../../redux/actions/setTarget';

type Props = {
  navigation: any;
};

export const ConcreteTargetScreen = ({ navigation }: Props) => {
  const route = useRoute();
  const { item } = route.params;
  console.log('item', item);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    console.log(myMap);
    item.subTargets.forEach((el) => {
      el.timeOrNumbers = [...el.timeOrNumbers, { value: myMap.get(el._id) }];
      console.log(el);
    });
    setTarget(item.subTargets, item._id)(dispatch);
  };

  type MyMap = Map<string, string>;

  const myMap: MyMap = new Map();

  item.subTargets.forEach((el) => {
    const id: string = el._id;
    myMap.set(id, '0');
  });

  return (
    <View style={{ flex: 1, backgroundColor: '#F3F3F3', marginTop: 20, marginHorizontal: 5 }}>
      <View style={{ flex: 20 }}>
        <View style={{ flexDirection: 'row', marginVertical: 5 }}>
          <Text style={{ color: '#932432', fontWeight: 'bold', fontSize: 30 }}>Target: </Text>
          <Text style={{ color: '#3C1874', fontSize: 30 }}>{item.name}</Text>
        </View>
        {item.subTargets.map((el) => {
          return (
            <View key={el._id}>
              <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                <Text style={{ color: '#932432', fontWeight: 'bold', fontSize: 20 }}>Subtarget: </Text>
                <Text style={{ color: '#3C1874', fontSize: 20 }}>{el.text}</Text>
              </View>
              {el.way === '1' ? <SlidingCounter map={myMap} id={el._id} /> : <TimeCounter map={myMap} id={el._id} />}
            </View>
          );
        })}
      </View>
      <TouchableOpacity
        onPress={handleSubmit}
        style={{
          flex: 1,
          padding: 10,
          borderRadius: 10,
          backgroundColor: '#3c1874',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ fontSize: 20, color: 'white' }} onPress={() => navigation.goBack()}>
          Save result
        </Text>
      </TouchableOpacity>
    </View>
  );
};
