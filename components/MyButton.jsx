import { View, Text, Button } from 'react-native';
import React from 'react';

const MyButton = ({ onPress }) => {
  console.log('MyButton re-rendered!');

  return <Button title="MyButton" onPress={onPress} />;
};

export default MyButton;
