/* eslint-disable no-console */

import React, { Component, PropTypes } from 'react';
import { Image } from 'react-native';

import ViewTransformer from 'react-native-view-transformer';
import PreviewImage from './PreviewImage';

let DEV = false;

const sameSource = (source, nextSource) => {
  if (source === nextSource) {
    return true;
  }
  if (source && nextSource) {
    if (source.uri && nextSource.uri) {
      return source.uri === nextSource.uri;
    }
  }
  return false;
};


export default class TransformableImage extends Component {

  static enableDebug() {
    DEV = true;
  }

  static propTypes = {
    pixels: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
    }),

    source: PropTypes.object,
    maxScale: PropTypes.number,

    enableTransform: PropTypes.bool,
    enableScale: PropTypes.bool,
    enableTranslate: PropTypes.bool,
    onTransformGestureReleased: PropTypes.func,
    onViewTransformed: PropTypes.func,

    onLoadStart: PropTypes.func,
    onLoad: PropTypes.func,
  };

  static defaultProps = {
    enableTransform: true,
    enableScale: true,
    enableTranslate: true,

    maxScale: 3,
  };

  constructor(props) {
    super(props);

    this.state = {
      width: 0,
      height: 0,

      imageLoaded: false,
      pixels: undefined,
      keyAcumulator: 1
    };
  }

  componentWillMount() {
    if (!this.props.pixels) {
      this.getImageSize(this.props.source);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!sameSource(this.props.source, nextProps.source)) {
      // image source changed, clear last image's pixels info if any
      this.setState({ pixels: undefined, keyAcumulator: this.state.keyAcumulator + 1 });
      this.getImageSize(nextProps.source);
    }
  }

  render() {
    let maxScale = 1;
    let contentAspectRatio = undefined;
    let width = 0;
    let height = 0; // pixels

    if (this.props.pixels) {
      // if provided via props
      width = this.props.pixels.width;
      height = this.props.pixels.height;
    } else if (this.state.pixels) {
      // if got using Image.getSize()
      width = this.state.pixels.width;
      height = this.state.pixels.height;
    }

    if (width && height) {
      contentAspectRatio = width / height;
      if (this.state.width && this.state.height) {
        maxScale = Math.max(width / this.state.width, height / this.state.height);
        maxScale = Math.max(this.props.maxScale, maxScale);
      }
    }


    return (
      <ViewTransformer
        ref="viewTransformer"
        // when image source changes, we should use a different node to avoid reusing previous transform state
        key={'viewTransformer#' + this.state.keyAccumulator}
        // disable transform until image is loaded
        enableTransform={this.props.enableTransform && this.state.imageLoaded}
        enableScale={this.props.enableScale}
        enableTranslate={this.props.enableTranslate}
        enableResistance={true}
        onTransformGestureReleased={this.props.onTransformGestureReleased}
        onViewTransformed={this.props.onViewTransformed}
        maxScale={maxScale}
        contentAspectRatio={contentAspectRatio}
        onLayout={this.onLayout}
        style={{ backgroundColor: 'black', flex: 1 }}
      >
        <PreviewImage
          {...this.props}
          resizeMode={'contain'}
          onLoadStart={this.onLoadStart}
          onLoad={this.onLoad}
          // on iOS, use capInsets to avoid image downsampling
          capInsets={{ left: 0.1, top: 0.1, right: 0.1, bottom: 0.1 }}
        />
      </ViewTransformer>
    );
  }

  onLoadStart = (e) => {
    this.props.onLoadStart && this.props.onLoadStart(e);
    this.setState({
      imageLoaded: false
    });
  };

  onLoad = (e) => {
    this.props.onLoad && this.props.onLoad(e);
    this.setState({
      imageLoaded: true
    });
  };

  onLayout = (e) => {
    const { width, height } = e.nativeEvent.layout;
    if (this.state.width !== width || this.state.height !== height) {
      this.setState({ width, height });
    }
  };

  getImageSize = (source) => {
    if (!source) return;

    DEV && console.log('getImageSize...' + JSON.stringify(source));

    if (typeof Image.getSize === 'function') {
      if (source && source.uri) {
        Image.getSize(
          source.uri,
          (width, height) => {
            DEV && console.log('getImageSize...width=' + width + ', height=' + height);
            if (width && height) {
              if (this.state.pixels && this.state.pixels.width === width && this.state.pixels.height === height) {
                // no need to update state
              } else {
                this.setState({ pixels: { width, height } });
              }
            }
          },
          (error) => {
            console.error('getImageSize...error=' + JSON.stringify(error) + ', source=' + JSON.stringify(source));
          });
      } else {
        console.warn('getImageSize...please provide pixels prop for local images');
      }
    } else {
      console.warn('getImageSize...Image.getSize function not available before react-native v0.28');
    }
  };

  getViewTransformerInstance = () => this.refs.viewTransformer;
}
