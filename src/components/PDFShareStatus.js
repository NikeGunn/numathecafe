import React from 'react';
import * as Animatable from 'react-native-animatable';
import { Text, View } from 'react-native';

const PDFShareStatus = ({ shared }) => (
  shared ? (
    <Animatable.View animation="fadeInUp" duration={800} style={{ marginTop: 20, alignItems: 'center' }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#4CAF50' }}>PDF Shared Successfully!</Text>
    </Animatable.View>
  ) : null
);

export default PDFShareStatus;
