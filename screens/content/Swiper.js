import React, {Component} from 'react';
import {StyleSheet,View,Text,TextInput,Image} from 'react-native';
import { setFont, setSize } from "../../utils/resolution";
import Swiper from 'react-native-swiper';

// <View style={styles.slide} >
//               <Text numberOfLines={1}>Aussie tourist dies at Bali hotel</Text>
//               <Image resizeMode='stretch' style={styles.image} source={require('../../assets/images/pages/checked.png')} />
//           </View>
//           <View style={styles.slide}>
//               <Text numberOfLines={1}>Big lie behind Nine’s new show</Text>
//               <Image resizeMode='stretch' style={styles.image} source={require('../../assets/images/pages/heart.png')} />
//           </View>
//           <View style={styles.slide} >
//               <Text numberOfLines={1}>Why Stone split from Garfield</Text>
//               <Image resizeMode='stretch' style={styles.image} source={require('../../assets/images/pages/my.png')} />
//           </View>
//           <View style={styles.slide}>
//               <Text numberOfLines={1}>Learn from Kim K to land that job</Text>
//               <Image resizeMode='stretch' style={styles.image} source={require('../../assets/images/pages/mine.png')} />
//           </View>

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
              bottom: 23, left: 0, right: 0
          }}
          loop
        >
          

          {picDetail.map((item, idx)=>{

            return(

              <View style={styles.slide} key={idx}>

                <Text numberOfLines={1}>Aussie tourist dies at Bali hotel</Text>
                <Image resizeMode='stretch' style={styles.image} source={{uri: item.pic_optimize_url}} />

              </View>

            );

          })}

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
      backgroundColor: 'transparent'
    },

    slide1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#9DD6EB'
    },

    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold'
    },

    image: {
      width:100,
      height:100
    }
});








