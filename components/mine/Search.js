import React, {Component} from 'react';
import {StyleSheet,View,Text,TextInput,Image} from 'react-native';
import {setSize} from '../../utils/resolution';
const SearchImg = require('../../assets/images/pages/search.png');

export default class Search extends Component {
	constructor(props) {
    	super(props);
    	this.state = { text: '' };
  	}
  	render() {
	    return (
      		<View style={{position: 'relative'}}>
		      	<TextInput style={styles.input} 
		    	onChangeText={(text) => this.setState({text})}
		    	placeholder = '请输入店铺关键词'
		    	placeholderTextColor = '#ccc'
	        	value={this.state.text}
	      		/>
	      		<Image source={SearchImg} style={styles.search} />
      		</View>
	    );
  	}
}

const styles = StyleSheet.create({
	input:{
		height: 44,
		borderColor: 'rgba(229,229,229,1)',
		borderWidth: 1,
		borderRadius:4,
		backgroundColor:'rgba(248,248,248,1)',
		marginLeft: 15,
		marginRight: 15,
		paddingLeft: 40,
	},
	search: {
		position: 'absolute',
		top: setSize(15),
		left: setSize(50),
		width: setSize(50),
		height: setSize(50),
	}
})