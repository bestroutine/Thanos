import React from "react";
import { ScrollView, StyleSheet, Image, View, Text, SafeAreaView } from "react-native";
import { setFont, setSize, screenW, screenH} from "../utils/resolution";
import { Video } from "expo";
import {
  TOKEN,
  BRIDGE,
} from '../utils/constant';

export default class VideoShowScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cId: this.props.navigation.getParam('cId'),
      videoData: {},
      videoH: screenH,
      videoW: screenW
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
          videoData: res.data
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
        <View>
          <Text style={{ color: "#999999", fontSize: 14 }}>

          </Text>
        </View>
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
