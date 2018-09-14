import React from "react";
import { ScrollView, StyleSheet, Image, View, Text, SafeAreaView, StatusBar } from "react-native";
import { setFont, setSize } from "../utils/resolution";
import TabList from './UserShopList/TabLists'

export default class ShopLists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shopId: this.props.navigation.getParam('shop_Id'),
    };
  }
  componentWillMount() {
  }

  render() {
    return (
      <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
        <StatusBar barStyle='light-content' />
          <TabList 
            ajax_url='/shop/getShopContentList'
            ajax_prames={'&shopId='+this.state.shopId}
            navigation={this.props.navigation}
            whichEnd='pageSize'
            userOrShop = '_shop'
          />
      </SafeAreaView>
    );
  }
}





