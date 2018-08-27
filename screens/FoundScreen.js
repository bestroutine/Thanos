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
import {
  TOKEN,
  BRIDGE,
} from '../utils/constant';
import VideoList from './found/VideoList'
import PicList from './found/PicList'
import EmptyComponent from './found/EmptyComponent'

export default class FoundScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "发现",
    headerStyle: {
      backgroundColor: "#FFF",
      borderBottomWidth: 0
    },
    tabBarVisible: navigation.getParam('tabBarVisible') === false ? false : true
  });

  componentWillMount() {
    console.log('will mount')
    this.props.navigation.setParams({ tabBarVisible: true,'headerTitle': '发现'});
  }
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
    const url = `${BRIDGE}/content/indexNew?start=${
      this.state.page
    }&end=10&listType=${this.state.category}`;
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

  renderItem = ({ item }) => {
    if (item.contentType == 3) {
      return(<VideoList item={item} navigation={this.props.navigation}/>)
    } else if (item.contentType == 1) {
      return (<PicList item={item} navigation={this.props.navigation}/>);
    }
  };

  emptyComponent = height => (
    <EmptyComponent contentListHeight={this.state.contentListHeight} />
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
            alignItems: "center",
            borderBottomWidth: 1,
            borderBottomColor: '#E5E5E5',
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
