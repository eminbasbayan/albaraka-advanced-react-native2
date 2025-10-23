import React from 'react';
import { Text } from 'react-native';

const MyParagraph = (props) => {
  console.log('MyParagraph re-rendered!');
  return <Text> {props.children} </Text>;
};

export default React.memo(MyParagraph);
