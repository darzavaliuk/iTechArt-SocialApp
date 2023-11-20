import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {Agenda, AgendaSchedule} from 'react-native-calendars';
import {Card} from 'react-native-paper';
import {loadTargets} from "../../redux/actions/loadTargets";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/reducers/rootReducer";
// @ts-ignore
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import LottieView from 'lottie-react-native';
import {Loader} from "../Loader/Loader";
import {TargetSchema} from "../../redux/reducers/User";

const timeToString = (time: Date) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
};

interface AgendaEntry {
    name: string;
    maxValue: string;
    value: string;
    height?: number;
    day?: string;
}

interface Items {
    [key: string]: AgendaEntry[];
}

const selectTargets = (state: RootState) => state.user.targets;

export const Calendar: React.FC = () => {
    const [items, setItems] = useState<Items>({});
    const targets = useSelector(selectTargets);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadTargets()(dispatch).then(() => {
            setLoading(true)
            targets.forEach((target: TargetSchema) => {
                let nameOfTarget = target.name;
                target.subTargets.forEach((item) => {
                    let name = item.text;
                    let maxValue = item.maxValue
                    item.timeOrNumbers.forEach((el) => {
                        let strTime = timeToString(el.timestamp);
                        if (!items[strTime]) {
                            items[strTime] = [];
                        }
                        items[strTime].push({
                            name: nameOfTarget + " - " + name + " ",
                            maxValue: maxValue!,
                            value: el.value
                        });
                    })
                })
                const newItems = {} as Items;
                Object.keys(items).forEach((key) => {
                    newItems[key] = items[key];
                });
                setItems(newItems);
            })
            setLoading(false)
        });
    }, [])

    const renderItem = (item: Items) => {
        return (
            <View style={{marginRight: 10, marginTop: 30, marginBottom: 10, backgroundColor: "white"}}>
                <Card>
                    <Card.Content>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                        </View>
                        <Text>Target: {item.name}</Text>
                        <Text>Your result: {item.value}</Text>
                        <Text>Your target: {item.maxValue}</Text>
                        <View style={{alignSelf: "center"}}>
                            <LottieView
                                source={require("../../../assets/animation_lkbqh8co.json")}
                                autoPlay
                                loop
                                style={{
                                    height: 70,
                                    left: Number(item.value) / Number(item.maxValue) * 200 - 40,
                                    width: 70
                                }}
                            />
                            <ProgressBarAnimated
                                value={Number(item.value) / Number(item.maxValue) * 100}
                                backgroundColorOnComplete="#6CC644"
                                width={200}
                            />
                        </View>
                    </Card.Content>
                </Card>
            </View>
        );
    };

    const currentDate = new Date();

    return (
        <View style={{flex: 1, backgroundColor: "white"}}>
            {!loading ?
                <Agenda
                    items={items as AgendaSchedule}
                    renderEmptyData={() => <></>}
                    selected={timeToString(currentDate)}
                    renderItem={renderItem}
                    theme={{
                        agendaTodayColor: 'red',
                        selectedDayBackgroundColor: '#3C1874',
                        todayTextColor: '#3C1874',
                    }}
                /> : <Loader/>}
        </View>
    );
};
