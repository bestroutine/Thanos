import React from 'react';
import { Icon } from 'expo';
import { Image } from 'react-native';

import Colors from '../constants/Colors';

export default class TabBarIcon extends React.Component {
  render() {
    let items = {
      'found': require('../assets/images/pages/found.png'),
      'foundSelect': require('../assets/images/pages/foundSelect.png'),
      'my': require('../assets/images/pages/my.png'),
      'mySelect': require('../assets/images/pages/mySelect.png'),
      'cart': require('../assets/images/pages/cart.png'),
      'cartSelect': require('../assets/images/pages/cartSelect.png'),
    }
    return (
      <Image
        source={items[this.props.name + (this.props.focused? 'Select' : '')]}
        fadeDuration={0}
        style={{width: 26, height: 26}}
      />
    );
  }
}