import React, {Component} from 'react';
import {StyleSheet,View,Text,Image, Alert, TouchableOpacity} from 'react-native';
import { setFont, setSize } from "../../utils/resolution";
import NoteModal from './NoteModal';

export default class ServiceNote extends Component {
	constructor(props) {
  		super(props);
  		this.state={
  			showNote: false
  		}
	}

  	componentWillMount() {
  	
  	}

  	showNoteModule() {
  		this.setState({
  			showNote: true
  		})
  	}

	render() {
    	return (
    		<View>
    			<TouchableOpacity style={{
    				flex:1,
    				flexDirection:'row',
    				justifyContent:'space-between',
    				alignItems: 'center',
    				padding:setSize(30),
            backgroundColor: '#fff'
    			}}
            activeOpacity={.98}
    				onPress={()=>this.showNoteModule()}
    			>
    				<Text style={{
    					color: '#333',
    					fontSize:setFont(28)
    				}}>服务说明</Text>
    				<Text style={{
    					color: '#999',
    					fontSize:setFont(24),
    					alignItems: 'center',
    				}}>
    					退换货承诺·运费说明·免责申请
    					<Image 
                style={{
                	width: setSize(12),
    							height: setSize(24),
    							marginLeft: setSize(6),
			          }}
			          source={require('../../assets/images/pages/right.png')}
			        />
    				</Text>
    			</TouchableOpacity>
    			<NoteModal NoteShow={this.state.showNote}/>
    			<Text style={{
    				height:setSize(20),
    				backgroundColor: '#f8f8f8'
    			}}></Text>
    		</View>
    	);
	}
}