import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
// @ts-ignore
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import { CardComponent } from './CardComponent';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers/rootReducer';
import { fetchEvents } from '../../redux/actions/getEvents';

const selectEvent = (state: RootState) => state.events;
export const Calendar = () => {
  const [activeDate, setActiveDate] = useState(new Date());
  const [dots, setDots] = useState(Array(31).fill(false));
  const [day, setDay] = useState('');

  const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const dispatch = useDispatch();

  const { data } = useSelector(selectEvent);

  const fetchEvent = async (month: number, year: number) => {
    await fetchEvents(month, year)(dispatch);
  };

  useEffect(() => {
    const newDots: boolean[] = Array(31).fill(false);
    data?.subTargets?.forEach((subTarget: any) => {
      const index: number = Number(subTarget._id.slice(-2));
      newDots[index] = true;
    });

    setDots([...newDots]);
  }, [data]);

  const WEEK_DAYS: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  useEffect(() => {
    const currentDate: Date = new Date(Date.now());
    console.log(currentDate);
    setActiveDate(currentDate);
    console.log(currentDate.getMonth(), currentDate.getFullYear());
    fetchEvent(currentDate.getMonth(), currentDate.getFullYear());
  }, []);

  const changeMonth = (n: number): void => {
    setActiveDate((prevActiveDate: Date) => {
      const newActiveDate: Date = new Date(prevActiveDate);
      const newMonth: number = newActiveDate.getMonth() + n;
      fetchEvent(newMonth, activeDate.getFullYear());
      newActiveDate.setMonth(newMonth);
      return newActiveDate;
    });
  };

  const WEEKDAYS: number = 7;
  const FIRST_ROW: number = 1;
  const LAST_ROW: number = 6;

  const generateMatrix = (): Array<Array<number | string>> => {
    const matrix: Array<Array<number | string>> = [];
    matrix[0] = WEEK_DAYS;

    const year: number = activeDate.getFullYear();
    const month: number = activeDate.getMonth();
    const firstDay: number = new Date(year, month, 1).getDay();
    const maxDays: number = getNumberOfDays(year, month);

    let counter: number = 1;
    for (let row: number = FIRST_ROW; row <= LAST_ROW; row++) {
      matrix[row] = [];
      for (let col: number = 0; col < WEEKDAYS; col++) {
        if (row === FIRST_ROW && col >= firstDay) {
          matrix[row][col] = counter++;
        } else if (row > FIRST_ROW && counter <= maxDays) {
          matrix[row][col] = counter++;
        } else {
          matrix[row][col] = ' ';
        }
      }
    }

    return matrix;
  };

  const getNumberOfDays = (year: number, month: number): number => {
    const DAYS_IN_MONTH: number[] = [
      31, // January
      28, // February
      31, // March
      30, // April
      31, // May
      30, // June
      31, // July
      31, // August
      30, // September
      31, // October
      30, // November
      31, // December
    ];
    const isLeapYear: boolean = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

    if (month === 1 && isLeapYear) {
      return DAYS_IN_MONTH[month] + 1; // February in a leap year
    }

    return DAYS_IN_MONTH[month];
  };

  const matrix = generateMatrix();

  const modalTrigger = (d: string | number) => {
    console.log(d);
    setDay(d.toString());
  };

  function generateUniqueKey() {
    return Math.random().toString(36).substr(2, 9);
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.buttonChangeMonthLeft} onPress={() => changeMonth(-1)}>
          <Text style={{ fontSize: 28, color: 'white' }}>{'\u003C'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {MONTHS[activeDate.getMonth()]} &nbsp;
          {activeDate.getFullYear()} &nbsp;
        </Text>
        <TouchableOpacity style={styles.buttonChangeMonthRight} onPress={() => changeMonth(+1)}>
          <Text style={{ fontSize: 28, color: 'white' }}>{'\u003E'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={styles.calendar}>
          {matrix.map((row, k) => (
            <View style={styles.dayRow} key={k}>
              {row.map((d, ind) => (
                <TouchableOpacity
                  onPress={() => modalTrigger(d)}
                  disabled={false}
                  style={styles.buttonCalendar}
                  key={generateUniqueKey()}
                >
                  <Text
                    style={[
                      ind === 0
                        ? k === 0
                          ? styles.sun
                          : styles.sunDates
                        : k === 0
                        ? styles.dayRowText
                        : styles.otherRowText,
                      dots[d] && styles.dottedDate,
                    ]}
                  >
                    {d}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
          <ScrollView style={{ width: '100%' }}>
            <View>
              {data &&
                data?.subTargets?.map((subtarget) => {
                  const date = subtarget._id.slice(-2);
                  console.log(Number(date));
                  if (Number(date) == day) {
                    return subtarget.events.map((target, index: number) => (
                      <CardComponent target={target} key={index + target._id} />
                    ));
                  }
                  return null;
                })}
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};
export default Calendar;

const styles = StyleSheet.create({
  backBtn: {
    position: 'absolute',
    zIndex: 11,
    margin: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  calendar: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    left: 10,
    flexDirection: 'column',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 500,
    width: 400,
  },
  buttonCalendar: {
    width: 50,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
  },
  headerContainer: {
    width: 500,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center',
    backgroundColor: '#3C1874',
  },
  buttonChangeMonthLeft: {
    position: 'absolute',
    left: 150,
  },
  buttonChangeMonthRight: {
    position: 'absolute',
    right: 150,
  },
  container: {
    flex: 1,
    padding: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    // backgroundColor: 'rgba(168, 218, 220,0.4)',
  },

  sun: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
  },

  sunDates: {
    color: 'red',
    fontSize: 18,
    // paddingLeft: 10,
  },

  three: {
    fontSize: 18,
  },

  dayRowText: {
    fontSize: 18,
    fontWeight: 'bold',
    // justifyContent: "center",
  },

  otherRowText: {
    fontSize: 18,
    // justifyContent: "center"
  },
  dayRow: {
    flexDirection: 'row',
    // paddingRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    // flex: 0,
    alignSelf: 'center',
  },

  otherRows: {
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },

  dottedDate: {
    backgroundColor: 'blue',
    width: 30,
    borderRadius: 4,
    paddingHorizontal: 3,
    paddingVertical: 1,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    textAlign: 'center',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    textAlign: 'center',
    fontSize: 24,
  },
  modalButton: {
    backgroundColor: 'transparent',
    borderRadius: 100,
    borderColor: '#ffffff',
    marginTop: 64,
    borderWidth: 1,
  },
  moreText: {
    textAlign: 'center',
    marginTop: 64,
  },
  helloText: {
    fontSize: 51.2,
    textAlign: 'center',
    marginTop: 20,
  },
  wrap: {
    width: 400,
    borderRadius: 8,
    backgroundColor: '#203953',
    shadowColor: '#4048BF',
    shadowOpacity: 0.74,
    shadowRadius: 30,
    elevation: 10,
  },
  text: {
    fontSize: 28.8,
    color: '#ECF0F9',
    fontWeight: '600',
    fontFamily: 'Avenir',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadowButton: {
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 105,
    width: 210,
    height: 80,
    shadowColor: '#4048BF',
    shadowOffset: { width: 8.4, height: 8.4 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 10,
  },
  mainButton: {
    zIndex: 10,
    width: 200,
    height: 70,
    borderRadius: 100,
    shadowColor: '#40488F',
    shadowOffset: { width: 6.4, height: 6.4 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    backgroundColor: '#203953',
  },
});
