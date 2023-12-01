import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    Alert,
    StyleSheet,
    Button
} from "react-native";
import {FONTS, SHADOW, SIZES, COLORS} from "./constants";
import Card from "./Card";
import {useCallback, useMemo, useRef, useState} from "react";
import {createTarget} from "../../redux/actions/createTarget";
import {useDispatch} from "react-redux";
import {TimeInput} from "./TimeInput";
import BottomSheet from "./BottomShhet";
import Modal from "react-native-modal";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

export const CreateTargetScreen = () => {
    const [valueNameOfTarget, setValueTarget] = useState("")
    const [list, setList] = useState([])
    const [value, setValue] = useState("")
    const [maxValue, setMaxValue] = useState(0)

    function addText(text) {
        if (value !== "") {
            setList(prev => {
                return [
                    ...prev,
                    {text: text, way: selectedId, maxValue: maxValue}
                ]
            })
            setValue("")
        }
    }

    function deleteItem(idx) {
        Alert.alert(
            "Delete Item",
            "Are you sure you want to delete this item?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Yes", onPress: () => {
                        const data = list.filter((item, index) => index !== idx)
                        setList(data)
                    }
                }
            ])
    }

    function editItem(idx, item) {
        setModalVisible(!isModalVisible);
        console.log(item)
        const data = list.filter((item, index) => index !== idx)
        setList(data)
        setValue(item.text)
        setSelectedId(item.way)
        setMaxValue(item.maxValue)
    }

    const radioButtons = useMemo(() => ([
        {
            id: '1',
            label: 'Amount',
            value: 'option1'
        },
        {
            id: '2',
            label: 'Time',
            value: 'option2'
        }
    ]), []);

    const [selectedId, setSelectedId] = useState();
    const dispatch = useDispatch();

    const saveTarget = () => {
        createTarget(list, valueNameOfTarget)(dispatch);
        console.log(valueNameOfTarget)
        console.log(list)
        return;
    }

    const bottomSheetRef = useRef<BottomSheet>(null);

    // variables
    const snapPoints = useMemo(() => ['25%', '50%'], []);

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        addText(value)
        setModalVisible(!isModalVisible);
    };

    // const ref = useRef<BottomSheetRefProps>(null);

    // const onPress = useCallback(() => {
    //     const isActive = ref?.current?.isActive();
    //     if (isActive) {
    //         ref?.current?.scrollTo(0);
    //     } else {
    //         ref?.current?.scrollTo(-200);
    //     }
    // }, []);

    //   const bottomSheetRef2 = useRef<BottomSheetMethods>(null);
    //
    // const pressHandler2 = useCallback(() => {
    //     bottomSheetRef2.current?.expand();
    // }, []);

    return (
        <View style={styles.container}>
            <View style={{flexDirection: "row", justifyContent: "space-between", marginVertical: 10}}>
                <TextInput
                    style={[styles.textInput, {alignSelf: "center"}]}
                    placeholder="New target..."
                    placeholderTextColor={COLORS.primary}
                    onChangeText={text => setValueTarget(text)}
                    value={valueNameOfTarget}
                />
                <TouchableOpacity onPress={saveTarget} style={{flex: 1, height: 40}}>
                    <Text style={{
                        fontSize: 20,
                        backgroundColor: "#4b37bc",
                        borderRadius: 10,
                        padding: 5,
                        color: COLORS.secondary,
                        justifyContent: "center",
                        alignSelf: "center"
                    }}>Save</Text>
                </TouchableOpacity>
            </View>

            {/*<Button title="Example" onPress={() => pressHandler2()} />*/}
            {/*<BottomSheet*/}
            {/*    ref={bottomSheetRef2}*/}
            {/*    snapTo={'60%'}*/}
            {/*    backgroundColor={'#ffe7cf'}*/}
            {/*    backDropColor={'black'}>*/}
            {/*    <Example />*/}
            {/*</BottomSheet>*/}

            {/*<TouchableOpacity style={styles.button} onPress={onPress}/>*/}
            {/*<BottomSheet ref={ref}>*/}
            {/*    <View style={{flex: 1, backgroundColor: 'orange'}}>*/}

            {/*    </View>*/}
            {/*</BottomSheet>*/}


            <Modal
                isVisible={isModalVisible}
                onBackdropPress={() => setModalVisible(false)}
            >
                <View style={{
                    width: undefined,
                    height: 250,
                    backgroundColor: "white",
                    borderRadius: 20,
                    alignSelf: "center",
                    padding: 10
                }}>
                    {/*<View style={styles.textBoxContainer}>*/}
                    <View style={styles.textBoxWrapper}>
                        <TextInput
                            style={[styles.textInput, {marginTop: 5}]}
                            placeholder="New Task..."
                            placeholderTextColor={COLORS.primary}
                            onChangeText={text => setValue(text)}
                            value={value}/>
                        {/*<TouchableOpacity*/}
                        {/*    style={styles.btn}*/}
                        {/*    onPress={() => addText(value)}>*/}
                        {/*    <Text style={{fontSize: 34, color: COLORS.secondary}}>+</Text>*/}
                        {/*</TouchableOpacity>*/}
                    </View>
                    <View>
                        <View style={{flexDirection: "row", marginVertical: 15}}>
                            <Text style={styles.text}>Goal type: </Text>
                            <RadioForm
                                formHorizontal={false}
                                animation={true}
                            >
                                {/* To create radio buttons, loop through your array of options */}
                                {
                                    radioButtons.map((obj, i) => {
                                        console.log(selectedId, obj)
                                        return (<RadioButton labelHorizontal={true} key={i}>
                                                <RadioButtonInput
                                                    obj={obj}
                                                    index={i}
                                                    isSelected={selectedId == i}
                                                    onPress={() => setSelectedId(i)}

                                                    // borderWidth={1}
                                                    buttonInnerColor={'#2ecc71'}
                                                    buttonOuterColor={selectedId == i ? '#2196f3' : '#000'}
                                                    buttonSize={20}
                                                    buttonOuterSize={20}
                                                    buttonStyle={{}}
                                                    buttonWrapStyle={{marginLeft: 10}}
                                                />
                                                <RadioButtonLabel
                                                    obj={obj}
                                                    index={i}
                                                    labelHorizontal={true}
                                                    onPress={() => setSelectedId(i)}
                                                    labelStyle={{fontSize: 20, color: 'black'}}
                                                    labelWrapStyle={{}}

                                                />
                                            </RadioButton>
                                        )
                                    })
                                }
                            </RadioForm>
                        </View>
                        <View style={{flexDirection: "row", marginVertical: 10}}>
                            <Text style={styles.text}>Goal value:</Text>
                            {selectedId == 1 ? (
                                <TextInput style={[styles.textInput, {width: "53%"}]}
                                           onChangeText={text => setMaxValue(text)}
                                           value={maxValue}/>
                            ) : (
                                <TimeInput timeInSeconds={maxValue} setTime={setMaxValue}/>
                            )}
                        </View>
                    </View>
                    {/*</View>*/}

                    <Button title="Save" onPress={toggleModal}/>
                </View>
            </Modal>


            <FlatList style={{flex: 1}}
                      data={list}
                      renderItem={({item, index}) => <Card data={item} index={index}
                                                           deleteItem={deleteItem}
                                                           editItem={editItem}
                      />}
                      keyExtractor={(item, index) => index.toString()}
            />

            <TouchableOpacity onPress={toggleModal} style={{
                width: 70,
                borderRadius: 70,
                height: 70,
                backgroundColor: "#4b37bc",
                marginRight: 5,
                marginLeft: "auto",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 5
            }}><Text style={{fontSize: 40, color: "white"}}>+</Text></TouchableOpacity>


            {/*</View>*/}
        </View>
    )
}

const styles = StyleSheet.create({
    textBoxContainer: {
        flexDirection: "column",

    },
    text: {
        color: COLORS.primary,
        // marginRight: 15,
        ...FONTS.h2_semiBold,
    },
    container: {
        // paddingTop: Platform.OS === "ios" ? 40 : StatusBar.currentHeight + 10,
        flex: 1,
        backgroundColor: "#dbe9f6"
        // backgroundColor: COLORS.primary,
        // padding: SIZES.padding
    },
    buttonContainer: {
        backgroundColor: COLORS.primary,
        alignItems: "flex-start",
        alignSelf: "flex-start",
        alignContent: "flex-start",
        justifyContent: "flex-start",
        flexDirection: "column",
        left: 0,
        marginLeft: 0
    },
    textBoxWrapper: {
        width: "100%",
        // position: "absolute",
        bottom: 0,
        left: 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        // padding: SIZES.padding,
        // backgroundColor: "black"
    },
    panelContainer: {
        backgroundColor: "white",
    },
    textInput: {
        // backgroundColor: COLORS.secondary,
        height: 42,
        paddingLeft: 15,
        width: "80%",
        marginLeft: 10,
        color: COLORS.primary,
        // marginRight: 15,
        ...FONTS.h2_semiBold,
        borderStyle: "solid",
        borderBottomWidth: 2,
        borderColor: "black"
    },
    btn: {
        ...SHADOW,
        backgroundColor: COLORS.accent,
        height: 42,
        width: 42,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        height: 50,
        borderRadius: 25,
        aspectRatio: 1,
        backgroundColor: 'white',
        opacity: 0.6,
    },
})
