import React from "react";
import {
  Text,
  View,
} from "react-native";

import TabList from './UserShopList/TabLists'

export default class FoundScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "发现",
    headerStyle: {
      backgroundColor: "#FFF",
      borderBottomWidth: 0
    },
    tabBarVisible: navigation.getParam('tabBarVisible') === false ? false : true
  });

  componentWillMount() {
    this.props.navigation.setParams({ tabBarVisible: true,'headerTitle': '发现'});
  }
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TabList 
        ajax_url='/content/indexNew' 
        ajax_params='' 
        navigation={this.props.navigation} 
        whichEnd='end'
        pageType = '_other'
      />
    );
  }
}

