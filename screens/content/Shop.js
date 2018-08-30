import React, {Component} from 'react';
import {StyleSheet,View,Text,TextInput,Image} from 'react-native';
import { setFont, setSize } from "../../utils/resolution";

export default class Shop extends Component {
	constructor(props) {
  	super(props);
  	
	}

  componentWillMount() {
  	
  }

	render() {
    console.log(this.props.detailCreator)
    console.log(this.props.title)
    return (
    	<View style={styles.container}>
        <View 
          style={{
            height: setSize(140)
          }}
        >
        	<View style={styles.shop_title}>

            <View style={styles.shop_desc}>
              <Image 
                style={styles.shop_img} 
                source={require('../../assets/images/pages/shop_icon.png')} />
              <Text style={styles.shop_name}>国贸nike三期</Text>
            </View>

            <View styles={styles.goshop}>
              <Text style={styles.goshop_text}>进店看看</Text>
            </View>

          </View>
        </View>
    	</View>
    );
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  shop_title:{
    flex:1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: setSize(30),
    marginRight: setSize(30),
    borderBottomWidth: 1,
    borderColor: '#e5e5e5',

  },
  shop_desc:{
    flexDirection: "row",
    alignItems: "center",
  },
  shop_img:{
    width: setSize(33),
    height: setSize(33),
  },
  shop_name:{
    fontSize:setFont(32),
    color: '#333',
    marginLeft: setSize(18)
  },
  goshop:{
    
  },
  goshop_text:{
    textAlign:'center',
    fontSize:setFont(24),
    color:'#fff',
    alignItems: "center",
    backgroundColor:'rgba(0,187,180,1)',
    textAlignVertical: 'center',
    paddingTop: setSize(15),
    paddingBottom: setSize(15),
    paddingLeft: setSize(20),
    paddingRight: setSize(20),
    borderWidth: 1,
    overflow: 'hidden',
    borderRadius: setSize(4),
    borderColor:'rgba(0,187,180,1)'
  }
})






