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
  ImageBackground,
  Alert
} from "react-native";
import { setFont, setSize } from "../../utils/resolution";

export default class VideoList extends React.Component {
  _onPlay = (id, title) => {
    console.log(id);
    console.log(this.props)
    this.props.navigation.navigate("VideoShow", {
      title: title,
      id: id
    });
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: setSize(30)
        }}
      >
        <ImageBackground
          fadeDuration={0}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            width: setSize(690),
            height: setSize(388),
            borderRadius: 5
          }}
          source={{
            uri: this.props.item.picOptimizeBigUrl
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => this._onPlay(this.props.item.contentId, this.props.item.title)}
          >
            <Image
              style={{
                width: setSize(100),
                height: setSize(100)
              }}
              source={require("../../assets/images/pages/play.png")}
            />
          </TouchableWithoutFeedback>
        </ImageBackground>

        <Text
          numberOfLines={1}
          style={{
            alignSelf: "flex-start",
            textAlign: "left",
            fontSize: setFont(24),
            color: "#333",
            height: 25,
            lineHeight: 25,
            marginTop: 11
          }}
        >
          {this.props.item.title}
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            marginTop: 11
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center"
            }}
          >
            <Image
              style={{
                height: setSize(32),
                width: setSize(32),
                marginRight: setSize(10)
              }}
              source={require("../../assets/images/pages/shop_icon.png")}
            />
            <Text
              style={{
                fontSize: 11,
                height: 14,
                color: "#999"
              }}
            >
              {this.props.item.shopName}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 11,
              height: 14,
              color: "#999"
            }}
          >
            {new Date(this.props.item.ctime).toLocaleDateString().replace(/\//g, "-")}
          </Text>
        </View>
        <View
          style={{
            flex:1,
            flexDirection: "row",
            marginTop: setSize(22),
            width: "100%"
          }}
        >
          <View
            style={{
              justifyContent: "flex-start",
              alignItems: "center",
              borderWidth: this.props.item.promotion.length>0? 1: 0,
              borderColor: '#00BBB4',
              paddingTop:setSize(2),
              paddingBottom:setSize(2),
              paddingLeft:setSize(3),
              paddingRight:setSize(3),
            }}
          >
            <Text 
              style={{
                color:'#00BBB4',
                fontSize: setFont(22)
              }}
            >{this.props.item.promotion.length>0?this.props.item.promotion[0].promotion_name:''}</Text>
          </View>
          <View
            style={{
              flex:1,
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Image
              style={{
                height: 14,
                width: 14
              }}
              source={require("../../assets/images/pages/foundLikeNo.png")}
            />
            <Text
              style={{
                marginLeft: 5,
                color: "#999",
                fontSize: 12
              }}
            >
              {this.props.item.likeNum}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}