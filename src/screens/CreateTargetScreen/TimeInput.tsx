import {StyleSheet, TextInput, View, Text} from "react-native";
import {useRef, useState} from "react";

export const TimeInput = ({timeInSeconds, setTime}) => {
    const [hours, setHours] = useState('');
    const [minutes, setMinutes] = useState('');
    const [seconds, setSeconds] = useState('');
    const minutesRef = useRef(null);
    const secondsRef = useRef(null);

    const handleHoursChange = (text) => {
        if (/^\d{0,2}$/.test(text)) {
            setHours(text);
            if (text.length === 2) {
                minutesRef.current.focus();
            }
            setTime(text * 60 * 60 + minutes * 60 + seconds * 1 + "")
            console.log(timeInSeconds)
            // timeInSeconds = text * 60 * 60 + minutes * 60 + seconds + ""
        }
    };

    const handleMinutesChange = (text) => {
        if (/^\d{0,2}$/.test(text)) {
            setMinutes(text);
            if (text.length === 2) {
                secondsRef.current.focus();
            }
            setTime(hours * 3600 + text * 60 + seconds * 1 + "")
            console.log(timeInSeconds)
        }
    };

    const handleSecondsChange = (text) => {
        if (/^\d{0,2}$/.test(text)) {
            setSeconds(text);
            setTime(hours * 3600 + minutes * 60 + text * 1 + "")
            console.log(timeInSeconds)
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
            <Text style={{fontSize: 30}}>:</Text>
            <TextInput
                ref={minutesRef}
                style={[styles.input, minutes !== '' && styles.activeInput]}
                value={minutes}
                onChangeText={handleMinutesChange}
                placeholder="MM"
                keyboardType="numeric"
                maxLength={2}
            />
            <Text style={{fontSize: 30}}>:</Text>
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
    },
    input: {
        marginHorizontal: 5,
        width: 50,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 8,
        fontSize: 16,
    },
    activeInput: {
        borderColor: 'blue',
    },
});
