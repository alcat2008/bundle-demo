
import {
  Platform,
  CameraRoll,
} from 'react-native';
import NativeModules from 'NativeModules';
import RNFS from 'react-native-fs';

import _String from 'lodash/string';

const ImageHost = 'http://img.izirong.com/';

const CacheDirPath = Platform.OS === 'ios' ? RNFS.DocumentDirectoryPath + '/fasCache/' :
  RNFS.ExternalDirectoryPath + '/fasCache/';


const mkdir = () => {
  RNFS.mkdir(CacheDirPath)
    .then(success => {}) // eslint-disable-line no-unused-vars
    .catch(err => this.showError(err));
};

const getStoragePath = (url, isThumb = false) => {
  // const urlSuffix = url.split(ImageHost).pop();
  const suffixArray = _String.trimStart(url, ImageHost).split('?');

  const imageName = suffixArray[0].split('.')[0];
  const qiniuSuffix = suffixArray[1];

  // add suffix '-thumb' from thumb
  const imagePath = CacheDirPath + imageName + (isThumb ? '-thumb.jpg' : '.jpg');
  return { imagePath, qiniuSuffix };
};

const saveImage = (uri) => new Promise((resolve, reject) => {
  if (Platform.OS === 'ios') {
    CameraRoll.saveImageWithTag(uri)
      .then((response) => {
        resolve(response);
      })
      .catch((errorData) => {
        reject(errorData);
      });
  } else {
    NativeModules.SaveFileModule
      .saveFile(uri, (index) => {
        switch (index) {
          case 0:
            reject('保存失败');
            break;
          case 1:
            // resolve('成功保存至/fas-wuhan文件夹');
            resolve('保存成功');
            break;
          default:
            break;
        }
      });
  }
});

export default {
  getStoragePath,
  mkdir,
  saveImage
};
