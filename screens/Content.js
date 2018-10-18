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
import FootAccount from './content/FootAccount';

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
        <FootAccount />
      </SafeAreaView>
    );
	}
}








