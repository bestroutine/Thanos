import {
  TOKEN,
  BRIDGE,
} from '../utils/constant';

const goodListNew = (params) => wxRequest(params, BRIDGE + '/content/indexNew');

module.exports = {
	goodListNew,
}