import React, {Component} from 'react';
import {StyleSheet,View,Text,TextInput,Image} from 'react-native';
import Search from './Search';

export default class MyLove extends Component {
	constructor(props) {
    	super(props);
    	this.state = { text: '' };
  	}
  	render() {
	    return (
	    	
	      	<View style={{ flex: 1, backgroundColor: '#fff' }}>
	      		<Search />
	        	<Text>love</Text>
	      	</View>
	    );
  	}
}