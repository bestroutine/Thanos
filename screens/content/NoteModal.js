import React, {Component} from 'react';
import {StyleSheet,View,Text,TextInput,Image,Modal, ScrollView, TouchableOpacity} from 'react-native';
import { setFont, setSize } from "../../utils/resolution";
import { LinearGradient } from 'expo';

export default class NoteModal extends Component {
	constructor(props) {
  	super(props);
    this.state={
      NoteShow: false
    }
	}
  componentWillMount() {
    if(this.state.NoteShow == false){
      this.setState({
        NoteShow: this.props.NoteShow
      })
    }
  }
  
  componentWillReceiveProps(nextProps,nextState) {
    if(this.state.NoteShow == false){
      this.setState({
        NoteShow: nextProps.NoteShow
      })
    }
  }
  closeNoteShow(){
    this.setState({
      NoteShow: false
    })
  }

	render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.NoteShow}
      >
        <View style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,.5)',
          justifyContent: "flex-end",
        }}>
          <View style={{
            backgroundColor: '#fff'
          }}>
            <View style={{
              flexDirection:'row',
              justifyContent:'center',
              alignItems: 'center',
              borderBottomWidth:1,
              borderBottomColor: '#ddd',
              height:setSize(80),
              position:'relative'
            }}>
              <Text>服务说明</Text>
              <TouchableOpacity onPress={()=>this.closeNoteShow()} style={{
                position:'absolute',
                right:setSize(30)
              }}>
                <Image style={{
                  width: setSize(31),
                  height: setSize(31),
                }}
                  source={require('../../assets/images/pages/size_close.png')}
                />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.notice}>
              <Text style={styles.header}>免责说明</Text>
              <View style={styles.item_content}>
                <Text style={styles.strip}>店铺在某些情况下有权单方面取消您的订单，如您已付款，店铺只需通过原付款平台向您退回您已支付款项，且无需承担其他责任。</Text>
              </View>
              <Text style={styles.header}>退换货承诺</Text>
              <View style={styles.item_content}>
                <Text style={styles.strip}>A、自您签收商品之日起7日内，在不影响二次销售的前提下，提供无理由退换货；</Text>
                <Text style={styles.strip}>B、所有产品均执行国家商品质量三包规定服务；</Text>
                <Text style={styles.strip}>C、所有产品的退换货服务，需联系购买店铺。</Text>
              </View>
              <Text style={styles.header}>以下情况将不提供退换货服务</Text>
              <View style={styles.item_content}>
                  <Text style={styles.strip}>A、任何限量款商品、非店铺出售的产品或超过三包期限产品；</Text>
                  <Text style={styles.strip}>B、超过店铺承诺的7天退换货有效时间（产品属质量问题除外）</Text>
                  <Text style={styles.strip}>C、商品相关附件、保修单或三包卡或保修卡、吊牌、发票（若开具过发票）、赠品等不完整，商品的外包装损坏(包括包裹填充物及外包装盒)、鞋盒上有直接粘有胶带类物品；</Text>
                  <Text style={styles.strip}>D、无质量问题并已使用过的商品、商品受污损，影响二次销售(鞋底、鞋面已磨损、已有穿着痕迹属于影响二次销售)；</Text>
                  <Text style={styles.strip}>E、因非正常使用、保养（贮存）不当，造成的商品损坏（如污损、自行维修，修改加工，洗涤等）；</Text>
                  <Text style={styles.strip}>F、出于安全和卫生考虑，贴身用品如内衣裤、短袜/打底袜/丝袜/美腿袜、塑身裤、塑身连体衣、插片/胸垫、泳衣类商品不予退换货，经权威部门检测商品存在内在质量问题者除外；</Text>
                  <Text style={styles.strip}>G、店铺内明确标明不能退换货的商品。</Text>
              </View>
              <Text style={styles.header}>退换货注意事项或相关运费须知</Text>
              <View style={styles.item_content}>
                  <Text style={styles.strip}>A、如果商品需要退换货，需出具购买时的购物小票，礼包或套餐等活动如有绑定赠品的主商品需要退货，要将赠品一同退回。退货商品及赠品需保持完好</Text>
                  <Text style={styles.strip}>B、如果商品有吊牌，请您不要轻易剪掉或损坏吊牌，吊牌被剪掉或损坏，会直接影响退换服务；</Text>
                  <Text style={styles.strip}>C、退换货商品吊牌请不要剪掉或损坏，如果剪掉或损坏吊牌，将无法享受退换货服务；</Text>
                  <Text style={styles.strip}>D、符合店铺承诺退换货标准的商品，请采用普通快递方式或到店退回；</Text>
                  <Text style={styles.strip}>E、退换货商品如采用快递方式退回，需用户自己承担运费，不接受到付；</Text>
                  <Text style={styles.strip}>G、店铺内明确标明不能退换货的商品。</Text>
              </View>
            </ScrollView>
            <View style={styles.btn_box}>
              <TouchableOpacity
                style={{width:'100%'}}
                onPress={()=>this.closeNoteShow()}
              >
                <LinearGradient
                  colors={['rgba(0,226,222,1)', 'rgba(0,187,180,1)']}
                  style={styles.btn}
                  onPress={()=>this.closeNoteShow()}
                >
                  <Text
                    style={{
                      backgroundColor: 'transparent',
                      fontSize: setSize(28),
                      color: '#fff',
                    }}
                  >
                    确认
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
	}
}

const styles = StyleSheet.create({
  notice: {
    backgroundColor: '#fff',
    paddingLeft:setSize(30),
    paddingRight: setSize(30),
    height:setSize(787),
    paddingTop:setSize(30)
  },
  header:{
    fontSize:setFont(24),
    color:'#333',
    marginBottom:setSize(20),
    fontWeight:'bold',
  },
  item_content:{
      marginBottom:setSize(20),
  },
  strip:{
    flexDirection: 'row',
    fontSize:setFont(24),
      color:'#666',
      lineHeight:setSize(30)
  },
  btn_box:{
    alignItems: 'center',
    justifyContent: 'center',
    height:setSize(110),
    paddingLeft:setSize(30),
    paddingRight:setSize(30)
  },
  btn:{
    width: '100%',
    height: setSize(70),
    alignItems: 'center', 
    justifyContent: 'center' 
  }
})







