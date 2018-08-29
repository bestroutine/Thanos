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

export default class PicList extends React.Component {
  constructor(props) {
    super(props);
    // console.log('++++++++++++++')
    // console.log(this.props)
  }
  renderMessage(one_data){
    return(
      <View
        style={{
          flex: 1
        }}
      >
        <Image
          style={{
            height: setSize(330),
            width: setSize(330),
            borderRadius: 4
          }}
          source={{
            uri: one_data.picOptimizeUrl
          }}
        />
        <Text
          numberOfLines={1}
          style={{
            fontSize: setFont(24),
            color: "#333",
            height: setSize(30),
            marginTop: setSize(15)
          }}
        >
          {one_data.title}
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            marginTop: setSize(16),
          }}
        >
          <View
            style={{
              flex:1,
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
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
              numberOfLines={1}
              style={{
                fontSize: 11,
                height: 14,
                color: "#999",
                width: setSize(160)
              }}
            >
              {one_data.shopName}
            </Text>
          </View>
          <View
            style={{
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 11,
                height: 14,
                color: "#999",
              }}
            >
              {new Date(one_data.ctime).toLocaleDateString().replace(/\//g, "-")}
            </Text>
          </View>
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
              borderWidth: one_data.promotion.length>0? 1: 0,
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
            >{one_data.promotion.length>0?one_data.promotion[0].promotion_name:'优惠'}</Text>
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
              {one_data.likeNum}
            </Text>
          </View>
        </View>
      </View>
    )
  }
  render() {
    return(
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          padding: setSize(30)
        }}
      >
        {this.renderMessage(this.props.item[0])}
        <View style={{ width: setSize(30) }} />
        {this.renderMessage(this.props.item[1])}
      </View>
    );
  }
}