import React, {Component} from 'react';
import {StyleSheet,View,Text,TextInput,Image, TouchableOpacity} from 'react-native';
import { setFont, setSize } from "../../utils/resolution";

export default class Author extends Component {
	constructor(props) {
  	super(props);
	}

  componentWillMount() {
  	
  }

  goToUserList(u_id,url){
    console.log(u_id)
    this.props.navigation.push('UserLists',{
      uId: u_id,
      autohrUrl: url
    })
  }

	render() {
    // console.log(this.props.detailCreator)
    // console.log(this.props.title)
    return (
    	<View>
      	<View style={styles.author}>
          <TouchableOpacity style={styles.author_desc} onPress={()=>this.goToUserList(this.props.detailCreator.uid,this.props.detailCreator.avatarUrl)}>
            <Image 
              style={styles.au_image} 
              source={{uri: this.props.detailCreator.avatar}} />
            <Text style={styles.au_name}>{this.props.detailCreator.Name}</Text>
          </TouchableOpacity>
          <View></View>
        </View>
        <Text style={styles.title_desc}>{this.props.title}</Text>
        <Text style={styles.empty}></Text>
    	</View>
    );
	}
}

const styles = StyleSheet.create({
  author:{
    height: setSize(140),
    marginLeft: setSize(30),
    marginRight: setSize(30),
    borderBottomWidth: 1,
    borderColor: '#e5e5e5',
  },
  author_desc:{
    flex:1,
    flexDirection: "row",
    alignItems: "center",
  },
  au_image:{
    width: setSize(60),
    height: setSize(60),
    borderRadius: setSize(30),
    borderWidth:1,
    borderColor: '#e5e5e5'
  },
  au_name:{
    fontSize:setFont(32),
    color: '#333',
    marginLeft: setSize(18)
  },
  title_desc: {
    paddingTop: setSize(35),
    paddingBottom: setSize(35),
    paddingLeft: setSize(30),
    paddingRight: setSize(30),
    fontSize: setFont(28),
    color: '#666',
  },
  empty:{
    height:setSize(20),
    backgroundColor: '#f8f8f8'
  }
})






