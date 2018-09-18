import React, {Component} from 'react';
import {StyleSheet,View,Text,TextInput,Image,ScrollView,SafeAreaView,Alert,StatusBar} from 'react-native';
import { setFont, setSize } from "../utils/resolution";
import {
  TOKEN,
  BRIDGE,
} from '../utils/constant';
import SwiperComponent from './content/Swiper';
import AuthorComponent from './content/Author';
import ShopComponent from './content/Shop';
const bag = require('../assets/images/pages/bag.png');
const no_bag = require('../assets/images/pages/no_bag.png');

export default class Content extends Component {
	constructor(props) {
  	super(props);
  	this.state = {
      cId: '', //内容id
      detailPic: [],  //图片内容的数据
      contentDetail: {},
      creatorDetail: {},
      promotionDetail: [],
    };
    
	}

  componentWillMount() {
    this.request(this.props.navigation.getParam('cId'));
    let title = this.props.navigation.getParam('cTitle');
    this.props.navigation.setParams({'headerTitle': title})
  }

  goToBuy(){
    Alert.alert('未开启支付功能，请线下店铺购买！');
  }

  request = (c_id) => {
    const url = `${BRIDGE}/content/show?cid=${
      c_id
    }`;
    fetch(url, {
      method: "GET",
      headers: {
        Token: TOKEN,
      }
    })
      .then(res => {
        console.log("started fetch");
        return res.json();
      })
      .then(res => {
        console.log(res.data)
        this.setState({
          detailPic: res.data.pics,
          contentDetail: res.data,
          creatorDetail: res.data.creator,
          promotionDetail: res.data.promotions || [],
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
      <SafeAreaView style={{flex: 1}}>
        <StatusBar barStyle='dark-content' />
      	<ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
          <SwiperComponent detailPic={this.state.detailPic} />
          <AuthorComponent
            detailCreator={this.state.creatorDetail}
            title={this.state.contentDetail.title} 
            navigation={this.props.navigation}
          />
          <ShopComponent 
            detailCreator={this.state.creatorDetail}
            detailPic={this.state.detailPic} 
            detailPromotion={this.state.promotionDetail}
            navigation={this.props.navigation}
          />
      	</ScrollView>
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
      </SafeAreaView>
    );
	}
}








