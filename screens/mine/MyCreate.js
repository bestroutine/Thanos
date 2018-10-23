import React, {Component} from 'react'
import {StyleSheet,View,Text} from 'react-native'
import Search from './Search';
import TabList from '../UserShopList/TabLists'

export default class MyCreate extends Component {
	constructor(props) {
    	super(props);
  	}
  	render() {
      	return (
	    	
	      	<View style={{ flex: 1, backgroundColor: '#fff' }}>
	      		<Search />
	        	<TabList 
			        ajax_url='/showUserInfo/myContentList' 
			        ajax_params='' 
			        navigation={this.props.navigation} 
			        whichEnd='end'
			        pageType = '_create'
			    />
	      	</View>
	    );
  	}
}