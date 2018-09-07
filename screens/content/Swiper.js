import React, {Component} from 'react';
import {StyleSheet,View,Text,TextInput,Image} from 'react-native';
import { setFont, setSize, screenW} from "../../utils/resolution";
import Swiper from 'react-native-swiper';


export default class Content extends Component {
	constructor(props) {
  	super(props);
	}

  componentWillMount() {
  	
  }

  

	render() {
    // console.log(this.props.detailPic)
    // console.log('---------')
    const picDetail = this.props.detailPic; //图片内容
    let DomArr = []
    picDetail.forEach((item,idx)=>{
      let tagListData = item.tag ||[]
      DomArr.push(
        <View style={styles.slide} key={idx}>
          if(item.tag&&item.tag.length>0){
            tagListData.map((tip,i)=>{
              // console.log(tip)
              return(
                <View key={i} style={[
                    styles.tags,
                    {
                      position: 'absolute',
                      left: tip.location_x*screenW,
                      top: tip.location_y*screenW
                    }
                  ]}
                > 
                  <View style={styles.tag_circle}>
                    <Text style={styles.min_circle}></Text>
                    <Text style={styles.max_circle}></Text>
                  </View>
                  <View style={styles.tag_line}></View>
                  <View style={styles.tag}>
                    <Text style={styles.swiper_tag}>
                      {parseInt(tip.tag_price)>0? '¥'+parseInt(tip.tag_price)+' ': ''}{tip.tag_name}
                    </Text>
                  </View>
                </View>
              )
            })
          }
          <Image resizeMode='contain' style={styles.image} source={{uri: item.pic_optimize_url}} />
        </View>
      )
    })
    return (
    	<View 
        style={{
          width: '100%',
          height: setSize(750),
          backgroundColor: '#f8f8f8'
        }}
      >
      	<Swiper 
          height={setSize(750)}
          onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
          dot={<View style={{backgroundColor:'rgba(218,218,218,1)', width: setSize(12), height: setSize(12),borderRadius: 2, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
          activeDot={<View style={{backgroundColor: '#000', width: setSize(12), height: setSize(12), borderRadius: 2, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
          paginationStyle={{
              bottom: setSize(20), left: 0, right: 0
          }}
          loop
          autoplay={false}
          key={this.props.detailPic.length}
        >
          { DomArr}
        </Swiper>
    	</View>
    );
	}
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    wrapper: {
    },

    slide: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
      position: 'relative'
    },
    tags:{
      flexDirection: "row",
      alignItems: 'center',
      zIndex: 2,
    },
    tag_circle:{
      position: 'relative'
    },
    min_circle:{
      position: 'absolute',
      left: setSize(6.5),
      top: setSize(6.5),
      width:setSize(10),
      height: setSize(10),
      backgroundColor: '#fff',
      borderRadius: setSize(20),
      zIndex:2,
    },
    max_circle:{
      width:setSize(22),
      height: setSize(22),
      backgroundColor: 'rgba(0,0,0,.6)',
      borderRadius: setSize(22),
    },
    tag_line:{
      width:setSize(35),
      borderWidth: 0,
      borderBottomWidth: 2,
      borderColor: 'rgba(0,0,0,.7)',
    },
    tag:{
      paddingBottom: setSize(12),
      paddingLeft: setSize(15),
      paddingRight: setSize(15),
      backgroundColor: 'rgba(0,0,0,.7)',
      borderRadius: setSize(4),
    },
    swiper_tag: {
      color: '#fff',
      fontSize: setFont(24),
      fontWeight: 'bold',
      paddingTop: setSize(12),
      
    },

    image: {
      width:'100%',
      height:'100%'
    }
});








