import React from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Dimensions,
  StyleSheet,
  Button,
  ScrollView,
  PixelRatio,
  ImageBackground
} from "react-native";

import { setFont, setSize } from "../../utils/resolution";

export default class EmptyComponent extends React.Component {
  render() {
    return(
      <View
        style={{
          flex: 1,
          height: this.props.contentListHeight,
          alignItems: "center",
          backgroundColor: "#FFF",
          paddingTop: setSize(318 - 88)
        }}
      >
        <Image
          style={{
            width: setSize(230),
            height: setSize(230)
          }}
          source={require("../../assets/images/pages/noFoundTwo.png")}
        />
        <Text
          style={{
            color: "#999999",
            fontSize: 14
          }}
        >
          一大波精彩内容正在赶来 敬请期待{this.props.contentListHeight}
        </Text>
      </View>
    )
  }
}