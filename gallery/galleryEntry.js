
import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Platform,
  ActionSheetIOS,
} from 'react-native';

import Gallery from '../gallery/Gallery';

import { Device, Alert } from 'mx-artifacts';
import NativeModules from 'NativeModules';

import FileUtil from './fileUtil';

export default class App extends Component {

  static defaultProps = {
    param: {
      imgIndex: 1,
      urlArray: [
        'http://img.izirong.com/87043C91-4BBA-4762-BC14-3CDC9103F4FA.jpg',
        'http://img.izirong.com/5A19A8AA-8EAD-4D27-97AA-E973B191D86F.jpg',
        'http://img.izirong.com/5F1D16EB-E654-4E63-BC67-AAB3D507F22E.jpg',
      ],
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      showMenuBox: true,
      page: 0,
      initialPage: 1,
      images: [
        'http://p10.qhimg.com/t019e9cf51692f735be.jpg',
        'http://ww2.sinaimg.cn/mw690/714a59a7tw1dxqkkg0cwlj.jpg',
        'http://www.bz55.com/uploads/allimg/150122/139-150122145421.jpg'
      ]
      // images: [
      //   'http://img.izirong.com/87043C91-4BBA-4762-BC14-3CDC9103F4FA.jpg',
      //   'http://img.izirong.com/5A19A8AA-8EAD-4D27-97AA-E973B191D86F.jpg',
      //   'http://img.izirong.com/5F1D16EB-E654-4E63-BC67-AAB3D507F22E.jpg',
      // ],
    };
  }

  componentWillMount() {
    this.setState({
      initialPage: this.props.param.imgIndex,
      images: this.props.param.urlArray,
    });

    FileUtil.mkdir();
  }

  _renderMenu = () => {
    // if (this.state.showMenuBox) {
    //   return (
    //     <View
    //       style={{
    //         position: 'absolute',
    //         left: 0,
    //         right: 0,
    //         bottom: Device.height - Device.navBarHeight - Device.innerStatusBarSize,
    //         height: Device.navBarHeight,
    //         // backgroundColor: '#00000066',
    //         alignItems: 'center',
    //         justifyContent: 'center',
    //         flexDirection: 'row',
    //       }}
    //     >
    //       <View style={{ flex: 1 }}>
    //         <TouchableOpacity
    //           style={{ width: 44, paddingLeft: 10 }}
    //           onPress={() => {
    //             this.props.navigator.pop();
    //           }}
    //         >
    //           <Icon name="ios-arrow-back" size={36} color="white" />
    //         </TouchableOpacity>
    //       </View>
    //
    //       <View style={{ flex: 1, alignItems: 'flex-end' }}>
    //         <TouchableOpacity
    //           style={{ width: 44, paddingRight: 10 }}
    //           onPress={this.handleMore}
    //         >
    //           <Icon name="ios-more" size={36} color="white" />
    //         </TouchableOpacity>
    //       </View>
    //     </View>
    //   );
    // }

    return (<View />);
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Gallery
          style={{ flex: 1, backgroundColor: 'black' }}
          initialPage={this.state.initialPage}
          pageMargin={10}
          images={this.state.images}
          onSingleTapConfirmed={() => {
            this.toggleMenuBox();
          }}
          onGalleryStateChanged={(idle) => {
            !idle && this.hideMenuBox();
          }}
          onPageSelected={(page) => {
            this.setState({ page });
          }}
        />

        {this._renderMenu()}
      </View>
    );
  }

  handleMore = () => {
    const currentUri = this.state.images[this.state.page];
    if (Platform.OS === 'ios') {
      const options = ['保存图片', '返回'];
      ActionSheetIOS.showActionSheetWithOptions(
        {
          title: '更多操作',
          options,
          cancelButtonIndex: 1
        },
        (buttonIndex) => {
          if (buttonIndex === 0) {
            FileUtil.saveImage(currentUri)
              .then((response) => { // eslint-disable-line no-unused-vars
                Alert('保存成功');
              })
              .catch((errorData) => { // eslint-disable-line no-unused-vars
                Alert('保存失败');
              });
          }
        });
    } else {
      NativeModules.UserPhotoPicModule.showImgDialog(
        () => {
          FileUtil.saveImage(currentUri)
            .then((response) => {
              Alert(response);
            })
            .catch((errorData) => {
              Alert(errorData);
            });
        }
      );
    }
  };

  toggleMenuBox = () => {
    if (!this.state.showMenuBox) {
      this.setState({
        showMenuBox: true
      });
    } else {
      this.setState({
        showMenuBox: false
      });
    }
  };

  hideMenuBox = () => {
    if (this.state.showMenuBox) {
      this.setState({
        showMenuBox: false
      });
    }
  };
}
