import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";

import FoundScreen from "../screens/FoundScreen";
import CartScreen from "../screens/CartScreen";
import MyScreen from "../screens/MyScreen";
import VideoShowScreen from "../screens/VideoShow";

const FoundStack = createStackNavigator({
  Home: {
    screen: FoundScreen
  },
  VideoShow: {
    screen: VideoShowScreen
  }
});

FoundStack.navigationOptions = ({ navigation }) => {
  // get active route from navigation
  // const activeRoute = navigation.state.routes[navigation.state.index];
  // let tabBarVisible = !["VideoShow"].includes(activeRoute.routeName)
  let tabBarVisible = navigation.getParam('tabBarVisible') === false ? false : true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
    tabBarLabel: "发现",
    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="found" />
  };
};

const CartStack = createStackNavigator({
  Home: CartScreen
});

CartStack.navigationOptions = {
  tabBarLabel: "购物车",
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="cart" />
};

const MyStack = createStackNavigator({
  Home: MyScreen
});

MyStack.navigationOptions = {
  tabBarLabel: "我的",
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="my" />
};

export default createBottomTabNavigator(
  {
    FoundStack,
    CartStack,
    MyStack
  },
  {
    tabBarOptions: {
      activeTintColor: "#333",
      inactiveTintColor: "#333",
      labelStyle: {
        fontSize: 11
      },
      style: {
        backgroundColor: "white",
        height: 49
      }
    }
  }
);
