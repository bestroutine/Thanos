import React from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  Button,
  ScrollView,
} from "react-native";

import { createMaterialTopTabNavigator } from "react-navigation";
import { setFont, setSize } from "../../utils/resolution";
import {
  TOKEN,
  BRIDGE,
} from '../../utils/constant';
import VideoList from '../found/VideoList'
import PicList from '../found/PicList'
import EmptyComponent from '../found/EmptyComponent'
import UserListHeader from './UserListHeader'
import ShopListsHeader from './ShopListsHeader'

export default class TabLists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ajax_url: this.props.ajax_url,
      ajax_prames: this.props.ajax_prames || '',
      whichEnd: this.props.whichEnd,
      pageType: this.props.pageType,
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

  componentWillMount() {
    // console.log('will mount')
    this.request();
  }

  request = () => {
    this.setState({
      loading: true
    });
    const url = `${BRIDGE}${this.state.ajax_url}?start=${
      this.state.page
    }&${this.state.whichEnd}=${
      this.state.pageSize
    }&listType=${
      this.state.category
    }${this.state.ajax_prames}`;
    // console.log(url);
    fetch(url, {
      method: "GET",
      headers: {
        Token: TOKEN,
      }
    })
      .then(res => {
        // console.log("started fetch");
        return res.json();
      })
      .then(res => {
        // console.log(res.data);
        this.setState({
            data: res.data,
        });
        let new_data = this.state.refreshing ? [] : this.state.newData;
        let v_list = [];
        let p_list = [];
        if(res.data.data.length == 0){
          this.setState({
            refreshing: false,
            newData:[...new_data]
          });
          return;
        }
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
          if(res.data.data[0].contentType==3){
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
        // newData: [],
        data: [],
        residue: {}
      },
      () => {
        this.request();
      }
    );
  };

  handleLoadMore = () => {
    // console.log('handle111111111')
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
      return(<VideoList item={item[0]} navigation={this.props.navigation} userShopType={this.state.pageType}/>)
    } else{
      return (<PicList item={item} navigation={this.props.navigation} userShopType={this.state.pageType}/>);
    }
  };

  emptyComponent = height => (
    <EmptyComponent contentListHeight={this.state.contentListHeight} pageType={this.state.pageType}/>
  );

  onCategoryChange = category => {
    this.setState(
      {
        category: category,
        page: 0,
        // newData: [],
        data: [],
        loading: true,
        refreshing: true,
        residue: {}
      },
      () => {
        this.request();
      }
    );
  };

  _whichHeader(item){

    if(this.state.pageType == '_user'){
      return(
        <UserListHeader info={item}/>
      )
    }else if(this.state.pageType == '_shop'){
      return(
        <ShopListsHeader info={item.showShop}/>
      )
    }
  }

  _buttonView(){
    return(
      <View>
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
      </View>
    )
  }

  _showHeader(item){
    if(this.state.pageType == '_user'||this.state.pageType == '_shop'){
      return(
        <View>
          {this._whichHeader(item)}
          {this._buttonView()}
        </View>
      )
    }
  }

  _showBtn(){
    if(this.state.pageType == '_other'||
       this.state.pageType == '_love'||
       this.state.pageType == '_create'){
      return(
        <View>
          {this._buttonView()}
        </View>
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this._showBtn()}
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
          ListHeaderComponent={this._showHeader(this.state.data)}
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
