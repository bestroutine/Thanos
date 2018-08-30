import React from "react";
import { ScrollView, StyleSheet, Image, View, Text } from "react-native";
import { setFont, setSize } from "../utils/resolution";
import { Video } from "expo";

export default class VideoShowScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cId: this.props.navigation.getParam('cId'),
    };
  }
  componentWillMount() {
    console.log(this.state.cId);
    const { navigation } = this.props;
    const c_title = navigation.getParam('cTitle');
    this.props.navigation.setParams({'headerTitle': c_title})
  }
  render() {
    const { navigation } = this.props;
    const contentId = navigation.getParam("id", "");
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
              uri:
                "https://wechat-xcx-1255389510.image.myqcloud.com/show/8e6d36e9e3f14fdea099d7c374e9f692.mp4"
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
