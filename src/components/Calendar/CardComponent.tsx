import {Card} from "react-native-paper";
import {View, Text, StyleSheet} from "react-native";
import LottieView from "lottie-react-native";
// @ts-ignore
import ProgressBarAnimated from "react-native-progress-bar-animated";

export const CardComponent = ({target}) => {
    return (
        <Card style={styles.card}>
            <Card.Content>
                <View style={styles.cardContent}>
                    <Text>Target: {target.text}</Text>
                    <Text>Your result: {target.value}</Text>
                    <Text>Your target: {target.maxValue}</Text>
                </View>
                <View style={{alignSelf: 'center'}}>
                    <LottieView
                        source={require("../../../assets/animation_lkbqh8co.json")}
                        autoPlay
                        loop
                        style={{
                            height: 70,
                            left: Number(target.value) / Number(target.maxValue) * 200 - 40,
                            width: 70
                        }}

                    />
                    <ProgressBarAnimated
                        value={(Number(target.value) / Number(target.maxValue)) * 100}
                        backgroundColorOnComplete="#6CC644"
                        width={200}
                        style={styles.progressBar}
                        useNativeDriver={false}
                    />
                </View>
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        marginBottom: 10,
    },
    cardContent: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        // alignItems: 'center',
        marginLeft: 20
    },
    targetText: {
        alignSelf: 'center',
    },
    resultText: {
        alignSelf: 'center',
    },
    maxValueText: {
        alignSelf: 'center',
    },
    progressBar: {
        alignSelf: 'center',
    },
})
