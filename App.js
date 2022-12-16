import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { useEffect,useState } from 'react';
import Weatherinfo from './components/Weatherinfo';
import UnitsPicker from './components/UnitsPicker';
import { colors } from './Utils/Index';
import WeatherDetails from './components/WeatherDetails';

const WEATHER_API_KEY = 'f06fae64ba758e764aa0e9e9d5ca57b1';
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'

export default function App() {

  const [errorMesssage , seterrorMessage] = useState(null)
  const [currentWeather,setcurrentWeather] = useState(null)
  const [unitsSystem, setUnitsSystem ] = useState('metric')
  

  useEffect(() => {
    load()
  },[unitsSystem])
  async function load(){
    setcurrentWeather(null)
    seterrorMessage(null)
    try {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if(status != 'granted'){
        seterrorMessage('Access To Location is needed to run app')

        return 
      }
      const location = await Location.getCurrentPositionAsync()
      const{ latitude , longitude } = location.coords
      const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`
      const response = await fetch(weatherUrl)
      const result = await response.json()
      if(response.ok){
        setcurrentWeather(result)
        
      }else{
        seterrorMessage(result.message)
      }
    } catch (error) {
      seterrorMessage(error.message)
    }
  }
  if(currentWeather){    
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
          <View style={styles.main}>
            <UnitsPicker unitsSystem={unitsSystem} setUnitsSystem={setUnitsSystem}/>
            <Weatherinfo currentWeather={currentWeather}/>
         </View>
         <WeatherDetails currentWeather={currentWeather} unitsSystem={unitsSystem}/>
         <View style={styles.my}>
            <Text style={{fontSize:10}}>
                App By Sankalpa©
            </Text>
        </View>
      </View>
      );
  } else if(errorMesssage){
    return (
      <View style={styles.container}>
      <Text>{errorMesssage}</Text>
      <StatusBar style="auto" />
    </View>
    );
  } else{
    return (
      <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.PRIMERY_COLOR}/>
      <StatusBar style="auto" />
    </View>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor:'#C8FFD4'
  },
  main:{
    justifyContent:'center',
    flex:1,
  },
  my:{
    width: '100%',
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
    
  }
});
