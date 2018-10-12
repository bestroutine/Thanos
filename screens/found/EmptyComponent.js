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
  constructor(props) {
    super(props);
    this.state = {
      pageType: this.props.pageType,
      contentListHeight: this.props.contentListHeight
    };
  }
  pageShow(){
    let _sourceImg = ''
    let _text = ''
    if(this.state.pageType=='_love'){
      _sourceImg = require("../../assets/images/pages/noLike.png")
      _text = '暂无喜欢内容'
    } else if (this.state.pageType=='_create') {
      _sourceImg = require("../../assets/images/pages/search_empty.png")
      _text = '暂无创建内容'
    }else{
      _sourceImg = require("../../assets/images/pages/noFoundTwo.png")
      _text = '一大波精彩内容正在赶来 敬请期待'
    }
    return {
      _sourceImg: _sourceImg,
      _text: _text
    }
  }
  render() {
    let list = this.pageShow()
    return(
      <View
        style={{
          flex: 1,
          height: this.state.contentListHeight,
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
          source={list._sourceImg}
        />
        <Text
          style={{
            color: "#999999",
            fontSize: 14
          }}
        >
          {list._text}
        </Text>
      </View>
    )
  }
}