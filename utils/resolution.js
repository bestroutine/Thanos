import {
    Dimensions,
    PixelRatio,
} from 'react-native';

// 750 * 1334 @2x

export const screenW = Dimensions.get('window').width;
export const screenH = Dimensions.get('window').height;

let pixelRatio = PixelRatio.get();

const designW = 375
const designH = 667

const _scaleW = screenW / designW;
const _scaleH = screenH / designH;

const defaultPixel = 2;
const scale = Math.min(_scaleW, _scaleH);

/////////////////////////////////////////////////////////////////////////

export function setFont(size) {
    let fontScale = PixelRatio.getFontScale();
    size = Math.round((size * scale) / fontScale);
    return size / defaultPixel;
}

export function setSize(size) {
    size = Math.round(size * scale);
    return size / defaultPixel;
}

export function scaleW(size) {
    return size * _scaleW;
}

export function scaleH(size) {
    return size * _scaleH;
}


// iPhoneX
