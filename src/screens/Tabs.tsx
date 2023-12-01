import React, {useEffect, useReducer, useRef} from 'react'
import {
    Pressable,
    StyleSheet,
    View,
    Text,
    LayoutChangeEvent,
} from 'react-native'
import {BottomTabBarProps, BottomTabNavigationOptions, createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import Animated, {useAnimatedStyle, withTiming, useDerivedValue} from 'react-native-reanimated'
import Lottie from 'lottie-react-native'
import Svg, {Path} from "react-native-svg";
import {ProfileScreen} from "./ProfileScreen/ProfileScreen";
import {Calendar} from "../components/Calendar/Calendar";
import {PostsDisplayScreen} from "./PostsDisplayScreen/PostsDisplayScreen";
import SearchScreen from "./SearchScreen/SearchScreen";
import NotificationScreen from "./NotificationScreen/NotificationScreen";

const Tab = createBottomTabNavigator()

const AnimatedSvg = Animated.createAnimatedComponent(Svg)

const Tabs = () => {
    const tabScreens = [
        {
            name: "ProfileScreen",
            component: ProfileScreen,
            source: require('../../assets/images/home.icon.json'),
            style: styles.icon
        },
        {
            name: "CalendarScreen",
            component: Calendar,
            source: require('../../assets/images/settings.icon.json'),
            style: styles.iconBig
        },
        {
            name: "Posts",
            component: PostsDisplayScreen,
            source: require('../../assets/images/chat.icon.json'),
            style: styles.icon
        },
        // {
        //     name: "PostScreen",
        //     component: PostScreen,
        //     source: require('../../assets/images/Animation - 1699988257425.json'),
        // },
        {
            name: "NotificationScreen",
            component: NotificationScreen,
            source: require('../../assets/images/notification.icon.json'),
            style: styles.iconBig
        },
        {
            name: "Search",
            component: SearchScreen,
            source: require('../../assets/images/search.icon.json'),
            style: styles.icon
        },
    ];

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarHideOnKeyboard: true,
            }}
            tabBar={(props) => <AnimatedTabBar {...props} />}
        >
            {tabScreens.map((tab) => (
                <Tab.Screen
                    key={tab.name}
                    name={tab.name}
                    component={tab.component}
                    options={{
                        tabBarIcon: ({ ref }) => <Lottie ref={ref} loop={false} source={tab.source} style={tab.style} />,
                    }}
                />
            ))}
        </Tab.Navigator>
    );
};

const AnimatedTabBar = ({state: {index: activeIndex, routes}, navigation, descriptors}: BottomTabBarProps) => {
    const {bottom} = useSafeAreaInsets()

    const reducer = (state: any, action: { x: number, index: number }) => {
        return [...state, {x: action.x, index: action.index}]
    }

    const [layout, dispatch] = useReducer(reducer, [])

    const handleLayout = (event: LayoutChangeEvent, index: number) => {
        dispatch({x: event.nativeEvent.layout.x, index})
    }

    const xOffset = useDerivedValue(() => {
        if (layout.length !== routes.length) return 0;
        return [...layout].find(({index}) => index === activeIndex)!.x - 25
    }, [activeIndex, layout])

    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [{translateX: withTiming(xOffset.value, {duration: 250})}],
        }
    })

    return (
        <View style={[styles.tabBar, {paddingBottom: bottom}]}>
            <AnimatedSvg
                width={100}
                height={60}
                viewBox="13 -15 60 70"
                preserveAspectRatio="xMidYMid meet"
                style={[styles.activeBackground, animatedStyles]}
            >
                <Path
                    fill="#3C1874"
                    d="M20 20
                A 20 20, 0, 1, 0, 90 20
                A 20 20, 0, 1, 0, 20 20"
                />
            </AnimatedSvg>

            <View style={styles.tabBarContainer}>
                {routes.map((route, index) => {
                    const active = index === activeIndex
                    const {options} = descriptors[route.key]

                    return (
                        <TabBarComponent
                            key={route.key}
                            active={active}
                            options={options}
                            onLayout={(e) => handleLayout(e, index)}
                            onPress={() => navigation.navigate(route.name)}
                        />
                    )
                })}
            </View>
        </View>
    )
}

type TabBarComponentProps = {
    active?: boolean
    options: BottomTabNavigationOptions
    onLayout: (e: LayoutChangeEvent) => void
    onPress: () => void
}

const TabBarComponent = ({ active, options, onLayout, onPress }: TabBarComponentProps) => {
    const ref = useRef(null)

    useEffect(() => {
        if (active && ref?.current) {
            // @ts-ignore
            ref.current.play()
        }
    }, [active])

    const animatedComponentCircleStyles = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: withTiming(active ? 1 : 0, { duration: 250 })
                }
            ]
        }
    })

    const animatedIconContainerStyles = useAnimatedStyle(() => {
        return {
            opacity: withTiming(active ? 1 : 0.5, { duration: 250 })
        }
    })

    return (
        <Pressable onPress={onPress} onLayout={onLayout} style={styles.component}>
            <Animated.View
                style={[styles.componentCircle, animatedComponentCircleStyles]}
            />
            <Animated.View style={[styles.iconContainer, animatedIconContainerStyles]}>
                {options.tabBarIcon ? options.tabBarIcon({ ref }) : <Text>?</Text>}
            </Animated.View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderColor: "#b4b4b4",
    },
    activeBackground: {
        position: 'absolute',
    },
    tabBarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    component: {
        height: 60,
        width: 50,
        paddingVertical: 5,
    },
    componentCircle: {
        flex: 1,
        borderRadius: 30,
        backgroundColor: 'white',
    },
    iconContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        height: 30,
        width: 44,
    },
    iconBig: {
        height: 55,
        width: 50,
    }
})

export default Tabs;
