import React from 'react';
import { Text, View, StyleSheet,Image,Alert } from 'react-native';
import { createBottomTabNavigator,createStackNavigator } from 'react-navigation';
import FoundScreen from "../screens/FoundScreen";
import CartScreen from "../screens/CartScreen";
import MyScreen from "../screens/MyScreen";
import TabBarIcon from "../components/TabBarIcon";
import VideoShowScreen from "../screens/VideoShow";
import MyLove from '../screens/mine/MyLove';
import MyCreate from '../screens/mine/MyCreate';
import NoticeScreen from '../screens/mine/Notice';
import ContentScreen from "../screens/Content";
import UserListsScreen from "../screens/UserLists";
import ShopListsScreen from "../screens/ShopLists";


const tab = createBottomTabNavigator(
    {
        'found': FoundScreen,
        'cart':CartScreen,
        'my': MyScreen,
    },
    {
        tabBarPosition: 'bottom',
        lazy: true,
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                return <TabBarIcon focused={focused} name={routeName} />
            },
            tabBarVisible: true,
        }),
        tabBarOptions: {
            activeTintColor: '#333',
            inactiveTintColor: 'gray',
            showIcon: true,
            labelStyle:{
                fontSize: 12,
            },
            tabStyle:{
                backgroundColor: '#fff',
            },
            activeBackgroundColor: '#fff',
            inactiveBackgroundColor: '#fff',
            showLabel: true,
        },
    }
);

export const AppNavigator = createStackNavigator(
    {
        Tab: {screen: tab},
        Create: {
            screen: MyCreate,
            navigationOptions: ({ navigation }) => ({
                headerTitle:'我的创作',
            }),
        },
        Love: {
            screen: MyLove,
            navigationOptions: ({ navigation }) => ({
                headerTitle:'我的喜欢',
            }),
        },
        Notice: {
            screen: NoticeScreen,
            navigationOptions: ({ navigation }) => ({
                headerTitle:'售后须知',
                headerBackTitle: null
            }),
        },
        VideoShow: {
            screen: VideoShowScreen,
            navigationOptions: ({ navigation }) => {
            let headerTitle = navigation.getParam('headerTitle', "")
            if (navigation.state.routes) {
                let active = navigation.state.routes[navigation.state.index]
                if (active.params) {
                    headerTitle = active.params.headerTitle
                }
                console.log('hahah', active.params, 'active')
            }
            return {
                headerTitle,
                headerStyle: {
                    backgroundColor: "#FFF",
                    borderBottomWidth: 0
                },
                headerBackTitle: null,
                headerBackTitleStyle: {
                    color: "#666666"
                },
                tabBarVisible: false

            }},
        },
        Content: {
            screen: ContentScreen,
            navigationOptions: ({ navigation }) => {
            let headerTitle = navigation.getParam('headerTitle', "")
            if (navigation.state.routes) {
                let active = navigation.state.routes[navigation.state.index]
                if (active.params) {
                    headerTitle = active.params.headerTitle
                }
                console.log('hahah', active.params, 'active')
            }
            return {
                headerTitle,
                headerStyle: {
                    backgroundColor: "#FFF",
                    borderBottomWidth: 0
                },
                headerBackTitle: null,
                headerBackTitleStyle: {
                    color: "#666666"
                },
                tabBarVisible: false

            }},
        },
        UserLists: {
            screen: UserListsScreen,
            navigationOptions: ({ navigation }) => ({
                headerTitle:'',
                headerBackTitle: null,
                headerStyle: {
                    backgroundColor: "#000",
                    borderBottomWidth: 0
                }
            }),
        },
        ShopLists: {
            screen: ShopListsScreen,
            navigationOptions: ({ navigation }) => ({
                headerTitle:'',
                headerBackTitle: null,
                headerStyle: {
                    backgroundColor: "#000",
                    borderBottomWidth: 0
                }
            })
        },
    },
    {
    initialRouteName: 'Tab',
    navigationOptions: ({ navigation }) => {
        let headerTitle = navigation.getParam('headerTitle', "")
        if (navigation.state.routes) {
            let active = navigation.state.routes[navigation.state.index]
            // headerTitle = active.params.headerTitle
            if (active.params) {
                headerTitle = active.params.headerTitle
            }
            // console.log('hahah', active.params, 'active')
        }
        // console.log(navigation.state)
        return {
            headerTitle,
            headerTintColor: '#000',
            headerBackTitle: null,
            headerStyle: {
                backgroundColor: '#fff',
                borderBottomWidth: 0,
            },
            headerBackImage: (<Image source={require("../assets/images/pages/backArrow.png")}/>)
        }},
    }
)
