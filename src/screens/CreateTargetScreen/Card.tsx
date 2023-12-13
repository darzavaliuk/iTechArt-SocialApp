import React from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SHADOW, SIZES } from './constants';

const styles = StyleSheet.create({
  view: {
    width: '80%',
    paddingVertical: 10,
    paddingHorizontal: SIZES.padding,
    borderRadius: SIZES.borderRadius,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
    marginBottom: 15,
    alignContent: 'center',
    marginHorizontal: 10,
  },
  text: {
    ...FONTS.h2_semiBold,
    color: COLORS.primary,
  },
  checkbox: {
    marginRight: 15,
  },
});

export default function Card(props) {
  return (
    <View style={{ flexDirection: 'row' }}>
      <Pressable style={styles.view} onLongPress={() => props.deleteItem(props.index)}>
        {/*<CheckBox style={styles.checkbox}*/}
        {/*          value={props.data.isSelected}*/}
        {/*          onValueChange={(value) => props.setIsSelected(props.index, value)}*/}
        {/*/>*/}
        <View style={{ width: 20, height: 20, backgroundColor: '#52d3fc', marginRight: 5, borderRadius: 5 }} />
        <Text
          style={{
            ...styles.text,
          }}
        >
          {props.data.text}
        </Text>
      </Pressable>
      <TouchableOpacity onPress={() => props.editItem(props.index, props.data)}>
        <Text>Edit</Text>
      </TouchableOpacity>
    </View>
  );
}
