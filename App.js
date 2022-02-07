import React from 'react';
import {
  View,
} from 'react-native';

// div => View, span => Text
// display is only flex, flexDirection default is Column
// width, height는 사용하지 않는다. -> 반응형을 위해 flex 사용.
// 부모 엘리먼트에 따라 비율이 정해진다.
const App = () => {

  return (
    <View style={{flex:1}}>
      <View style={{flex:1, backgroundColor:"tomato"}}></View>
      <View style={{flex:3, backgroundColor:"teal"}}></View>      
      <View style={{flex:1, backgroundColor:"grey"}}></View>
    </View>
  );
};

export default App;