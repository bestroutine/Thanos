import React from "react";
import { ScrollView, StyleSheet, Image, View, Text, SafeAreaView,StatusBar } from "react-native";
import { setFont, setSize } from "../utils/resolution";
import TabList from './found/TabLists'
import {
  TOKEN,
  BRIDGE,
} from '../utils/constant';
import user_header from '../assets/images/pages/user_header.png'

export default class UserLists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uId: this.props.navigation.getParam('uId'),
      name: '',
      avatarUrl: this.props.navigation.getParam('avatarUrl')
    };
  }
  componentWillMount() {
    this.request()
  }

  request = () => {
    const url = `${BRIDGE}/showUserInfo/authorContentList?start=0&pageSize=1&listType=1&userId=${this.state.uId}`;
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
        console.log(res.data)
        this.setState({
          name: res.data.userName,
          avatarUrl: res.data.avatarUrl
        })
      })
      .catch(err => {
        console.log("==> fetch error", err);
        this.setState({
          error: err,
          loading: false,
          refreshing: false
        });
      });
  }

  render() {
    return (
      <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
        <StatusBar barStyle='light-content' />
        <ScrollView>
          <View style={styles.header}>
            <Image
              style={styles.header_img}
              source={user_header}
            />
            <View style={styles.title} shadowSize={2}>
              <View style={styles.tit_images}>
                <Image
                  style={styles.title_img}
                  source={{uri: this.state.avatarUrl}}
                />
              </View>
              <Text style={styles.title_text}>{this.state.name}</Text>
            </View>
          </View>
          <TabList 
            ajax_url='/showUserInfo/authorContentList'
            ajax_prames={'&userId='+this.state.uId}
            navigation={this.props.navigation}
            whichEnd='pageSize'
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    height: setSize(420),
    backgroundColor: '#fff',
    position: 'relative',
    alignItems: "center",
  },
  header_img:{
    width: '100%',
    height: setSize(300)
  },
  title:{
    width: setSize(690),
    height: setSize(240),
    borderRadius: setSize(8),
    backgroundColor: '#fff',
    position:'absolute',
    bottom: 0,
    shadowColor:'rgba(0,0,0,1)',
    shadowOffset:{height:10,width:10},
    shadowRadius:setSize(8),
    alignItems: "center",
  },
  tit_images:{
    width: setSize(160),
    height: setSize(160),
    borderRadius: setSize(80),
    borderWidth:1,
    borderColor: '#ddd',
    position: 'absolute',
    top: setSize(-80),
  },
  title_img: {
    width: setSize(160),
    height: setSize(160),
    borderRadius: setSize(80),
  },
  title_text:{
    color: '#333',
    fontSize: setFont(48),
    marginTop: setSize(120)
  }
});







