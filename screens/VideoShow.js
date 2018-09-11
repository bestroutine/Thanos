import React from "react";
import { ScrollView, StyleSheet, Image, View, Text } from "react-native";
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
    console.log(this.state.cId);
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

  render() {
    return (
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          alignItems: "center"
        }}
        style={styles.container}
      >
        <View>
          <Video
            source={{
              uri:this.state.videoData.video_url
            }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay
            isLooping
            style={styles.video}
          />
          <Text style={{ color: "#999999", fontSize: 14 }}>
            {JSON.stringify(this.props.navigation.state.params)}
          </Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000"
  },
  video: {
    height: "100%"
  }
});
