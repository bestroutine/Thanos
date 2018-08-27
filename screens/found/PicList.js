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
              uri: this.props.item.picOptimizeUrl
            }}
          />
          <Text
            numberOfLines={1}
            style={{
              fontSize: setFont(24),
              color: "#333",
              height: setSize(30)
            }}
          >
            {this.props.item.title}
          </Text>
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
              numberOfLines={1}
              style={{
                fontSize: 11,
                height: 14,
                color: "#999",
                width: setSize(160)
              }}
            >
              {this.props.item.shopName}
            </Text>
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
              flex: 1,
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              marginTop: 16,
              width: "100%"
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
        <View style={{ width: setSize(30) }} />
        <View
          style={{
            flex: 1
          }}
        >
          <Image
            style={{
              height: setSize(330),
              width: setSize(330),
              borderRadius: 5
            }}
            source={{
              uri: this.props.item.picOptimizeUrl
            }}
          />
          <Text
            numberOfLines={1}
            style={{
              fontSize: setFont(24),
              color: "#333",
              height: setSize(30)
            }}
          >
            {this.props.item.title}
          </Text>
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
              numberOfLines={1}
              style={{
                fontSize: 11,
                height: 14,
                color: "#999",
                width: setSize(160)
              }}
            >
              {this.props.item.shopName}
            </Text>
            <Text
              style={{
                fontSize: 11,
                height: 14,
                color: "#999",
              }}
            >
              {new Date(this.props.item.ctime).toLocaleDateString().replace(/\//g, "-")}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              marginTop: 16,
              width: "100%"
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