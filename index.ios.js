/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
  Component,
} from 'react';
import {
  AppRegistry,
  TabBarIOS,
  NavigatorIOS,
  StatusBar,
  View,
  Text,
  NativeModules,
} from 'react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { text: 'Goodbye World.' };
  }
  componentDidMount() {
    NativeModules.ExportModule.processString(this.state.text, (text) => {
      this.setState({text});
    });
  }
  render() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item title="React Native" selected={true}>
          <View
            style={{
              // paddingTop: 64,
              marginTop: 64,
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <StatusBar
              backgroundColor="blue"
              barStyle="default"
            />
            <Text>{this.state.text}</Text>
          </View>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

AppRegistry.registerComponent('bundleDemo', () => App);
