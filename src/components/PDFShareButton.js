import React from 'react';
import { Button, Text } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

const PDFShareButton = ({ onPress }) => (
  <Animatable.View
    animation="fadeInUp"
    duration={1000}
    delay={800}
  >
    <Button 
      mode="contained" 
      onPress={onPress} 
      style={{ backgroundColor: '#0965ef', borderRadius: 8, width: '100%' }}
      labelStyle={{ fontSize: 16 }}
      icon="share-variant"
    >
      <Text style={{ color: '#fff', fontSize: 18 }}>Share</Text>
    </Button>
  </Animatable.View>
);

export default PDFShareButton;
