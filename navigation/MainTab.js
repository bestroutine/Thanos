import React from 'react';
import { Text, View, StyleSheet,Image,Alert } from 'react-native';
import { createBottomTabNavigator,createStackNavigator } from 'react-navigation';
import FoundScreen from "../screens/FoundScreen";
import CartScreen from "../screens/CartScreen";
import MyScreen from "../screens/MyScreen";
import VideoShowScreen from "../screens/VideoShow";
import MyLove from '../components/mine/MyLove';
import MyCreate from '../components/mine/MyCreate';
import NoticeScreen from '../components/mine/Notice';
import TabBarIcon from "../components/TabBarIcon";


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
                headerBackTitle: null,
            }),
        },
        VideoShow: {
            screen: VideoShowScreen,
            navigationOptions: ({ navigation }) => ({
                headerTitle:'视频',
                headerBackTitle: null,
            }),
        }
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
            console.log('hahah', active.params, 'active')
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
        }},
    }
)
