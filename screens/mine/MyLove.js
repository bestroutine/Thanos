import React, {Component} from 'react';
import {StyleSheet,View,Text,TextInput,Image} from 'react-native';
import Search from './Search';
import TabList from '../UserShopList/TabLists'

export default class MyLove extends Component {
	constructor(props) {
    	super(props);
  	}
  	render() {
	    return (
	    	
	      	<View style={{ flex: 1, backgroundColor: '#fff' }}>
	      		<Search />
	        	<TabList 
			        ajax_url='/collect/collectContentList' 
			        ajax_params='' 
			        navigation={this.props.navigation} 
			        whichEnd='end'
			        pageType = '_love'
			    />
	      	</View>
	    );
  	}
}