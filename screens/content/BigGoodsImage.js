import React, {Component} from 'react';
import {StyleSheet,View,Text,TextInput,Image,Modal, Alert,TouchableOpacity} from 'react-native';
import { setFont, setSize } from "../../utils/resolution";
const imgLocation = require('../../assets/images/pages/img-location.png');
const share_close = require('../../assets/images/pages/share_close.png')

export default class BigGoodsImage extends Component {
	constructor(props) {
  	super(props);
  	this.state = {
      goodsVisibleData: false,
    }
	}

  componentWillMount(nextProps,nextState) {
    if(this.state.goodsVisibleData == false){
      this.setState({
        goodsVisibleData: this.props.goodVisible
      })
    }
  }
  
  componentWillReceiveProps(nextProps,nextState) {
    if(this.state.goodsVisibleData == false){
      this.setState({
        goodsVisibleData: this.props.goodVisible
      })
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
  _isShowTagPrice(sale,tag){
    if(sale != tag){
      return(
        <Text style={styles.tag_price}>¥{tag}</Text>
      )
    }
  }

  showSelectModule(){
    Alert.alert('购买弹窗')
  }

  closeBigGoods(){
    console.log('-------------')
    this.setState({
      goodsVisibleData: false
    })
  }

	render() {
    let goodsData = this.props.goodsData;
    return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={this.state.goodsVisibleData}
    >
      <View style={styles.big_goods}>
        <View style={styles.good_images}>
          <Image 
            style={styles.good_img} 
            source={goodsData.img_big_optimize_path?{uri:goodsData.img_big_optimize_path}:imgLocation} 
          />
        </View>
        <View style={styles.good_price}>
          <View style={styles.price}>
            <Text style={styles.sale_price}>¥{goodsData.sale_price}</Text>
            {this._isShowTagPrice(goodsData.sale_price,goodsData.tag_price)}
          </View>
          <Text style={styles.price_name}>{goodsData.tag_name}</Text>
        </View>
        <View style={styles.color_buy}>
          <View style={styles.color}>
            <Text style={styles.color_text}>颜色</Text>
            <Text style={styles.color_get_text}>{goodsData.color}</Text>
          </View>
          {this._buttonBuy(goodsData.commodity_stock)}
        </View>
        <TouchableOpacity onPress={()=>this.closeBigGoods()}>
          <Image 
            style={styles.close} 
            source= {share_close}
          />
        </TouchableOpacity>
      </View>
    </Modal>
    );
	}
}

const styles = StyleSheet.create({
  big_goods:{
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,.5)',
    alignItems: 'center',
    justifyContent: "center",
  },
  good_images:{
    width: setSize(690),
    height: setSize(690),
    backgroundColor: '#fff',
  },
  good_img:{
    width: setSize(690),
    height: setSize(690)
  },
  good_price:{
    backgroundColor: '#fff',
    height: setSize(98),
    width:setSize(690),
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: '#e5e5e5'
  },
  price:{
    flexDirection: "row",
    alignItems: 'center',
    marginLeft: setSize(30),
  },
  sale_price:{
    fontSize:setFont(40),
    color: '#333',
  },
  tag_price:{
    fontSize:setFont(24),
    color: '#ccc',
    marginLeft: setSize(20),
  },
  price_name:{
    fontSize:setFont(28),
    color: '#000',
    marginRight: setSize(30),

  },

  color_buy:{
    backgroundColor: '#fff',
    height: setSize(98),
    width:setSize(690),
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "space-between",
  },
  color:{
    flexDirection: "row",
    alignItems: 'center',
    marginLeft: setSize(30),
  },
  color_text:{
    fontSize:setFont(22),
    color: '#999',
  },
  color_get_text:{
    fontSize:setFont(22),
    color: '#333',
    marginLeft: setSize(14),
  },
  buy_text_no:{
    width:setSize(144),
    height:setSize(50),
    borderRadius:setSize(4),
    borderWidth:1,
    borderColor: '#ddd',
    textAlign:'center',
    color: '#999',
    lineHeight:setSize(45),
    marginRight:setSize(30)
  },
  buy_text:{
    width:setSize(144),
    height:setSize(50),
    borderRadius:setSize(4),
    borderWidth:1,
    borderColor: '#00BBB4',
    textAlign:'center',
    color: '#00BBB4',
    lineHeight:setSize(45),
    marginRight:setSize(30)
  },
  close:{
    width:setSize(62),
    height:setSize(62),
    marginTop: setSize(30)
  }
})






