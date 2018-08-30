import React, {Component} from 'react';
import {StyleSheet,View,Text,TextInput,Image} from 'react-native';
import { setFont, setSize } from "../utils/resolution";
import {
  TOKEN,
  BRIDGE,
} from '../utils/constant';
import SwiperComponent from './content/Swiper';
import AuthorComponent from './content/Author';
import ShopComponent from './content/Shop';

export default class Content extends Component {
	constructor(props) {
  	super(props);
  	this.state = {
      cId: this.props.navigation.getParam('cId'), //内容id
      detailPic: [],  //图片内容的数据
      contentDetail: {},
      creatorDetail: {},
    };
	}

  componentWillMount() {
  	// console.log(this.state.cId);
  	const { navigation } = this.props;
    const c_title = navigation.getParam('cTitle');
    this.props.navigation.setParams({'headerTitle': c_title})
    this.request();
  }

  request = () => {
    const url = `${BRIDGE}/content/show?cid=${
      this.state.cId
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
        // console.log('111111111')
        console.log(res.data)
        this.setState({
          detailPic: res.data.pics,
          contentDetail: res.data,
          creatorDetail: res.data.creator
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
    	<View style={{ flex: 1, backgroundColor: '#fff' }}>
        <SwiperComponent detailPic={this.state.detailPic} />
        <AuthorComponent detailCreator={this.state.creatorDetail} title={this.state.contentDetail.title}/>
        <ShopComponent style={{height: 200, backgroundColor: 'red'}}/>
    	</View>
    );
	}
}








