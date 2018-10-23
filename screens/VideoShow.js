import React from "react";
import { ScrollView, StyleSheet, Image, View, Text, SafeAreaView } from "react-native";
import { setFont, setSize, screenW, screenH} from "../utils/resolution";
import { Video } from "expo";
import {
  TOKEN,
  BRIDGE,
} from '../utils/constant';
import AuthorComponent from './content/Author';
import ShopComponent from './content/Shop';
import FootAccount from './content/FootAccount';
import ServiceNote from './content/ServiceNote';

export default class VideoShowScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cId: this.props.navigation.getParam('cId'),
      videoData: {},
      videoH: screenH,
      videoW: screenW,
      creatorDetail: {},
      detailPic: [],
      promotionDetail: [],
    };
  }
  componentWillMount() {
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
        // console.log("started fetch");
        return res.json();
      })
      .then(res => {
        console.log(res.data)
        this.setState({
          videoData: res.data,
          creatorDetail: res.data.creator,
          detailPic: res.data.pics,
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

  _handleVideoRef = component => {
    const playbackObject = component;

  }

  onLayout = (event)=>{
    // console.log(event.nativeEvent.layout)
    this.setState({
      videoH: event.nativeEvent.layout.height,
      videoW: event.nativeEvent.layout.width
    })
  }
  render() {
    return (
      <SafeAreaView style={{flex:1,backgroundColor:'#fff'}} onLayout = {(event)=>this.onLayout(event)}>
      <ScrollView
        style={styles.container}
      >
        <Video
          ref={this._handleVideoRef}
          source={{
            uri:this.state.videoData.video_url
          }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          useNativeControls={true}
          resizeMode="contain"
          shouldPlay={true}
          isLooping={true}
          style={{width:this.state.videoW,height:this.state.videoH}}
        />
        <AuthorComponent
          detailCreator={this.state.creatorDetail}
          title={this.state.videoData.title} 
          navigation={this.props.navigation}
        />
        <ServiceNote />
        <ShopComponent 
          detailCreator={this.state.creatorDetail}
          detailPic={this.state.detailPic} 
          detailPromotion={this.state.promotionDetail}
          navigation={this.props.navigation}
        />
        <FootAccount 
          navigation={this.props.navigation}
        />
        
      </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000"
  },
});
