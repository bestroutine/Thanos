import React from "react";
import { ScrollView, StyleSheet, Image, View, Text, SafeAreaView, StatusBar } from "react-native";
import { setFont, setSize } from "../utils/resolution";
import {
  TOKEN,
  BRIDGE,
} from '../utils/constant';
import TabList from './found/TabLists'
import shop_header from '../assets/images/pages/shop_header.jpg'
import address from '../assets/images/pages/address.png'
import phone from '../assets/images/pages/phone.png'
import wxchat from '../assets/images/pages/wxchat.png'

export default class ShopLists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shopId: this.props.navigation.getParam('shop_Id'),
      showShop:{}
    };
  }
  componentWillMount() {
    const { navigation } = this.props;
    // const c_title = navigation.getParam('cTitle');
    // this.props.navigation.setParams({'headerTitle': c_title})
    this.request();
  }
  request = () => {
    console.log(this.state.shopId)
    const url = `${BRIDGE}/shop/getShopContentList?start=0&pageSize=1&listType=1&shopId=${this.state.shopId}`;
    fetch(url, {
      method: "GET",
      headers: {
        Token: TOKEN,
      }
    })
      .then(res => {
        // console.log("started fetch");
        return res.json();
      })
      .then(res => {
        console.log(res.data)
        this.setState({
          showShop: res.data.showShop,
        })
      })
      .catch(err => {
        console.log("==> fetch error", err);
        this.setState({
          error: err,
          loading: false,
          refreshing: false
        });
      });
  }

  render() {
    return (
      <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
        <StatusBar barStyle='light-content' />
        <ScrollView>
          <View style={styles.header}>
            <Image
              style={styles.header_img}
              source={shop_header}
            />
            <Text style={styles.shop_name}>{this.state.showShop.shop_name}</Text>
            <View style={styles.attention}>
              <Text style={styles.attention_text}>关注</Text>
            </View>
            <View style={styles.title}>
              <View style={styles.info}>
                <Image
                  style={{width:setSize(38),height:setSize(38)}}
                  source={address}
                />
                <Text numberOfLines={1} style={styles.info_text}>{this.state.showShop.shop_address}</Text>
              </View>
              <View style={styles.info}>
                <Image
                  style={{width:setSize(38),height:setSize(38)}}
                  source={phone}
                />
                <Text style={styles.info_text}>{this.state.showShop.shop_tel}</Text>
              </View>
              <View style={styles.info}>
                <Image
                  style={{width:setSize(38),height:setSize(38)}}
                  source={wxchat}
                />
                <Text style={styles.info_text}>{this.state.showShop.wechat_num}1</Text>
              </View>
            </View>
          </View>
          <TabList 
            ajax_url='/shop/getShopContentList'
            ajax_prames={'&shopId='+this.state.shopId}
            navigation={this.props.navigation}
            whichEnd='pageSize'
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    height: setSize(440),
    backgroundColor: '#fff',
    position: 'relative',
    alignItems: "center",
  },
  header_img:{
    width: '100%',
    height: setSize(310)
  },
  title:{
    width: setSize(690),
    height: setSize(260),
    borderRadius: setSize(8),
    backgroundColor: '#fff',
    position:'absolute',
    bottom: 0,
    shadowColor:'rgba(0,0,0,1)',
    shadowOffset:{height:10,width:10},
    shadowRadius:setSize(8),
    alignItems: "flex-start",
    justifyContent: "space-between",
    borderWidth:1,
    borderColor: 'rgba(0,0,0,.05)',
    paddingTop: setSize(44),
    paddingBottom: setSize(44),
  },
  shop_name:{
    position: 'absolute',
    top: setSize(30),
    fontSize: setFont(48),
    color: '#fff'
  },
  attention:{
    width:setSize(140),
    height: setSize(50),
    borderRadius: setSize(4),
    backgroundColor: '#00BBB4',
    position:'absolute',
    top: setSize(108)
  },
  attention_text: {
    fontSize: setFont(24),
    color: '#fff',
    textAlign:'center',
    lineHeight: setSize(50),
  },
  info:{
    flexDirection: "row",
    marginLeft: setSize(54)
  },
  info_text:{
    marginLeft: setSize(27),
    fontSize: setFont(28),
    color: '#333',
    width: setSize(570)
  }
});




