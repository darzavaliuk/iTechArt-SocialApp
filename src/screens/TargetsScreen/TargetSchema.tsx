import { Text, View } from 'react-native';
import { Diagram } from './Diagram';
import SlidingCounter from '../../components/Counter/SlidingCounter';
import { TimeCounter } from '../../components/TimeCounter/TimeCounter';
import React, { useState } from 'react';

export const TargetSchema = ({ el, myMap }) => {
  const [value, setValue] = useState(0);
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <Diagram el={el} value={value} />
        <View style={{ marginHorizontal: 40, paddingBottom: 20 }}>
          <Text style={{ fontSize: 18, color: 'black' }}>{el.text}</Text>
          <Text style={{ fontSize: 18, color: 'black' }}> (max: {el.maxValue})</Text>
          {el.way === '1' ? (
            <SlidingCounter setValue={setValue} map={myMap} id={el._id} />
          ) : (
            <TimeCounter map={myMap} id={el._id} />
          )}
        </View>
      </View>
    </>
  );
};
