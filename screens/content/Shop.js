import React, {Component} from 'react';
import {StyleSheet,View,Text,TextInput,Image, TouchableOpacity} from 'react-native';
import { setFont, setSize } from "../../utils/resolution";
import GoodList from './GoodList'

export default class Shop extends Component {
	constructor(props) {
  	super(props);
	}

  goToShopList(shop_id){
    this.props.navigation.push('ShopLists',{
      shop_Id: shop_id
    })
  }

	render() {
    // console.log(this.props.detailCreator)
    // console.log(this.props.detailPic)
    // console.log(this.props.detailPromotion)
    let creatorData = this.props.detailCreator
    let picData = this.props.detailPic
    let promotionData = this.props.detailPromotion
    
    return (
    	<View style={styles.container}>
        <View 
          style={{
            height: setSize(140),
          }}
        >
        	<TouchableOpacity style={styles.shop_title} onPress={()=>this.goToShopList(creatorData.shopId)}>
            <View style={styles.shop_desc}>
              <Image 
                style={styles.shop_img} 
                source={require('../../assets/images/pages/shop_icon.png')} />
              <Text style={styles.shop_name}>{creatorData.shopName}</Text>
            </View>

            <View>
              <Text style={styles.goshop_text}>进店看看</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginLeft: setSize(30),
            marginRight: setSize(30),
            marginBottom: setSize(30)
          }}>
          <View 
            style={[
              styles.activity,
              {
                display: promotionData.length>0?'flex': 'none'
              }
            ]}
          >
            <Text 
              style={[
                styles.act_name,
                {
                  color:'#00BBB4',
                  borderColor:'#00BBB4'
                }
              ]}>
              {promotionData.length > 0 ? promotionData[0].promotion_name: ''}
            </Text>
            <Text style={[styles.act_time,{color:'#999'}]}>
              {promotionData.length > 0 ?promotionData[0].now_time: ''}
            </Text>
          </View>
          <View>
            <GoodList goodList={picData} />
          </View>
        </View>
    	</View>
    );
	}
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
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
  goshop_text:{
    textAlign:'center',
    fontSize:setFont(24),
    color:'#fff',
    alignItems: "center",
    backgroundColor:'rgba(0,187,180,1)',
    textAlignVertical: 'center',
    paddingTop: setSize(12),
    paddingBottom: setSize(12),
    paddingLeft: setSize(20),
    paddingRight: setSize(20),
    borderWidth: 1,
    overflow: 'hidden',
    borderRadius: setSize(4),
    borderColor:'rgba(0,187,180,1)'
  },
  activity:{
    flexDirection: "row",
    alignItems: "center",
    marginTop: setSize(32)
  },
  act_name:{
    borderRadius:setSize(2),
    borderWidth:1,
    fontSize:setFont(20),
    marginRight: setSize(20),
    padding:setSize(2)
  },
  act_time:{
    fontSize:setFont(24),
  }
})






