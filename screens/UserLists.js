import React from "react";
import { ScrollView, StyleSheet, Image, View, Text, SafeAreaView,StatusBar } from "react-native";
import { setFont, setSize } from "../utils/resolution";
import TabList from './UserShopList/TabLists'
import {
  TOKEN,
  BRIDGE,
} from '../utils/constant';
import user_header from '../assets/images/pages/user_header.png'

export default class UserLists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uId: this.props.navigation.getParam('uId'),
    };
  }
  componentWillMount() {

  }

  render() {
    return (
      <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
        <StatusBar barStyle='light-content' />
          <TabList 
            ajax_url='/showUserInfo/authorContentList'
            ajax_prames={'&userId='+this.props.navigation.getParam('uId')}
            navigation={this.props.navigation}
            whichEnd='pageSize'
            pageType = '_user'
          />
      </SafeAreaView>
    );
  }
}








