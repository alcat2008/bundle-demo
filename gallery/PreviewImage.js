/* eslint-disable no-console */

import React, { Component, PropTypes } from 'react';
import {
  Image,
  ActivityIndicator,
  View,
  Text,
} from 'react-native';

import RNFS from 'react-native-fs';
import FileUtil from './fileUtil';
import _Object from 'lodash/object';

export default class PreviewImage extends Component {

  static propTypes = {
    source: PropTypes.object,
    showLoading: PropTypes.bool,

    onLoadStart: PropTypes.func,
    onLoad: PropTypes.func,
  };

  static defaultProps = {
    showLoading: true,
  };

  constructor(props) {
    super(props);

    const thumbPath = FileUtil.getStoragePath(this.props.source.uri, true).imagePath;
    this.state = {
      status: 'loading', // 'loading', 'fail', 'success'
      thumb: { uri: 'file://' + thumbPath },
      filePath: { uri: '' },
    };
  }

  componentDidMount() {
    this.props.onLoadStart && this.props.onLoadStart();
    const imagePath = FileUtil.getStoragePath(this.props.source.uri).imagePath;
    RNFS.exists(imagePath).then((exists) => {
      if (!exists) {
        RNFS.downloadFile({ fromUrl: this.props.source.uri, toFile: imagePath })
          .then((response) => { // eslint-disable-line no-unused-vars
            this.setState({
              status: 'success',
              filePath: { uri: 'file://' + imagePath },
            });
          })
          .catch((err) => {  // eslint-disable-line no-unused-vars
            this.setState({
              status: 'fail'
            });
          });
      } else {
        this.setState({
          status: 'success',
          filePath: { uri: 'file://' + imagePath },
        });
      }
    });
  }

  _renderLoading = () => {
    if (this.props.showLoading) {
      return (
        <ActivityIndicator
          animating={true}
          size="large"
        />
      );
    }
    return (<View />);
  };
  _renderFail = () => {
    if (this.state.status === 'fail') {
      return (
        <Text style={{ color: '#ffffff' }}>加载失败</Text>
      );
    }
    return (<View />);
  };

  render() {
    const imageStyle = _Object.assign(...this.props.style, {
      alignItems: 'center',
      justifyContent: 'center',
    });

    if (this.state.status === 'success') {
      return (
        <Image
          {...this.props}
          style={imageStyle}
          // onLoadStart={this.onLoadStart}
          onLoad={this.onLoad}
          source={this.state.filePath}
        />
      );
    }

    return (
      <Image
        {...this.props}
        style={imageStyle}
        source={this.state.thumb}
      >
        {this._renderLoading()}
        {this._renderFail()}
      </Image>
    );
  }

  onLoad = (e) => {
    this.props.onLoad && this.props.onLoad(e);
  };
}
