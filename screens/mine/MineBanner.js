import React, {Component} from 'react'
import {StyleSheet,View,Text,Image} from 'react-native'
import {setSize} from '../../utils/resolution';
const p_banner = require('../../assets/images/pages/p_banner.png');
const banner_header = require('../../assets/images/pages/headPortrait.png');

export default class MineBanner extends Component {
  	render() {
	    return (
            <View style={styles.banner}>
            	<Image source={p_banner} style={styles.bg_banner} />
            	<Text style={styles.banner_tit}>登录</Text>
            	<View  style={styles.ban_header}>
            		<Image source={banner_header} style={styles.header_img} />
            	</View>
            </View>
	    );
  	}
}

const styles = StyleSheet.create({
	banner:{
		position:'relative',
	},
	bg_banner: {
		height: setSize(300),
		width: 'auto',
	},
	banner_tit:{
		position: 'absolute',
		top: setSize(128),
		left: 15,
		color: '#fff',
		fontSize: setSize(48),
		zIndex: 1,
		backgroundColor: 'rgba(0,0,0,0)',
	},
	ban_header: {
		width: setSize(160),
		height: setSize(160),
		position: 'absolute',
		top: 35,
		right: 15,
		borderRadius: 80,
		backgroundColor: '#fff',
	},
	header_img: {
		width: setSize(160),
		height: setSize(160),
		borderRadius: 40,
	}
})
