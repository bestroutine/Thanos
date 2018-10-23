import React from "react";
import { ScrollView, StyleSheet, Image, View, Text, SafeAreaView, StatusBar } from "react-native";
import { setFont, setSize } from "../../utils/resolution";
import shop_header from '../../assets/images/pages/shop_header.jpg'
import address from '../../assets/images/pages/address.png'
import phone from '../../assets/images/pages/phone.png'
import wxchat from '../../assets/images/pages/wxchat.png'

export default class ShopListsHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  componentWillMount() {

  }
  render() {
    // console.log(this.props.info);
    // console.log('------------------')
    let infoData = this.props.info || {}
    return (
      <View style={styles.header}>
        <Image
          style={styles.header_img}
          source={shop_header}
        />
        <Text style={styles.shop_name}>{infoData.shop_name}</Text>
        <View style={styles.attention}>
          <Text style={styles.attention_text}>关注</Text>
        </View>
        <View style={styles.title}>
          <View style={styles.info}>
            <Image
              style={{width:setSize(38),height:setSize(38)}}
              source={address}
            />
            <Text numberOfLines={1} style={styles.info_text}>{infoData.shop_address}</Text>
          </View>
          <View style={styles.info}>
            <Image
              style={{width:setSize(38),height:setSize(38)}}
              source={phone}
            />
            <Text style={styles.info_text}>{infoData.shop_tel}</Text>
          </View>
          <View style={styles.info}>
            <Image
              style={{width:setSize(38),height:setSize(38)}}
              source={wxchat}
            />
            <Text style={styles.info_text}>{infoData.wechat_num}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    height: setSize(440),
    backgroundColor: '#fff',
    position: 'relative',
    alignItems: "center",
  },
  header_img:{
    width: '100%',
    height: setSize(310)
  },
  title:{
    width: setSize(690),
    height: setSize(260),
    borderRadius: setSize(8),
    backgroundColor: '#fff',
    position:'absolute',
    bottom: 0,
    shadowColor:'rgba(0,0,0,1)',
    shadowOffset:{height:10,width:10},
    shadowRadius:setSize(8),
    alignItems: "flex-start",
    justifyContent: "space-between",
    borderWidth:1,
    borderColor: 'rgba(0,0,0,.05)',
    paddingTop: setSize(44),
    paddingBottom: setSize(44),
  },
  shop_name:{
    position: 'absolute',
    top: setSize(30),
    fontSize: setFont(48),
    color: '#fff'
  },
  attention:{
    width:setSize(140),
    height: setSize(50),
    borderRadius: setSize(4),
    backgroundColor: '#00BBB4',
    position:'absolute',
    top: setSize(108)
  },
  attention_text: {
    fontSize: setFont(24),
    color: '#fff',
    textAlign:'center',
    lineHeight: setSize(50),
  },
  info:{
    flexDirection: "row",
    marginLeft: setSize(54)
  },
  info_text:{
    marginLeft: setSize(27),
    fontSize: setFont(28),
    color: '#333',
    width: setSize(570)
  }
});




