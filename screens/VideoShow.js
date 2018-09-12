import React from "react";
import { ScrollView, StyleSheet, Image, View, Text, SafeAreaView } from "react-native";
import { setFont, setSize } from "../utils/resolution";
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
      videoData: {}
    };
  }
  componentWillMount() {
    console.log(11111);
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
        console.log(222222);
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
    console.log(component)
    const playbackObject = component;
  }

  render() {
    console.log(33333)
    return (
      <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          alignItems: "center",
        }}
        style={styles.container}
      >
        <Video
          source={{
            uri:this.state.videoData.video_url
          }}
          ref={this._handleVideoRef}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          useNativeControls={true}
          resizeMode="contain"
          shouldPlay={true}
          isLooping={true}
          style={styles.video}
        />
        <View>
          <Text style={{ color: "#999999", fontSize: 14 }}>
            {JSON.stringify(this.props.navigation.state.params)}
          </Text>
        </View>
      </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000"
  },
  video: {
    height: "100%",
    width: '100%',
  }
});
