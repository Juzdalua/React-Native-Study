import React, { useState, useEffect } from 'react';
import {
  View, StyleSheet, Text,
  ScrollView, Dimensions,
  Button, PermissionsAndroid,
  Image
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

// div => View, span => Text
// display is only flex, flexDirection default is Column
// width, height는 사용하지 않는다. -> 반응형을 위해 flex 사용.
// 부모 엘리먼트에 따라 비율이 정해진다.

//const SCREEN_WIDTH = Dimensions.get("window").width;
const {width: SCREEN_WIDTH} = Dimensions.get("window");


const App = () => {

  const [location, setLocation] = useState(false);
  const [city, setCity] = useState("위치 권한을 허용해주세요.");
  const [weather, setWeather] = useState("");
  const [description, setDescription] = useState("");
  const [temp, setTemp] = useState("");

  // permission button
  const requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message:
            "we can use location",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      console.log(PermissionsAndroid.RESULTS.GRANTED)
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use location");
        setLocation(true);
      } else {
        console.log("permission denied");
        setLocation(false);
      }
    } catch (err) {
      console.warn(err);
      setLocation(false);
    }
  };


  useEffect(() => {
    
    const API_KEY = "21e7354e03cfb05c15c5ad310b03b8ab";
    
    
    if(location){
      Geolocation.getCurrentPosition(
        async (position) => {
          // console.log(position);
          const {latitude, longitude} = position.coords;

          // const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`,{
          //   method: 'GET',
          //   headers:{
          //     "Content-Type": "application/json"
          //   },
          // });
          // console.log(response)
          fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
            .then(response => response.json())
            .then(json => {
              console.log(json);
              setCity(json.sys.country);
              setTemp(Math.floor(Number(json.main.temp)-273.15));
              setWeather("http://openweathermap.org/img/wn/"+json.weather[0].icon+"@2x.png");
              setDescription(json.weather[0].description);
            });
          },
        (error) => {console.log(`Error: `,error);},
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
      
      
    }; //if
  },[location])
  
  

  return (        
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>      
      <ScrollView 
        pagingEnabled horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}>
        <View style={styles.day}>
          <Text style={styles.temp}>{temp}&deg;</Text>          
          {weather.length>0? <Image style={styles.description} source={{uri: weather}}/>
            : null}
          <Text style={{fontSize:28}}>{description}</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={{fontSize:28}}>맑음</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={{fontSize:28}}>맑음</Text>
        </View>
      </ScrollView>
      <Button title="request permissions" onPress={requestPermission} />
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1, backgroundColor: "#F0F5F9"
  },
  city:{
    flex:0.5,
    backgroundColor: "#C9D6DF",
    justifyContent: "center",
    alignItems:"center"
  },
  cityName:{
    color:"black",
    fontSize: 35,
    fontWeight: "500"
  },
  weather:{    
    backgroundColor: "#1E2022"
  },
  day: {
    width: SCREEN_WIDTH,
    backgroundColor: "#52616B",
    flexDirection: "row",
    alignItems:"center",
    justifyContent: "center",
    
  },
  temp:{
    fontSize: 170,
    marginTop: 10,
  },
  description:{    
    marginTop: -20,
    width:100,
    height:100
  },
});

export default App;