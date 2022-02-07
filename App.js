import React, { useState, useEffect } from 'react';
import {
  View, StyleSheet, Text,
  ScrollView, Dimensions
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

// div => View, span => Text
// display is only flex, flexDirection default is Column
// width, height는 사용하지 않는다. -> 반응형을 위해 flex 사용.
// 부모 엘리먼트에 따라 비율이 정해진다.

//const SCREEN_WIDTH = Dimensions.get("window").width;
const {width: SCREEN_WIDTH} = Dimensions.get("window");

const App = () => {
  
  const [location, setLocation] = useState();

  // useEffect(() => {
  //   Geolocation.getCurrentPosition(
  //     position => {
  //       const {latitude, longitude} = position.coords;
  //       setLocation({
  //         latitude,
  //         longitude,
  //       });
  //     },
  //     error => {
  //       console.log(error.code, error.message);
  //     },
  //     {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  //   );
  // }, []);
  

  return (        
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>서울</Text>
      </View>      
      <ScrollView 
        pagingEnabled horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>맑음</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>맑음</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>맑음</Text>
        </View>
      </ScrollView>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1, backgroundColor: "#F0F5F9"
  },
  city:{
    flex:1,
    backgroundColor: "#C9D6DF",
    justifyContent: "center",
    alignItems:"center"
  },
  cityName:{
    color:"black",
    fontSize: 48,
    fontWeight: "500"
  },
  weather:{
    backgroundColor: "#1E2022"
  },
  day: {
    width: SCREEN_WIDTH,
    backgroundColor: "#52616B",
    alignItems:"center"
  },
  temp:{
    fontSize: 170,
    marginTop: 30,
  },
  description:{
    fontSize: 50,
    marginTop: -20,
  },
});

export default App;