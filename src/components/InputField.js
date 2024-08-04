import React from 'react';
import { TextInput as RNTextInput } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

const InputField = ({ label, value, onChange, icon, placeholder, delay = 0 }) => (
  <Animatable.View
    animation="fadeInRight"
    duration={1000}
    delay={delay}
  >
    <RNTextInput
      label={label}
      value={value}
      onChangeText={onChange}
      style={{ width: '100%', marginBottom: 15, backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 10 }}
      mode="outlined"
      theme={{ colors: { primary: '#4CAF50', underlineColor: 'transparent' } }}
      left={<RNTextInput.Icon name={icon} color="#4CAF50" />}
      placeholder={placeholder}
    />
  </Animatable.View>
);

export default InputField;
