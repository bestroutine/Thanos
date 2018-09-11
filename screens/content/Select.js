import React, {Component} from 'react';
import {StyleSheet,View,Text,TextInput,Image,Modal, Alert,TouchableOpacity,SafeAreaView} from 'react-native';
import { setFont, setSize } from "../../utils/resolution";
const imgLocation = require('../../assets/images/pages/img-location.png');
const imgClose = require('../../assets/images/pages/size_close.png');

export default class Select extends Component {
	constructor(props) {
  	super(props);
  	this.state = {
      selectVisible: false,
      sizeSelect: '',
    }
	}

  componentWillMount(nextProps,nextState) {
    if(this.state.selectVisible == false){
      this.setState({
        selectVisible: this.props.selectShow,
        sizeSelect: this.props.selectData.sku[0].shop_sku_id
      })
    }
  }

  componentWillReceiveProps(nextProps,nextState) {
    if(this.state.selectVisible == false){
      this.setState({
        selectVisible: this.props.selectShow
      })
    }
  }

  closeSelectShow(){
    this.setState({
      selectVisible: false
    })
  }

  chooseSize(item){
    if(item.stock !=0){
      this.setState({
        sizeSelect: item.shop_sku_id
      })
    }
  }

  _sizeNumber(sizeNumberList){
    let sizeArr = []
    if(sizeNumberList.length>0){
      sizeNumberList.map((tip)=>{
        console.log(tip)
        sizeArr.push(
          <TouchableOpacity key={tip.shop_sku_id} onPress={()=>this.chooseSize(tip)}>
            <View 
              style={[
                styles.size_num,
                {
                  backgroundColor:this.state.sizeSelect==tip.shop_sku_id? "#111" :"#fff",
                  borderColor:this.state.sizeSelect==tip.shop_sku_id? "#111" :"#ddd",
                  }
                ]}
            >
              <Text style={[
                styles.size_no,
                {color: tip.stock == 0 ? "#ddd" : (this.state.sizeSelect==tip.shop_sku_id? "#fff" :"#333")}
                ]}
              >
                {tip.size_no}
              </Text>
            </View>
          </TouchableOpacity>
        )
      })
    }
    return sizeArr
  }

	render() {
    let selectData = this.props.selectData;
    console.log(selectData)
    return (
      <SafeAreaView style={{flex:1}}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.selectVisible}
        >
          <View style={styles.select}>
              <View style={styles.sel_box}>
                <View style={styles.sel_tit}>
                  <Image 
                    style={styles.sel_tit_img} 
                    source={selectData.img_optimize_path?{uri:selectData.img_optimize_path}:imgLocation} 
                  />
                  <View style={styles.sel_tit_msg}>
                    <View style={styles.price}>
                      <Text style={styles.sale_price}>¥{selectData.sale_price}</Text>
                      <Text style={styles.tag_price}>¥{selectData.tag_price}</Text>
                    </View>
                    <Text numberOfLines={1} style={styles.title}>轻薄轻薄运动塑型裤轻薄运动塑型轻薄轻薄运动塑型裤轻薄运动塑型</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.sel_tit_close}
                    onPress={()=>this.closeSelectShow()}
                  >
                    <Image 
                      style={{width: setSize(31),height: setSize(31),}} 
                      source={imgClose}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.size}>
                  <Text style={styles.size_text}>尺码</Text>
                  <View style={styles.size_number}>
                  {this._sizeNumber(selectData.sku)}
                  </View>
                </View>

                <View style={styles.color_buy}>
                  <View style={{flexDirection:'row'}}>
                    <Text style={styles.color_text}>颜色</Text>
                    <Text style={styles.color}>{selectData.color}</Text>
                  </View>
                  <View>
                    <Text>+-</Text>
                  </View>
                </View>

                <View style={{flexDirection:'row'}}>
                  <Text style={styles.add_cart}>加入购物车</Text>
                  <Text style={styles.go_buy}>去购买</Text>
                </View>
              </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
	}
}

const styles = StyleSheet.create({
  select:{
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,.5)',
    flex:1,
    flexDirection: 'column-reverse'
  },
  sel_box:{
    width: '100%',
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  sel_tit:{
    height: setSize(150),
    borderBottomWidth: 1,
    borderColor: '#e5e5e5',
    position: 'relative'
  },
  sel_tit_img:{
    width:setSize(160),
    height:setSize(160),
    borderRadius: setSize(4),
    position: 'absolute',
    top: setSize(-40),
    left: setSize(30)
  },
  sel_tit_msg:{
    width: '60%',
    marginLeft: setSize(210),
  },
  price:{
    flexDirection:'row',
    alignItems: 'flex-end',
    marginBottom:setSize(16),
    marginTop:setSize(27)
  },
  sale_price:{
    fontSize: setFont(40),
    color: '#333',
    marginRight:setSize(20)
  },
  tag_price:{
    fontSize:setFont(24),
    color: '#ccc'
  },
  title:{
    fontSize: setFont(28),
    color: '#333',
  },
  sel_tit_close:{
    
    position: 'absolute',
    right: setSize(30),
    top: setSize(30)
  },

  size:{
    // marginRight: setSize(30),
    marginLeft: setSize(30),
  },
  size_text:{
    fontSize: setFont(28),
    color: '#999',
    marginTop: setSize(40),
    marginBottom: setSize(30),
  },
  size_number:{
    flexDirection:'row',
    flexWrap: 'wrap',
  },
  size_num:{
    width:setSize(157),
    height: setSize(60),
    borderWidth:1,
    borderColor: '#ddd',
    borderRadius: setSize(4),
    marginRight:setSize(20),
    marginBottom:setSize(40),
    alignItems: 'center',
  },
  size_no:{
    fontSize: setFont(24),
    color: '#333',
    lineHeight: setSize(60),
  },

  color_buy:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginLeft:setSize(30),
    marginRight: setSize(30),
    marginBottom: setSize(40)
  },
  color_text:{
    color: '#999',
    fontSize:setFont(22),
    marginRight:setSize(14)
  },
  color:{
    color: '#333',
    fontSize:setFont(22)
  },

  add_cart:{
    height:setSize(98),
    backgroundColor: '#111',
    flex:1,
    textAlign:'center',
    lineHeight: setSize(98),
    color: '#fff',
  },
  go_buy:{
    height:setSize(98),
    backgroundColor: '#00BBB4',
    flex:1,
    textAlign:'center',
    lineHeight: setSize(98),
    color: '#fff',
  }
})






