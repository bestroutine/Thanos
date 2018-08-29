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
      pageSize: 10,
      data: [],
      newData: [],
      refreshing: false,
      loading: false,
      category: 1,
      contentListHeight: 0,
      residue: {}, //余下单独的图片数据
    };
  }

  request = () => {
    this.setState({
      loading: true
    });
    const url = `${BRIDGE}/content/indexNew?start=${
      this.state.page
    }&end=${this.state.pageSize}&listType=${this.state.category}`;
    console.log(url);
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
        console.log(res.data.data);
        let new_data = this.state.refreshing ? [] : this.state.newData;
        let v_list = [];
        let p_list = [];
        res.data.data.map((item)=>{
          if(item.contentType==3){
            v_list.push(item);
          }else{
            p_list.push(item);
          }
        })
        // ********以下图片数据处理**********
        let newpicarr = [];
        let tmppicArr = [];
        if(JSON.stringify(this.state.residue) != '{}'){ //判断residue是否为空对象
          p_list.unshift(this.state.residue);  //不是空对象就push 到图片数据的最前面
          this.setState({  //push 之后置空
            residue: {}
          })
        }
        if(p_list.length%2 ==1){
          this.setState({
            residue: p_list[p_list.length-1]
          })
        }
        for(let i=0; i<p_list.length; i++){
          if(!tmppicArr.includes(p_list[i])&&(i+1)<p_list.length) { //
            newpicarr.push([p_list[i],p_list[i+1]]);
            tmppicArr.push(p_list[i]);
            tmppicArr.push(p_list[i+1]);

          }
        }
        // ********以上图片数据处理**********
        // ********以下视频数据处理**********
        let newvideoarr =[];
        v_list.map((v_tip)=>{
          newvideoarr.push([v_tip]);
        })
        // ********以上视频数据处理**********
        // ********以下数据整合**********
        let newarr = [];
        if(this.state.category == "3"){
          newarr = [...newvideoarr];
        }else{
          if(this.state.newData[0].contentType==3){
            //如果第一条是视频
            newarr.push(newvideoarr[0]);
            let n =1;
            newpicarr.map((item,index)=>{
              newarr.push(item);
              if(index%2==1){
                if(n < newvideoarr.length){
                  newarr.push(newvideoarr[n]);
                  n = n+1;
                } 
              }
            })
            for(let i = n ; i< newvideoarr.length; n++){
              newarr.push(newvideoarr[n])
            }
          }else{
            //不是视频就先加载图片
            let num =0;
            newpicarr.map((item,index)=>{
              newarr.push(item);
              if(index%2==1){
                if(num < newvideoarr.length){
                  newarr.push(newvideoarr[num]);
                  num = num+1;
                } 
              }
            })
            for(let i = num ; num< newvideoarr.length; num++){
              newarr.push(newvideoarr[num])
            }
          }
        }
        // console.log('--------------')
        // console.log(newarr);
        // 整合后的最新的数据
        this.setState({
          newData: [...new_data, ...newarr],
          error: res.error || null,
          loading: false,
          refreshing: false
        });
        // console.log(']]]]]]]]]]]')
        // console.log(this.state.newData)
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
        data: [],
        residue: {}
      },
      () => {
        this.request();
      }
    );
  };

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + this.state.pageSize
      },
      () => {
        this.request();
      }
    );
  };

  renderItem = ({ item }) => {
    if (item[0].contentType == 3) {
      return(<VideoList item={item[0]} navigation={this.props.navigation}/>)
    } else{
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
        refreshing: true,
        residue: {}
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
          data={this.state.newData || []}
          renderItem={this.renderItem}
          keyExtractor={item => `${item[0].contentId}`}
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
          onEndReached={this.handleLoadMore}
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
