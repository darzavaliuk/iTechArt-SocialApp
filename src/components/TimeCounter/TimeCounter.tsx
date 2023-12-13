import { StyleSheet, TextInput, View } from 'react-native';
import { useRef, useState } from 'react';

export const TimeCounter = ({ map, id }) => {
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const minutesRef = useRef(null);
  const secondsRef = useRef(null);

  const handleHoursChange = (text) => {
    if (/^\d{0,2}$/.test(text)) {
      setHours(text);
      if (text.length === 2) {
        minutesRef.current.focus();
      }
      map.set(id, text * 60 * 60 + minutes * 60 + seconds * 1 + '');
      console.log(map);
    }
  };

  const handleMinutesChange = (text) => {
    if (/^\d{0,2}$/.test(text)) {
      setMinutes(text);
      if (text.length === 2) {
        secondsRef.current.focus();
      }
      map.set(id, hours * 3600 + text * 60 + seconds * 1 + '');
    }
  };

  const handleSecondsChange = (text) => {
    if (/^\d{0,2}$/.test(text)) {
      setSeconds(text);
      map.set(id, hours * 3600 + minutes * 60 + text * 1 + '');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, hours !== '' && styles.activeInput]}
        value={hours}
        onChangeText={handleHoursChange}
        placeholder="HH"
        keyboardType="numeric"
        maxLength={2}
      />
      <TextInput
        ref={minutesRef}
        style={[styles.input, minutes !== '' && styles.activeInput]}
        value={minutes}
        onChangeText={handleMinutesChange}
        placeholder="MM"
        keyboardType="numeric"
        maxLength={2}
      />
      <TextInput
        ref={secondsRef}
        style={[styles.input, seconds !== '' && styles.activeInput]}
        value={seconds}
        onChangeText={handleSecondsChange}
        placeholder="SS"
        keyboardType="numeric"
        maxLength={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingHorizontal: 16,
  },
  input: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    // paddingHorizontal: 8,
    fontSize: 18,
    marginRight: 5,
  },
  activeInput: {
    borderColor: 'blue',
  },
});
