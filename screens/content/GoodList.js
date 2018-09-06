import React, {Component} from 'react';
import {StyleSheet,View,Text,TextInput,Image, Alert, TouchableOpacity} from 'react-native';
import { setFont, setSize } from "../../utils/resolution";
import BigGoodsImage from './BigGoodsImage';
const imgLocation = require('../../assets/images/pages/img-location.png');


export default class GoodList extends Component {
	constructor(props) {
  	super(props);
    this.state = {
      bigGoodsShow: false,
      bigGoodsShowData: {},
    }
	}

  _stockList(flag){
    if(flag == 0){
      return(
        <View style={styles.good_null}>
          <Text style={styles.null_text}>已售磬</Text>
        </View>
      )
    }
  }

  _buttonBuy(flag){
    if(flag == 0){
      return(
        <Text style={styles.buy_text_no}>购买</Text>
      )
    }else{
      return(
        <Text style={styles.buy_text} onPress={()=>this.showSelectModule()}>购买</Text>
      )
    }
  }

  showSelectModule(){
    Alert.alert('购买弹窗')
  }

  showBigGoods(item){
    this.setState({
      bigGoodsShow: true,
      bigGoodsShowData: item,
    })
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
              <TouchableOpacity  onPress={()=>this.showBigGoods(item)}>
                <Image 
                style={styles.good_img} 
                source={item.img_optimize_path?{uri:item.img_optimize_path}:imgLocation} />
                {this._stockList(item.commodity_stock)}
              </TouchableOpacity>
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
                  {this._buttonBuy(item.commodity_stock)}
                </View>
              </View>
            </View>
          </View>
        )
      })}
      if(goodData.length>0){
        resarr.push(
          <BigGoodsImage key={goodData.length} goodsData={this.state.bigGoodsShowData} goodVisible={this.state.bigGoodsShow}/>
        )
      }
      return resarr
    }
    return(
      list()
    );
	}
}

const styles = StyleSheet.create({
  good:{
    marginTop: setSize(40),
    flexDirection: "row",
  },
  image:{
    position: 'relative',
  },
  good_img:{
    width: setSize(160),
    height: setSize(160),
    marginRight:setSize(20),
  },
  good_null:{
    position:'absolute',
    left: 0,
    top: 0,
    width: setSize(160),
    height: setSize(160),
    backgroundColor: 'rgba(255,255,255,.6)'
  },
  null_text:{
    position: 'absolute',
    left: setSize(29),
    top: setSize(57),
    color: '#333',
    fontSize:setFont(28),
    padding: setSize(9),
    borderWidth:1,
    borderColor: '#333',
    borderRadius: setSize(4)
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
  buy_text_no:{
    width:setSize(144),
    height:setSize(50),
    borderRadius:setSize(4),
    borderWidth:1,
    borderColor: '#ddd',
    textAlign:'center',
    color: '#999',
    lineHeight:setSize(45)
  },
  buy_text:{
    width:setSize(144),
    height:setSize(50),
    borderRadius:setSize(4),
    borderWidth:1,
    borderColor: '#00BBB4',
    textAlign:'center',
    color: '#00BBB4',
    lineHeight:setSize(45)
  }
})






