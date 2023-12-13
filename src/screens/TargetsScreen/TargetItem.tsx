import { Image, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setTarget } from '../../redux/actions/setTarget';
import { ContributionGraph } from 'react-native-chart-kit';
import { TargetSchema } from './TargetSchema';

export const TargetItem = ({ item, itemIndex }) => {
  const [isActine, setIsActive] = useState(false);
  const pressChange = () => {
    setIsActive(!isActine);
  };

  const dispatch = useDispatch();

  const handleSubmit = () => {
    console.log('map <<', myMap);
    item.subTargets.forEach((el) => {
      el.timeOrNumbers = [...el.timeOrNumbers, { value: myMap.get(el._id) }];
    });
    setTarget(item.subTargets, item._id)(dispatch);
  };

  const myMap: MyMap = new Map();

  item?.subTargets?.forEach((el) => {
    const id: string = el._id;
    myMap.set(id, '0');
  });

  const timeToString = (time: Date) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };

  const [value, setValue] = useState(0);

  const handleToolTip: any = {};

  const chartConfig = [
    {
      backgroundColor: '#000000',
      backgroundGradientFrom: '#1E2923',
      backgroundGradientTo: '#08130D',
      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
      style: {
        borderRadius: 16,
      },
    },
    {
      backgroundColor: '#022173',
      backgroundGradientFrom: '#022173',
      backgroundGradientTo: '#1b3fa0',
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16,
      },
      propsForBackgroundLines: {
        strokeDasharray: '', // solid background lines with no dashes
      },
    },
    {
      backgroundColor: '#ffffff',
      backgroundGradientFrom: '#ffffff',
      backgroundGradientTo: '#ffffff',
      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    },
    {
      backgroundColor: '#ffffff',
      backgroundGradientFrom: '#ffffff',
      backgroundGradientTo: '#ffffff',
      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    },
    {
      backgroundColor: '#26872a',
      backgroundGradientFrom: '#43a047',
      backgroundGradientTo: '#66bb6a',
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16,
      },
    },
    {
      backgroundColor: '#000000',
      backgroundGradientFrom: '#000000',
      backgroundGradientTo: '#000000',
      color: (opacity = 1) => `rgba(${255}, ${255}, ${255}, ${opacity})`,
    },
    {
      backgroundColor: '#0091EA',
      backgroundGradientFrom: '#0091EA',
      backgroundGradientTo: '#0091EA',
      color: (opacity = 1) => `rgba(${255}, ${255}, ${255}, ${opacity})`,
    },
    {
      backgroundColor: '#e26a00',
      backgroundGradientFrom: '#fb8c00',
      backgroundGradientTo: '#ffa726',
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16,
      },
    },
    {
      backgroundColor: '#b90602',
      backgroundGradientFrom: '#e53935',
      backgroundGradientTo: '#ef5350',
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16,
      },
    },
    {
      backgroundColor: '#ff3e03',
      backgroundGradientFrom: '#ff3e03',
      backgroundGradientTo: '#ff3e03',
      color: (opacity = 1) => `rgba(${0}, ${0}, ${0}, ${opacity})`,
    },
  ];

  const graphStyle = {
    marginVertical: 8,
    alignSelf: 'center',
    ...chartConfig.style,
  };

  const [isToday, setIsToday] = useState(true);

  return (
    <TouchableOpacity
      key={itemIndex}
      onPress={pressChange}
      style={{
        backgroundColor: '#e1d5f5',
        marginVertical: 10,
        borderRadius: 20,
        marginHorizontal: 10,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            height: 50,
            borderRadius: 12,
            alignSelf: 'flex-start',
            justifyContent: 'center',
            // backgroundColor: "#9b9b9b",
            marginVertical: 10,
            borderColor: '#3C1874',
          }}
        >
          <Text
            style={{
              fontSize: 24,
              marginHorizontal: 7,
              color: 'black',
              marginLeft: 20,
              // fontWeight: "bold"
            }}
          >
            {item.name?.length > 8 ? item.name.slice(0, 8) + '...' : item.name}
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleSubmit}
          style={{
            height: 45,
            borderRadius: 40,
            backgroundColor: '#3c1874',
            alignItems: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
            width: 45,
            marginRight: 10,
            marginLeft: 'auto',
          }}
        >
          <Text style={{ fontSize: 18, color: 'white' }}>Ok</Text>
        </TouchableOpacity>
      </View>

      {isActine &&
        item.subTargets.map((el) => {
          return (
            <View style={{ marginHorizontal: 40, paddingBottom: 20 }}>
              {isToday ? (
                <TargetSchema el={el} myMap={myMap} />
              ) : (
                <>
                  <Text style={{ fontSize: 18, color: 'black' }}>{el.text}</Text>
                  <ContributionGraph
                    showOutOfRangeDays={true}
                    values={el.timeOrNumbers.map((item) => {
                      return { count: Number(item.value), date: timeToString(item.timestamp) };
                    })}
                    endDate={new Date(Date.now())}
                    numDays={64}
                    width={280}
                    height={220}
                    chartConfig={chartConfig[5]}
                    style={graphStyle}
                    tooltipDataAttrs={(value) => handleToolTip}
                  />
                </>
              )}
            </View>
          );
        })}
      {isActine && (
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          <TouchableOpacity onPress={() => setIsToday(true)} style={{ marginHorizontal: 10 }}>
            <Image source={require('../../../assets/images/time.png')} style={{ width: 25, height: 27 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsToday(false)} style={{ marginHorizontal: 10 }}>
            <Image source={require('../../../assets/images/bar-chart.png')} style={{ width: 25, height: 25 }} />
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};
