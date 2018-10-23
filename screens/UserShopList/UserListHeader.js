import React from "react";
import { ScrollView, StyleSheet, Image, View, Text, SafeAreaView,StatusBar } from "react-native";
import { setFont, setSize } from "../../utils/resolution";
import user_header from '../../assets/images/pages/user_header.png'

export default class UserListHeader extends React.Component {
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
    let infoData = this.props.info
    return (
      <View style={styles.header}>
        <Image
          style={styles.header_img}
          source={user_header}
        />
        <View style={styles.title} shadowSize={2}>
          <View style={styles.tit_images}>
            <Image
              style={styles.title_img}
              source={{uri:infoData.avatarUrl}}
            />
          </View>
          <Text style={styles.title_text}>{infoData.userName}</Text>
        </View>
      </View>
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
    borderWidth:1,
    borderColor: 'rgba(0,0,0,.05)',
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







