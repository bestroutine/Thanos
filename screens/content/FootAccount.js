import React, {Component} from 'react';
import {StyleSheet,View,Text,TextInput,Image, TouchableOpacity} from 'react-native';
import { setFont, setSize } from "../../utils/resolution";
const bag = require('../../assets/images/pages/bag.png');
const no_bag = require('../../assets/images/pages/no_bag.png');

export default class Author extends Component {
	constructor(props) {
  	super(props);
	}

  componentWillMount() {
  	
  }

	render() {
    return (
    	<View style={{
        height: setSize(98),
        backgroundColor: '#f8f8f8',
        flexDirection: "row",
        justifyContent: "space-between",
      }}>
        <View style={{
          flexDirection: "row",
          alignItems: 'center',
          marginLeft: setSize(32)
        }}>
          <View style={{position:'relative'}}>
            <Image style={{
              width:setSize(52),
              height:setSize(52),
              marginRight:setSize(20)
              }} 
              source={bag}
            />
            <View style={{
              position: 'absolute',
              top:setSize(-8),
              right: setSize(4),
              minWidth:setSize(36),
              height:setSize(36),
              borderRadius: setSize(18),
              // overflow: 'hidden',
              backgroundColor: '#00BBB4',
              
            }}>
              <Text style={{
                color:'#fff',
                fontSize:setFont(22),
                textAlign:'center',
                lineHeight: setSize(36),
                paddingLeft: setSize(2),
                paddingRight: setSize(2)
              }}>28</Text>
            </View>
          </View>
          <Text style={{color:'#00BBB4',fontSize:setFont(40)}}>¥500</Text>
        </View>
        <View style={{
          width: setSize(200),
          height: '100%',
          backgroundColor: '#00BBB4'
        }}
         
        >
          <Text style={{
            color: '#fff',
            fontSize: setFont(28),
            textAlign: 'center',
            lineHeight: setSize(98)
          }}
          onPress={()=>this.goToBuy()}
          >
            去结算
          </Text>
        </View>
      </View>
    );
	}
}







