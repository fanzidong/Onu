/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  BackAndroid,
  View
} from 'react-native';

let Dimensions = require('Dimensions');
let PixelRatio = require('PixelRatio');
let totalWidth = Dimensions.get('window').width;
let totalHeight = Dimensions.get('window').height;
let leftStartPoint = totalWidth * 0.1;
let componentWidth = totalWidth * 0.8;
let pixelRatio = PixelRatio.get();

export default class ConfirmDialog extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var amIStillAlive = this.props.amIStillAlive;
    BackAndroid.addEventListener('ConfirmDialogListener', () => {
      if(amIStillAlive) {
        this.props.userCanceled();
        return true;
      }
      return false;
    });
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('ConfirmDialogListener');
  }

  render() {
    return (
      <View style={styles.confirmContianer}>
        <View style={styles.dialogStyle}>
          <Text style={styles.textPrompt}>
            {this.props.promptToUser}
          </Text>
          <Text style={styles.yesButton} onPress={this.props.userConfirmed} numberOfLines={3}>
            确定
          </Text>
          <Text style={styles.cancelButton} onPress={this.props.userCanceled} numberOfLines={3}>
            取消
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  confirmContianer: {
    position: 'absolute',
    top: 0,
    width: totalWidth,
    height: totalHeight,
    backgroundColor: 'rgba(52,52,52,0.5)'
  },
  dialogStyle: {
    position: 'absolute',
    top: totalHeight * 0.4,
    left: totalWidth * 0.1,
    width: totalWidth * 0.8,
    height: totalHeight * 0.3,
    backgroundColor: 'white'
  },
  textPrompt: {
    position: 'absolute',
    top: 10,
    left: 10,
    fontSize: 20,
    color: 'black'
  },
  yesButton: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    width: totalWidth * 0.35,
    height: totalHeight * 0.12,
    backgroundColor: 'grey',
    fontSize: 20,
    color: 'white',
    textAlign: 'center'
  },
  cancelButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: totalWidth * 0.35,
    height: totalHeight * 0.12,
    backgroundColor: 'grey',
    fontSize: 20,
    color: 'white',
    textAlign: 'center'
  }
});
