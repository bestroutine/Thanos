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

import { createMaterialTopTabNavigator } from "react-navigation";
import { setFont, setSize } from "../utils/resolution";

export default class FoundScreen extends React.Component {
  static navigationOptions = {
    title: "发现",
    headerStyle: {
      backgroundColor: "#FFF",
      borderBottomWidth: 0
    }
  };
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      page: 0,
      data: [],
      refreshing: false,
      loading: false,
      category: 1,
      contentListHeight: 0
    };
  }

  request = () => {
    this.setState({
      loading: true
    });
    const url = `https://show.belle.net.cn/content/indexNew?start=${
      this.state.page
    }&end=10&listType=${this.state.category}`;
    fetch(url, {
      method: "GET",
      headers: {
        Token:
          "eyJvcGVuSWQiOiJvVGNWNjVTUjd5OU1TTkZhb0xQYlYxTGhUN3dZIiwic2NyZXdJZCI6Ind4ZjhlOTg4NmFjOTQ4MGViYSIsInVzZXJJZCI6IjJmOTU1N2EyYmQ5YzQ5OGU4MGJiM2UzZDIwNWNiZjZjIn0..0ce0b63cddd64f0f8034f9866f583cc8"
      }
    })
      .then(res => {
        console.log("started fetch");
        return res.json();
      })
      .then(res => {
        let data = this.state.refreshing ? [] : this.state.data;
        this.setState({
          data: [...data, ...res.data.data],
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(err => {
        console.log("==> fetch error", err);
        this.setState({
          error: err,
          loading: false,
          refreshing: false
        });
      });
  };

  handleRefresh = () => {
    this.setState(
      {
        page: 0,
        refreshing: true,
        loading: false,
        data: []
      },
      () => {
        this.request();
      }
    );
  };

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.request();
      }
    );
  };

  _onPlay = (id, title) => {
    console.log(id);
    this.props.navigation.navigate("VideoShow", {
      title: title,
      id: id
    });
  };

  renderItem = ({ item }) => {
    if (item.contentType == 3) {
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
              uri: item.picOptimizeBigUrl
            }}
          >
            <TouchableWithoutFeedback
              onPress={() => this._onPlay(item.contentId, item.title)}
            >
              <Image
                style={{
                  width: setSize(100),
                  height: setSize(100)
                }}
                source={require("../assets/images/pages/play.png")}
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
            {item.title}
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
                source={require("../assets/images/pages/shop_icon.png")}
              />
              <Text
                style={{
                  fontSize: 11,
                  height: 14,
                  color: "#999"
                }}
              >
                {item.shopName}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 11,
                height: 14,
                color: "#999"
              }}
            >
              {new Date(item.ctime).toLocaleDateString().replace(/\//g, "-")}
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
              source={require("../assets/images/pages/foundLikeNo.png")}
            />
            <Text
              style={{
                marginLeft: 5,
                color: "#999",
                fontSize: 12
              }}
            >
              {item.likeNum}
            </Text>
          </View>
        </View>
      );
    } else if (item.contentType == 1) {
      return (
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
                uri: item.picOptimizeUrl
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
              {item.title}
            </Text>
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
                uri: item.picOptimizeUrl
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
              {item.title}
            </Text>
          </View>
        </View>
      );
    }
  };

  emptyComponent = height => (
    <View
      style={{
        flex: 1,
        height: this.state.contentListHeight,
        alignItems: "center",
        // justifyContent: "center",
        backgroundColor: "#FFF",
        paddingTop: setSize(318 - 88)
      }}
    >
      <Image
        style={{
          width: setSize(230),
          height: setSize(230)
        }}
        source={require("../assets/images/pages/noFoundTwo.png")}
      />
      <Text
        style={{
          color: "#999999",
          fontSize: 14
        }}
      >
        一大波精彩内容正在赶来 敬请期待
      </Text>
    </View>
  );

  onCategoryChange = category => {
    this.setState(
      {
        category: category,
        page: 0,
        // data: [],
        refreshing: true
      },
      () => {
        this.request();
      }
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            height: 44,
            backgroundColor: "#FFF",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center"
          }}
        >
          <Button
            onPress={() => this.onCategoryChange(1)}
            title="全部"
            color={this.state.category == "1" ? "#00BBB4" : "#999999"}
          />
          <Button
            onPress={() => this.onCategoryChange(3)}
            title="视频"
            color={this.state.category == "3" ? "#00BBB4" : "#999999"}
          />
          <Button
            onPress={() => this.onCategoryChange(2)}
            title="优惠"
            color={this.state.category == "2" ? "#00BBB4" : "#999999"}
          />
        </View>
        <FlatList
          style={{ flex: 1, backgroundColor: "#FFF" }}
          data={this.state.data || []}
          renderItem={this.renderItem}
          keyExtractor={item => `${item.contentId}`}
          ListEmptyComponent={this.emptyComponent(this.height)}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
          onEndReachedThreshold={0}
          onLayout={e => {
            let height = e.nativeEvent.layout.height;
            if (this.state.contentListHeight < height) {
              this.setState({ contentListHeight: height });
            }
          }}
          // onEndReached={this.handleLoadMore}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white"
  }
});
