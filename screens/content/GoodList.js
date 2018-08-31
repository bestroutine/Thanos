import React, {Component} from 'react';
import {StyleSheet,View,Text,TextInput,Image} from 'react-native';
import { setFont, setSize } from "../../utils/resolution";

export default class GoodList extends Component {
	constructor(props) {
  	super(props);
	}

	render() {
    const goodList= this.props.goodList
    let tagData = []
    let goodData = []
    goodList.map((item)=>{
      // console.log(item)
      if(item.tag){
        tagData.push(...item.tag)
      }
    })
    tagData.map((tip)=>{
      if(tip.good){
        goodData.push(tip.good)
      }
    })
    // console.log(goodData)
    let list = () => {
      let resarr = []
      {goodData.map((item,index)=>{
        resarr.push(
          <View style={styles.good} key={item.tag_id}>
            <View styles={styles.image}>
              <Image 
              style={styles.good_img} 
              source={{uri:item.img_optimize_path}} />
            </View>
            <View style={styles.good_msg}>
              <Text 
                numberOfLines={2}
                style={styles.good_msg_tit}
              >
                {item.tag_name}
              </Text>

              <View style={styles.buy}>
                <Text style={styles.buy_price}>¥{parseInt(item.sale_price)}</Text>
                <View style={styles.buy_button}>
                  <Text style={styles.buy_text}>购买</Text>
                </View>
              </View>
            </View>
          </View>
        )
      })}
      return resarr
    }
    return(
      list()
    );
	}
}

const styles = StyleSheet.create({
  good:{
    marginBottom: setSize(40),
    marginTop: setSize(40),
    flexDirection: "row",
  },
  good_image:{
    width: setSize(160),
    height: setSize(160),
    borderRadius: setSize(8),
    
    backgroundColor:'#f8f8f8'
  },
  good_img:{
    width: setSize(160),
    height: setSize(160),
    marginRight:setSize(20),
  },
  good_msg:{
    flex:1,
    justifyContent: "space-between",
  },
  good_msg_tit:{
    fontSize: setFont(28),
    color: '#333'
  },
  buy:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'flex-end',
  },
  buy_price:{
    fontSize:setFont(32),
    color: '#333',
    fontWeight: '500'
  },
  buy_button:{
    alignItems: 'center',
  },
  buy_text:{
    width:setSize(144),
    height:setSize(50),
    borderRadius:setSize(4),
    borderWidth:1,
    borderColor: '#ddd',
    textAlign:'center',
    color: '#999',
    lineHeight:setSize(45)
  }
})






